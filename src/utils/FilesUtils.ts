import fs from "fs";
import { COPYFILE_EXCL } from "constants";
import Twig from 'twig';
import archiver = require('archiver');

export default class FilesUtils {

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
          await listDir.map(function(element)
          {
            archive.glob(element)
          })
          archive.finalize()
    }
}