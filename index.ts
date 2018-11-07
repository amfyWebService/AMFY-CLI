#!/usr/bin/env node
console.log("ok")
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


const listOfTemplateVar: Array<Object> = [{ "salut": "test" }]
const listOfFolders: Array<string> = ["\\models", "\\controller"]
const url: string = "https://github.com/amfyWebService/AMFY-CLI"
const pathControllerTemplate = __dirname+"\\template\\controllerTemplate.ts"
const pathControllerDir = "\\"
const cloneOpts = {};


async function init() {
  let command : any  = new commander.Command()
command.command("export")
          .description("Export file ")
          .option("-n, --name <value>", "name of the archive")
          .option("--tar")
          .option("--zip")
          .action(function(args : any)
          {
            let type : archiver.Format = args.tar ? "tar" : "zip"
            let name : string = args.name ? args.name : "exportApp"
            let exp : Exports = new Exports()
            exp.exportToServer(name,type)
            
          })

  command.command("init <projectName>")
    .description('Model generator')
    .option("-w, --withcontroller <controllerName>")
    .action(async (projectName: any , options: any) => {
      await GitUtils.clone(url, projectName, cloneOpts) // cut the execution if failed , no need to handle error, we want this behaviour
      if(options.withcontroller) createController(options.withcontroller , true , projectName)
    });

  command.command("add")
    .description('add controller')
    .option("-n, --name <templateName>")
    .action(async (templateName : any) => {
      await createController(templateName)
    });

  command.parse(process.argv);

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