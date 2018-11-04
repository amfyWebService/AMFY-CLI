import {Decoder, object, string, optional, number, boolean} from '@mojotech/json-type-validation'
import {iChangingValues} from "./utilsclass/iChangingValue"
import fs, { readdirSync } from "fs"
import { COPYFILE_EXCL } from "constants";
import {TypeTemplate} from "./utilsclass/TypeTemplate"
import {ChangingValue} from "./utilsclass/ChangingValue"
import archiver = require('archiver');
export default class FilesUtils
{
    static  decoderValueTochange: Decoder<iChangingValues> = object({
        toReplace: string(),
        replacer: string()
    })
    /*
* Extension : Extension of the file to generate
* name: Name of the file to generate
* fullPathSrc : Path of the src file exemple : __dirname+"/myTemplate.ts"
* fullPathDest : Path where the file has to be copied exemple : __diname"/myDest/"
* template : enum of the type of template to copy
*/
    static createFileFromTemplate(fullPathSrc: string, fullPathDest : string )
    {
        
        let test = fs.copyFileSync(fullPathSrc, fullPathDest , COPYFILE_EXCL)   
        if(test != undefined)
        {
            console.log("Cant copy files")
            process.exit()
        }
    }


    static async replaceTag(listOfTag : Array<ChangingValue> , fullPathDest : string)
    {
        await fs.readFile(fullPathDest, async function(err : any, data : Buffer) {
            if (err) console.log(err)
    
            let fileText: string = data.toString()
            listOfTag.map((obj)=>
            {
                var re = new RegExp("^{{\\s*"+obj.toReplace+"\\s*\\}}");
                fileText = fileText.replace(re,obj.replacer)
            })
            await fs.writeFile(fullPathDest, fileText, (err :Error)=>
            {
                if (err) throw new Error("Can't write file : " + fullPathDest)
            });
          });    
    }

    static async rename(oldPath: string, newName: string){
        let tabPath = oldPath.split("/")
        tabPath.pop()
        let newPath = tabPath.join('/')+'/'+newName
        await fs.rename(oldPath, newPath, (err) => {
            if (err) throw err;
            console.log('renamed complete');
        });
    }


    // only handle one directory and doesnt include subdirectory
    static getDirectoryListForBuild(path: string, listException? : Array<string>): Array<string>
    {
        let freshList : Array<string> = []
        let listDir = fs.readdirSync(path)
       
        if(listException != undefined && listException.length > 0)
        {
            for(var i = 0; i< listDir.length;i++)
            {
                if(listException.indexOf(listDir[i]) == -1)
                {
                    freshList.push(listDir[i])
                }
            }
        }
        return freshList;
    }

    static async createArchive(fullPath: string, listDir: Array<string>, archiveName : string, typeArchive: archiver.Format ) 
    {
        var output = fs.createWriteStream(process.cwd() + '/'+archiveName+"."+typeArchive);
        var archive = archiver(typeArchive, 
        {
            zlib: { level: 9 } // Sets the compression level.
        });
        output.on('close', function() {
            console.log('Archive has been created');
            process.exit();
          });

          await archive.pipe(output)
          let test  = await listDir.map(function(element)
          {
            archive.glob(element)
          })
          archive.finalize()
    }
}