#!/usr/bin/env node

import * as commander from "commander"
import GitUtils from './src/utils/GitUtils'
import FilesUtils from './src/utils/FilesUtils'
import * as fs from "fs"
import { ChangingValue } from './src/utils/utilsclass/ChangingValue';
import { TypeTemplate } from './src/utils/utilsclass/TypeTemplate'
import { COPYFILE_EXCL } from 'constants';
import { cpus } from 'os';
import { isNull } from 'util';
import { Exports } from './src/utils/Exports';
import * as archiver  from 'archiver'

const listOfTemplateVar: Array<Object> = []
const url: string = "https://github.com/amfyWebService/AMFY"
const pathControllerTemplate: string = __dirname+"\\template\\controllerTemplate.template"
const pathControllerDir: string = "\\src\\controllers\\"
const optionsBasePull: object = {};


async function init() {
  let command : any  = new commander.Command()
command.command("export <fileName>")
          .description("Export file ")
          .option("--tar")
          .option("--zip")
          .option("-d, --dir <dir>")
          .action(function(name :any ,args : any)
          {
            console.log(args.dir)
            let type : archiver.Format = args.tar ? "tar" : "zip"
            let exp : Exports = new Exports()
            args.dir ? exp.pathArchive = args.dir : exp.pathArchive = process.cwd()+"/"
            exp.exportToServer(name,type) 
          })

  command.command("init <projectName>")
    .description('Model generator')
    .option("-w, --withcontroller <controllerName>")
    .action(async (projectName: any , options: any) => {
      await GitUtils.clone(url, projectName, optionsBasePull) // cut the execution if failed , no need to handle error, we want this behaviour
      if(options.withcontroller) createController(options.withcontroller , true , projectName)
    });

  command.command("addcontroller <name>")
    .description('add controller')
    .action((templateName : any) => {
      createController(templateName)
    })

  command.parse(process.argv);

}

/*
* isInit and projectname are usefull only if its from the init command
*
*
*/
function createController(name: string, isInit : boolean = false , projectname : string = "") {
   
  if (fs.existsSync(process.cwd() + pathControllerDir) || isInit && fs.existsSync(pathControllerTemplate)) {
    listOfTemplateVar.push({"defaultController":name})
    let destination: string = isInit ? process.cwd() + "\\" + projectname + pathControllerDir + name+".ts"
      : process.cwd() + pathControllerDir + name + '.ts'
    let src: string = pathControllerTemplate
    
    FilesUtils.createFileFromTemplate(src, destination)
    FilesUtils.replaceTag(setListOfTag(), destination)
  }
  else {
    
    console.log("Cannot find '/src/controller' Directory  , are you sure that you are in AMFY project ?")
    process.exit()
  }
}

function setListOfTag(): Array<ChangingValue> {
  let toReturn: Array<ChangingValue> = []
  for (let i = 0; i < listOfTemplateVar.length; i++) {
    for (const [template, replacer] of Object.entries(listOfTemplateVar[i])) {
      toReturn.push(new ChangingValue(template, replacer))
    }
  }
  return toReturn
}

init()

