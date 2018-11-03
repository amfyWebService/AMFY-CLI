#!/usr/bin/env node

import commander from 'commander'
import GitUtils from './src/utils/GitUtils'
import FilesUtils from './src/utils/FilesUtils'
import * as fs from "fs"
import { ChangingValue } from './src/utils/utilsclass/ChangingValue';
import { TypeTemplate } from './src/utils/utilsclass/TypeTemplate'
import { COPYFILE_EXCL } from 'constants';
import { cpus } from 'os';
import { isNull } from 'util';

const listOfTemplateVar: Array<Object> = [{ "salut": "test" }]
const listOfFolders: Array<string> = ["\\models", "\\controller"]
const url: string = "https://github.com/amfyWebService/AMFY-CLI"
const pathControllerTemplate = __dirname+"\\template\\controllerTemplate.ts"
const pathControllerDir = "\\"
const cloneOpts = {};

async function init() {
  commander
    .version("0.1.0");
  
  commander.command("init <projectName>")
    .description('Model generator')
    .option("-w, --withcontroller <controllerName>")
    .action(async (projectName , options) => {
      await GitUtils.clone(url, projectName, cloneOpts) // cut the execution if failed , no need to handle error, we want this behaviour
      if(options.withcontroller) createController(options.withcontroller , true , projectName)
    });

  commander.command("add")
    .description('add controller')
    .option("-n, --name <templateName>")
    .action(async (templateName) => {
      await createController(templateName)
    });

  commander.parse(process.argv);
}

/*
* isInit and projectname are usefull only if its from the init command
*
*
*/
function createController(name: string, isInit : boolean = false , projectname : string = "") {
 
  if (fs.existsSync(process.cwd() + pathControllerDir) && fs.existsSync(pathControllerTemplate)) {
    let destination: string = isInit ? process.cwd() + "\\" + projectname + pathControllerDir + name+".ts"
      : process.cwd() + pathControllerDir + name + '.ts'

    let src: string = pathControllerTemplate
      

    FilesUtils.createFileFromTemplate(src, destination)
    let listTag: Array<ChangingValue> = setListOfTag()
    FilesUtils.replaceTag(listTag, destination)
  }
  else {
    console.log("Cannot find '/controller' Directory or '/template/templateController.ts' , are you sure that you are in AMFY project ?")
    process.exit()
  }
}

// function createController(name: string) {
//   console.log(process.cwd() + pathControllerDir)
//   console.log(process.cwd() + pathControllerTemplate)


//   if (fs.existsSync(process.cwd() + pathControllerDir) && fs.existsSync(process.cwd() + pathControllerTemplate)) {
    
//     let destination: string
//     let src: string

//     if (commander.init) {
//       destination = process.cwd() + "/" + commander.projectname + pathControllerDir + name + '.ts'
//       src = process.cwd() + "/" + commander.projectname + pathControllerTemplate 
//     } else {
//       destination = process.
//       cwd() + pathControllerDir + name + '.ts'
//       src = process.cwd() + pathControllerTemplate 
//     }

//     console.log(destination)
//     console.log(src)

//     FilesUtils.createFileFromTemplate(src, destination)
//     let listTag: Array<ChangingValue> = setListOfTag()
//     FilesUtils.replaceTag(listTag, destination)
//   } else {
//     console.log("Cannot find '/controller' Directory or '/template/templateController.ts' , are you sure that you are in AMFY project ?")
//     process.exit()
//   }
// }

function setListOfTag(): Array<ChangingValue> {
  let toReturn: Array<ChangingValue> = []
  for (let i = 0; i < listOfTemplateVar.length; i++) {
    for (const [template, replacer] of Object.entries(listOfTemplateVar[i])) {
      console.log(template)
      console.log(replacer)
      toReturn.push(new ChangingValue(template, replacer))
    }
  }
  return toReturn
}

init()