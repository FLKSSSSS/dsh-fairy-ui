import { createReadStream, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const videoPath = fileURLToPath(new URL('../media/startup-default.mp4', import.meta.url));
export function startupVideoHandler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405, { Allow: 'GET, HEAD' }); res.end(); return; }
  const size = statSync(videoPath).size;
  const headers = { 'Content-Type': 'video/mp4', 'Accept-Ranges': 'bytes', 'Cache-Control': 'private, max-age=3600', 'X-Content-Type-Options': 'nosniff' };
  let start = 0, end = size - 1;
  if (req.headers.range) {
    const m = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
    if (!m || (!m[1] && !m[2])) { res.writeHead(416, { 'Content-Range': `bytes */${size}` }); res.end(); return; }
    if (!m[1]) start = Math.max(0, size - Number(m[2]));
    else { start = Number(m[1]); if (m[2]) end = Math.min(end, Number(m[2])); }
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= size) { res.writeHead(416, { 'Content-Range': `bytes */${size}` }); res.end(); return; }
    headers['Content-Range'] = `bytes ${start}-${end}/${size}`;
  }
  res.writeHead(req.headers.range ? 206 : 200, { ...headers, 'Content-Length': end - start + 1 });
  if (req.method === 'HEAD') { res.end(); return; }
  const stream = createReadStream(videoPath, { start, end });
  stream.on('error', () => res.destroy());
  res.once('close', () => stream.destroy());
  stream.pipe(res);
}
export function startupImageHandler(name) {
  if(!['hdd-mark.png','hdd-wordmark.png'].includes(name))throw new Error('Unknown startup image');
  const file=fileURLToPath(new URL('../media/'+name,import.meta.url));
  return (req,res)=>{
    if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405,{Allow:'GET, HEAD'});res.end();return;}
    res.writeHead(200,{'Content-Type':'image/png','Content-Length':statSync(file).size,'Cache-Control':'private, max-age=3600','X-Content-Type-Options':'nosniff'});
    if(req.method==='HEAD'){res.end();return;}
    const stream=createReadStream(file);stream.on('error',()=>res.destroy());res.once('close',()=>stream.destroy());stream.pipe(res);
  };
}
export function applyStartupAsset(ctx) {
  ctx.inject(['webServer'],ws=>{
    ws.effect(()=>ws.webServer.register({kind:'exact',path:'/fairy-ui/startup.mp4',handler:startupVideoHandler}));
    for(const name of ['hdd-mark.png','hdd-wordmark.png'])ws.effect(()=>ws.webServer.register({kind:'exact',path:'/fairy-ui/'+name,handler:startupImageHandler(name)}));
  });
}
