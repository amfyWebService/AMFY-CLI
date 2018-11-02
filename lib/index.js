#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const GitUtils_1 = __importDefault(require("./src/utils/GitUtils"));
const FilesUtils_1 = __importDefault(require("./src/utils/FilesUtils"));
const fs = __importStar(require("fs"));
const ChangingValue_1 = require("./src/utils/utilsclass/ChangingValue");
const listOfTemplateVar = [{ "salut": "test" }];
const listOfFolders = ["\\models", "\\controller"];
const url = "https://github.com/amfyWebService/AMFY-CLI";
const pathControllerTemplate = "/template/controllerTemplate.ts";
const pathControllerDir = "/controller/";
const cloneOpts = {};
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        commander_1.default
            .version("0.1.0");
        commander_1.default.command("init <projectName>")
            .description('Model generator')
            .option("-w, --withcontroller")
            .action((projectName) => __awaiter(this, void 0, void 0, function* () {
            yield GitUtils_1.default.clone(url, projectName, cloneOpts); // cut the execution if failed , no need to handle error, we want this behaviour
            // if(commander.withcontroller && commander.name) createController(commander.nme)
        }));
        commander_1.default.command("add <templateName>")
            .description('add controller')
            .action((templateName) => __awaiter(this, void 0, void 0, function* () {
            yield createController(templateName);
        }));
        commander_1.default.parse(process.argv);
    });
}
// function createController(name: string) {
//   if (fs.existsSync(process.cwd() + pathControllerDir) && fs.existsSync(process.cwd() + pathControllerTemplate)) {
//     let destination: string = commander.init ? process.cwd() + "/" + commander.projectname + pathControllerDir + commander.nme + 'ts'
//       : process.cwd() + pathControllerDir + commander.nme + '.ts'
//     let src: string = commander.init ? process.cwd() + "/" + commander.projectname + pathControllerTemplate + commander.nme + '.ts'
//       : process.cwd() + pathControllerTemplate + commander.nme + '.ts'
//     FilesUtils.createFileFromTemplate(src, destination)
//     let listTag: Array<ChangingValue> = setListOfTag()
//     FilesUtils.replaceTag(listTag, destination)
//   }
//   else {
//     console.log("Cannot find '/controller' Directory or '/template/templateController.ts' , are you sure that you are in AMFY project ?")
//     process.exit()
//   }
// }
function createController(name) {
    if (fs.existsSync(process.cwd() + pathControllerDir) && fs.existsSync(process.cwd() + pathControllerTemplate)) {
        let destination;
        let src;
        if (commander_1.default.init) {
            destination = process.cwd() + "/" + commander_1.default.projectname + pathControllerDir + commander_1.default.nme + 'ts';
            src = process.cwd() + "/" + commander_1.default.projectname + pathControllerTemplate + commander_1.default.nme + '.ts';
        }
        else {
            destination = process.
                cwd() + pathControllerDir + commander_1.default.nme + '.ts';
            src = process.cwd() + pathControllerTemplate + commander_1.default.nme + '.ts';
        }
        FilesUtils_1.default.createFileFromTemplate(src, destination);
        let listTag = setListOfTag();
        FilesUtils_1.default.replaceTag(listTag, destination);
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
            toReturn.push(new ChangingValue_1.ChangingValue(replacer, template));
        }
    }
    return toReturn;
}
init();
