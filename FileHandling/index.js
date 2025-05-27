import {readFile , writeFile, appendFile, mkdir} from "fs/promises"

// read file content
const readYourfile = async (fileName) => {
   const data  = await readFile(fileName, "utf-8");
   console.log(data);
} 
//readYourfile('file.txt')

// create a new file

const createYourFile = async (fileName, content) =>{
    await writeFile(fileName,content);
    console.log("file is created" , fileName);
}
// createYourFile('createdfile.docs', 'this file is created through writeFile ')

// adding content to the file
const addingcontenttoYourFile = async (fileName, content) =>{
    await appendFile(fileName,content);
    console.log("content added succesfuly" , content);;
}
// addingcontenttoYourFile('createdfile.docs' , ' this is new content')

// creating folder ' directory

const createfolder = async (dir)=>{
      mkdir(dir , {recursive:true}); // recursive for src/coponnets/--/--
}
createfolder('src/Components/java.txt')