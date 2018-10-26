import {Decoder, object, string, optional, number, boolean} from '../node_modules/@mojotech/json-type-validation'
import {iChangingValues} from "./utilsclass/iChangingValue"
import fs from "fs"
import { COPYFILE_EXCL } from "constants";
import {TypeTemplate} from "./utilsclass/TypeTemplate"
import {ChangingValue} from "./utilsclass/ChangingValue"
class FilesUtils
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
    static async createFile(extension: string , name : string , fullPathSrc: string, fullPathDest : string , template : TypeTemplate)
    {
        
        fs.copyFile(fullPathSrc+"../template/"+template , fullPathDest + name + "." +extension , COPYFILE_EXCL ,(err : Error)=>
        {
            if(err) throw new Error("Can't copy file from template to : "+ fullPathDest)
        })      
    }


    static async replaceTag(listOfTag : Array<ChangingValue> , fullPathDest : string)
    {
        await fs.readFile(fullPathDest, async function(err : any, data : Buffer) {
            if (err) throw new Error("Can't open file : "+ fullPathDest)
    
            let fileText: string = data.toString()
            await listOfTag.map((obj)=>
            {
                fileText = fileText.replace(obj.toReplace, obj.replacer)
            })
                
            await fs.writeFile(fullPathDest, fileText, (err :Error)=>
            {
                if (err) throw new Error("Can't write file : " + fullPathDest)
            });
          });    
    }
}