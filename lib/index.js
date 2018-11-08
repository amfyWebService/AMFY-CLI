#!/usr/bin/env node
import * as commander from "commander";
import GitUtils from './src/utils/GitUtils';
import FilesUtils from './src/utils/FilesUtils';
import * as fs from "fs";
import { ChangingValue } from './src/utils/utilsclass/ChangingValue';
import { Exports } from './src/utils/Exports';
const listOfTemplateVar = [{ "salut": "test" }];
const listOfFolders = ["\\models", "\\controller"];
const url = "https://github.com/amfyWebService/AMFY-CLI";
const pathControllerTemplate = __dirname + "\\template\\controllerTemplate.ts";
const pathControllerDir = "\\";
const cloneOpts = {};
async function init() {
    let command = new commander.Command();
    command.command("export")
        .description("Export file ")
        .option("-n, --name <value>", "name of the archive")
        .option("--tar")
        .option("--zip")
        .action(function (args) {
        let type = args.tar ? "tar" : "zip";
        let name = args.name ? args.name : "exportApp";
        let exp = new Exports();
        exp.exportToServer(name, type);
    });
    command.command("init <projectName>")
        .description('Model generator')
        .option("-w, --withcontroller <controllerName>")
        .action(async (projectName, options) => {
        await GitUtils.clone(url, projectName, cloneOpts); // cut the execution if failed , no need to handle error, we want this behaviour
        if (options.withcontroller)
            createController(options.withcontroller, true, projectName);
    });
    command.command("add")
        .description('add controller')
        .option("-n, --name <templateName>")
        .action(async (templateName) => {
        await createController(templateName);
    });
    command.parse(process.argv);
}
/*
* isInit and projectname are usefull only if its from the init command
*
*
*/
function createController(name, isInit = false, projectname = "") {
    if (fs.existsSync(process.cwd() + pathControllerDir) && fs.existsSync(pathControllerTemplate)) {
        let destination = isInit ? process.cwd() + "\\" + projectname + pathControllerDir + name + ".ts"
            : process.cwd() + pathControllerDir + name + '.ts';
        let src = pathControllerTemplate;
        FilesUtils.createFileFromTemplate(src, destination);
        let listTag = setListOfTag();
        FilesUtils.replaceTag(listTag, destination);
    }
    else {
        console.log("Cannot find '/controller' Directory or '/template/templateController.ts' , are you sure that you are in AMFY project ?");
        process.exit();
    }
}
function setListOfTag() {
    let toReturn = [];
    for (let i = 0; i < listOfTemplateVar.length; i++) {
        for (const [template, replacer] of Object.entries(listOfTemplateVar[i])) {
            console.log(template);
            console.log(replacer);
            toReturn.push(new ChangingValue(template, replacer));
        }
    }
    return toReturn;
}
init();
