import { Decoder, object, string, optional, number, boolean } from '@mojotech/json-type-validation';
import { iChangingValues } from "./utilsclass/iChangingValue";
import fs from "fs";
import { COPYFILE_EXCL } from "constants";
import { TypeTemplate } from "./utilsclass/TypeTemplate";
import { ChangingValue } from "./utilsclass/ChangingValue";
import Twig from 'twig';
import { resolve } from 'dns';

export default class FilesUtils {
    static decoderValueTochange: Decoder<iChangingValues> = object({
        toReplace: string(),
        replacer: string()
    })

    /**
     * @param fullPathSrc Path of the src file exemple : __dirname+"/myTemplate.ts"
     * @param fullPathDest Path where the file has to be copied exemple : __diname"/myDest/"
     * @param listOfTag 
     */
    static async createFileFromTemplate(fullPathSrc: string, fullPathDest: string, listOfTag?: any) {
        return new Promise((resolve, reject) => {

            fs.copyFile(fullPathSrc, fullPathDest, COPYFILE_EXCL, async (err: Error) => {
                if (err)
                    reject(new Error("Can't copy file from template to : " + fullPathDest));

                if (listOfTag) {
                    console.log(listOfTag)
                    await this.replaceTag(listOfTag, fullPathDest);
                }

                resolve();
            });
        });
    }


    static async replaceTag(listOfTag: any, fullPathDest: string) {
        return new Promise((resolve, reject) => {
            Twig.renderFile(fullPathDest, JSON.parse(JSON.stringify(listOfTag)), (err, html) => {
                if (err) reject(new Error("Can't open file : " + fullPathDest));
    
                fs.writeFile(fullPathDest, html, (err: Error) => {
                    if (err) reject(new Error("Can't write file : " + fullPathDest));

                    resolve();
                });
              });
        })
    }

    static async rename(oldPath: string, newName: string) {
        let tabPath = oldPath.split("/")
        tabPath.pop()
        let newPath = tabPath.join('/') + '/' + newName
        await fs.rename(oldPath, newPath, (err) => {
            if (err) throw err;
            console.log('renamed complete');
        });
    }
}