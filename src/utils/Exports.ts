import * as fs from "fs"
import FilesUtils from "./FilesUtils";
import * as archiver from "archiver"

export class Exports
{
    excludedDir : Array<string> = new Array<string>()
    excludedFile : Array<string> = new Array<string>()

    constructor()
    {
        try
        {
            let output = fs.readFileSync(process.cwd()+"/config.json")
            let myJson = JSON.parse(output.toString())
            this.excludedDir = myJson.Exclude.directory
            this.excludedFile = myJson.Exclude.files
        }
        catch(err)
        {
            console.log("cannot find file " + process.cwd()+"/config.json")
        }          
    }
    private getAllExcludedFiles(): Array<string>
    {
        return this.excludedDir.concat(this.excludedFile)
    }
    public exportToServer( archiveName : string = "exportApp", typeArchive: archiver.Format): void
    {
        FilesUtils.createArchive(process.cwd(),FilesUtils.getDirectoryListForBuild(process.cwd()+"/",this.getAllExcludedFiles()), archiveName, typeArchive)
    }
    
} 
