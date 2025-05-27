// join to file 
import { copyFileSync } from 'fs';
import path from 'path'
const fullPath = path.join('/path', 'index.py', 'indexe.java')
// console.log("files join = ",fullPath);

// absolute path / original path
// const absolutepath = path.resolve();
// console.log(absolutepath);

// extension like pdf mp3 etc

const extname = path.extname('resume.pdf')
 console.log("extname:",extname);

 if(extname ==='.pdf'){
    console.log('ok');
 }
 else{
    console.log('not supported')
 }
