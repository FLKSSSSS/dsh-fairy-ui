'use strict';
// Offline, hash-locked and reversible adaptation of the provided DSH rc.2 archive.
// No Node dependency or re-signing/fuse changes. All non-main archive entries are preserved.
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const ORIGINAL_SHA='983ca71114e6dfd353fc79af5a1f9481a250ee64c2a3c757673029b811b23bc2';
const MAIN_SHA='10325004a1ddbd8118ed0607ea28d50a7b0d692dcaeb25a67a7d8aea9165019d';
const VERSION='1.4.1';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
function parseAsar(bytes){
 if(bytes.length<16||bytes.readUInt32LE(0)!==4)throw Error('Unsupported ASAR header');
 const headerSize=bytes.readUInt32LE(4),jsonSize=bytes.readUInt32LE(12);
 if(headerSize<8||jsonSize>headerSize-8||8+headerSize>bytes.length)throw Error('Invalid ASAR header lengths');
 return {tree:JSON.parse(bytes.subarray(16,16+jsonSize).toString('utf8')),data:bytes.subarray(8+headerSize)};
}
function entry(tree,name){let e=tree;for(const part of name.split('/'))e=e.files?.[part];if(!e)throw Error('Missing ASAR entry: '+name);return e;}
function readEntry(archive,name){const e=entry(archive.tree,name);if(e.unpacked||!e.offset)throw Error('Expected packed entry');return archive.data.subarray(Number(e.offset),Number(e.offset)+e.size);}
function patchMain(original){
 if(sha(original)!==MAIN_SHA)throw Error('Unsupported original Electron entry: refusing to patch');
 let text=original.toString('utf8');
 for(const {old:from,new:to} of JSON.parse(fs.readFileSync(path.join(__dirname,'desktop-startup/main-patch.json'),'utf8'))){
  if(text.split(from).length!==2)throw Error('Patch anchor is missing or not unique');
  text=text.replace(from,to);
 }
 return Buffer.from(text);
}
function buildArchive(original){
 if(sha(original)!==ORIGINAL_SHA)throw Error('DSH archive is not the tested original rc.2 build; nothing was changed');
 const a=parseAsar(original),main=patchMain(readEntry(a,'lib/main.js')),e=entry(a.tree,'lib/main.js');
 e.offset=String(a.data.length);e.size=main.length;
 e.integrity={algorithm:'SHA256',hash:sha(main),blockSize:4194304,blocks:[sha(main)]};
 const json=Buffer.from(JSON.stringify(a.tree));
 // Chromium Pickle: size pickle (8 bytes), string pickle (length + aligned string).
 const payloadSize=4+Math.ceil(json.length/4)*4,header=Buffer.alloc(8+4+payloadSize);
 header.writeUInt32LE(4,0);header.writeUInt32LE(4+payloadSize,4);
 header.writeUInt32LE(payloadSize,8);header.writeUInt32LE(json.length,12);json.copy(header,16);
 const result=Buffer.concat([header,a.data,main]);
 if(!readEntry(parseAsar(result),'lib/main.js').equals(main))throw Error('Generated entry verification failed');
 return result;
}
function verifyFuse(root){
 const exe=fs.readFileSync(path.join(root,'DeepSeek Harness.exe'));
 const signature=Buffer.from('dL7pKGdnNz796PbbjQWNKmHXBZaB9tsX');const at=exe.indexOf(signature);
 if(at<0||exe[at+signature.length]!==1)throw Error('Unknown Electron fuse layout; refusing to alter its security configuration');
 const states=exe.subarray(at+signature.length+2,at+signature.length+2+exe[at+signature.length+1]);
 // Index 4 is EnableEmbeddedAsarIntegrityValidation. Never disable it or rewrite the executable.
 if(states[4]!==48)throw Error('Embedded ASAR validation is enabled: this adapter cannot safely modify the archive');
}
function paths(root){
 root=fs.realpathSync(root);const resources=path.join(root,'resources');
 return {root,resources,archive:path.join(resources,'app.asar'),backup:path.join(resources,'app.asar.fairy-ui-original'),state:path.join(resources,'fairy-ui-startup-state.json'),assets:path.join(resources,'fairy-ui-startup')};
}
function validate(root){
 const p=paths(root);verifyFuse(p.root);const bytes=fs.readFileSync(p.archive),hash=sha(bytes);
 if(fs.existsSync(p.state)){
  const s=JSON.parse(fs.readFileSync(p.state,'utf8'));
  if(s.schema!==1||s.originalSha256!==ORIGINAL_SHA||sha(fs.readFileSync(p.backup))!==ORIGINAL_SHA)throw Error('Invalid startup backup or state');
  if(hash!==s.patchedSha256&&hash!==ORIGINAL_SHA)throw Error('Host changed since installation; refusing to overwrite it. Restore/reinstall the official host first.');
  return {...p,bytes,hash,stateData:s};
 }
 if(hash!==ORIGINAL_SHA)throw Error('Unsupported or modified host: expected the provided DSH 0.2.0-rc.2 original archive');
 if(fs.existsSync(p.backup)||fs.existsSync(p.assets))throw Error('Unowned backup/resource exists; refusing to overwrite it');
 return {...p,bytes,hash};
}
function install(root){
 const p=validate(root);
 if(p.stateData&&p.hash===p.stateData.patchedSha256){
  if(p.stateData.version!==VERSION)throw Error('Another adapter version is installed; run RestoreNative (恢复原版启动.cmd) first, then install this version');
  for(const [name,hash] of Object.entries(p.stateData.assetHashes)){
   const f=path.join(p.assets,name);if(!fs.existsSync(f)||sha(fs.readFileSync(f))!==hash)throw Error('Installed startup resources changed; restore the adapter before reinstalling');
  }
  return {installed:true,alreadyInstalled:true,...p.stateData};
 }
 const original=p.stateData?fs.readFileSync(p.backup):p.bytes,patched=buildArchive(original);
 const assets=path.join(__dirname,'desktop-startup'),assetHashes={};
 function collect(dir,prefix=''){
  for(const f of fs.readdirSync(dir,{withFileTypes:true})){
   const n=prefix+f.name;if(f.isDirectory())collect(path.join(dir,f.name),n+'/');
   else if(f.name!=='main-patch.json'&&!f.name.endsWith('.test.cjs'))assetHashes[n]=sha(fs.readFileSync(path.join(dir,f.name)));
  }
 }
 collect(assets);
 const state={schema:1,version:VERSION,originalSha256:ORIGINAL_SHA,patchedSha256:sha(patched),assetHashes};
 const temp=p.archive+'.fairy-ui-new';const stage=p.assets+'.new';
 if(fs.existsSync(temp)||fs.existsSync(stage))throw Error('Temporary startup files already exist; inspect them before retrying');
 const removeOwnedTree=dir=>{
  const absolute=path.resolve(dir),resources=path.resolve(p.resources);
  if(!absolute.startsWith(resources+path.sep)||![path.resolve(p.assets),path.resolve(stage)].includes(absolute))throw Error('Refusing deletion outside owned startup resource paths');
  if(fs.existsSync(absolute)&&fs.lstatSync(absolute).isSymbolicLink())throw Error('Refusing recursive deletion through a resource symlink');
  fs.rmSync(absolute,{recursive:true});
 };
 let backedUp=false,createdAssets=false,changedArchive=false;
 try{
  if(!p.stateData){fs.copyFileSync(p.archive,p.backup,fs.constants.COPYFILE_EXCL);backedUp=true;}
  fs.mkdirSync(stage);
  for(const name of Object.keys(assetHashes)){
   const dst=path.join(stage,name);fs.mkdirSync(path.dirname(dst),{recursive:true});fs.copyFileSync(path.join(assets,name),dst);
  }
  if(fs.existsSync(p.assets))throw Error('Startup resources already exist');
  fs.renameSync(stage,p.assets);createdAssets=true;
  fs.writeFileSync(temp,patched,{flag:'wx'});
  fs.writeFileSync(p.state,JSON.stringify(state,null,2),{flag:p.stateData?'w':'wx'});
  fs.renameSync(temp,p.archive);changedArchive=true;
  if(sha(fs.readFileSync(p.archive))!==state.patchedSha256)throw Error('Installed archive verification failed');
  return {installed:true,...state};
 }catch(e){
  if(changedArchive)fs.copyFileSync(p.backup,p.archive);
  if(!p.stateData){if(fs.existsSync(p.state))fs.unlinkSync(p.state);if(backedUp&&sha(fs.readFileSync(p.archive))===ORIGINAL_SHA)fs.unlinkSync(p.backup);}
  if(createdAssets)removeOwnedTree(p.assets);
  if(fs.existsSync(stage))removeOwnedTree(stage);if(fs.existsSync(temp))fs.unlinkSync(temp);
  throw e;
 }
}
function restore(root){
 const p=validate(root);if(!p.stateData)return {restored:true,notInstalled:true};
 const temp=p.archive+'.fairy-ui-restore';if(fs.existsSync(temp))throw Error('Restore temporary file already exists');
 fs.copyFileSync(p.backup,temp,fs.constants.COPYFILE_EXCL);
 if(sha(fs.readFileSync(temp))!==ORIGINAL_SHA){fs.unlinkSync(temp);throw Error('Restore verification failed');}
 fs.renameSync(temp,p.archive);
 // Delete only files still matching our recorded hashes. Preserve edited/unowned files.
 for(const [name,hash] of Object.entries(p.stateData.assetHashes)){
  const file=path.resolve(p.assets,name);if(!file.startsWith(p.assets+path.sep))throw Error('Invalid recorded asset path');
  if(fs.existsSync(file)&&sha(fs.readFileSync(file))===hash)fs.unlinkSync(file);
 }
 function prune(dir){for(const f of fs.readdirSync(dir,{withFileTypes:true}))if(f.isDirectory())prune(path.join(dir,f.name));if(fs.readdirSync(dir).length===0)fs.rmdirSync(dir)}
 if(fs.existsSync(p.assets))prune(p.assets);
 fs.unlinkSync(p.state);fs.unlinkSync(p.backup);
 return {restored:true,originalSha256:sha(fs.readFileSync(p.archive))};
}
if(require.main===module){
 try{
  const [action,root]=process.argv.slice(2);if(!root||!['check','install','restore'].includes(action))throw Error('Usage: desktop-patch.cjs check|install|restore <DSH root>');
  const result=action==='check'?{supported:true,installed:!!validate(root).stateData}:action==='install'?install(root):restore(root);
  console.log(JSON.stringify(result,null,2));
 }catch(e){console.error(e.message);process.exitCode=1;}
}
module.exports={sha,parseAsar,entry,readEntry,patchMain,buildArchive,install,restore,validate,ORIGINAL_SHA};
