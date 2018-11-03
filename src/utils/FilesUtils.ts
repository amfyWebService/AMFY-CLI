import {Decoder, object, string, optional, number, boolean} from '@mojotech/json-type-validation'
import {iChangingValues} from "./utilsclass/iChangingValue"
import fs from "fs"
import { COPYFILE_EXCL } from "constants";
import {TypeTemplate} from "./utilsclass/TypeTemplate"
import {ChangingValue} from "./utilsclass/ChangingValue"
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

    static getDirectoryList(path: string, listException? : Array<string>): Array<string>
    {
        
        let listDir = fs.readdirSync(path)
        console.log(listDir)
        if(listException != undefined && listException.length > 0)
        {
            
        }
        return []
    }
}