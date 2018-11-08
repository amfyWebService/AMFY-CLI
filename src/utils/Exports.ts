import * as fs from "fs";
import FilesUtils from "./FilesUtils";
import * as archiver from "archiver";
import path from "path";

const pathConfig : string = path.join(process.cwd(), "config", "exportIgnore.json");

export class Exports
{
    excludedDir : Array<string> = new Array<string>()
    excludedFile : Array<string> = new Array<string>()
    pathArchive: string = ""

    constructor()
    {
        try
        {
            let output = fs.readFileSync(pathConfig)
            let myJson = JSON.parse(output.toString())
            this.excludedDir = myJson.Exclude.directory
            this.excludedFile = myJson.Exclude.files
        }
        catch(err)
        {
            console.log("cannot find file : "+ pathConfig)
        }          
    }
    private getAllExcludedFiles(): Array<string>
    {
        return this.excludedDir.concat(this.excludedFile)
    }
    public exportToServer( archiveName : string = "exportApp", typeArchive: archiver.Format): void
    {
        FilesUtils.createArchive(this.pathArchive,FilesUtils.getDirectoryListForBuild(process.cwd()+"/",this.getAllExcludedFiles()), archiveName, typeArchive)
    }
    
} 
