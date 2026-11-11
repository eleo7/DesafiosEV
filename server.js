import http from 'node:http';
import {readFile} from 'node:fs/promises';
const allowed={'/':'index.html','/style.css':'style.css','/app.js':'app.js','/engine.js':'engine.js'};
http.createServer(async(req,res)=>{const file=allowed[new URL(req.url,'http://localhost').pathname];if(!file){res.writeHead(404);return res.end('Não encontrado');}try{const body=await readFile(new URL(file,import.meta.url));res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript; charset=utf-8':file.endsWith('.css')?'text/css; charset=utf-8':'text/html; charset=utf-8');res.end(body);}catch{res.writeHead(500);res.end('Erro ao carregar aplicação');}}).listen(Number(process.env.PORT)||3000,'0.0.0.0');
