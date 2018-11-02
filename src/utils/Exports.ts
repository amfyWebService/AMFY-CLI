import * as fs from "fs"
import FilesUtils from "./FilesUtils";

class Exports
{
    excludedFiles : Array<string> = new Array<string>()
    constructor()
    {
        
        try
        {
            let output = fs.readFileSync(process.cwd()+"/config.json")
            let salut = JSON.parse(output.toString())
            console.log(salut.Exclude.directory)
            for(let i = 0; i< salut.Exclude.length;i++)
            {
                this.excludedFiles.push(salut.Exclude[i])
            }
            
        }
        catch(err)
        {
            console.log("cannot find file " + process.cwd()+"/config.json")
            process.exit()
        }          
    }

    exportTodocker()
    {
        
       let listDir : Array<string> =  FilesUtils.getDirectoryList(process.cwd()+"/",this.excludedFiles)

    }
    exportToServer()
    {

    }
    
} 

let test = new Exports()
console.log(test.excludedFiles)
//test.exportTodocker()