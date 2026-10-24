import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
export const dividerVersion='20261024-shared';
export function articleDividers(html,prefix='/'){
 if(!/class="[^"]*\b(?:case-body|alex-article-body)\b/.test(html))return html;
 html=html.replace(/<link\b[^>]*href="[^"]*css\/article-dividers\.css[^" ]*"[^>]*>\s*/g,'');
 html=html.replace(/<script\b[^>]*src="[^"]*js\/article-dividers\.js[^" ]*"[^>]*><\/script>\s*/g,'');
 return html.replace('</head>',`<link rel="stylesheet" href="${prefix}css/article-dividers.css?v=${dividerVersion}">\n<script src="${prefix}js/article-dividers.js?v=${dividerVersion}" defer></script>\n</head>`);
}
export function applyArticleDividers(){
 const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
 const files=[...fs.readdirSync(root).filter(f=>f.endsWith('.html')),...fs.readdirSync(path.join(root,'repair-cases')).filter(f=>f.endsWith('.html')).map(f=>'repair-cases/'+f)];
 const articles=[];
 for(const file of files){
  const full=path.join(root,file),original=fs.readFileSync(full,'utf8');
  let updated=articleDividers(original,file.includes('/')?'../':'');
  updated=updated.replace(/(lg-dle5977s-mccordsville\.css\?v=)[^"']+/g,'$120261024-shared');
  if(updated!==original){fs.writeFileSync(full,updated);articles.push(file);}
 }
 console.log(`Updated divider assets on ${articles.length} articles`);
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))applyArticleDividers();
