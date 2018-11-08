import * as fs from "fs";
import FilesUtils from "./FilesUtils";
export class Exports {
    constructor() {
        this.excludedDir = new Array();
        this.excludedFile = new Array();
        try {
            let output = fs.readFileSync(process.cwd() + "/config.json");
            let salut = JSON.parse(output.toString());
            this.excludedDir = salut.Exclude.directory;
            this.excludedFile = salut.Exclude.files;
        }
        catch (err) {
            console.log("cannot find file " + process.cwd() + "/config.json");
        }
    }
    getAllExcludedFiles() {
        return this.excludedDir.concat(this.excludedFile);
    }
    exportToServer(archiveName = "exportApp", typeArchive) {
        FilesUtils.createArchive(process.cwd(), FilesUtils.getDirectoryListForBuild(process.cwd() + "/", this.getAllExcludedFiles()), archiveName, typeArchive);
    }
}
