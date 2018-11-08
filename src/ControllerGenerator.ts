import { Tools } from './utils/utilsclass/Tools';
import * as fs from "fs"
import FilesUtils from "./utils/FilesUtils";
import path from 'path';

export class ControllerGenerator {
    private static listOfTemplateVar: Array<Object> = []

    public static async createController(name: string, isInit: boolean = false, projectname: string = "") {
        let pathControllerTemplate = await Tools.getTemplate('controller');
        // name = name + 'Controller';

        if (fs.existsSync(await this.getControllerPath()) || isInit && fs.existsSync(pathControllerTemplate)) {
            this.listOfTemplateVar.push({ "defaultController": name })

            let destination: string = path.join((await this.getControllerPath(isInit, projectname)), name + '.ts');
            let src: string = pathControllerTemplate
    
            FilesUtils.createFileFromTemplate(src, destination, this.setListOfTag())
        }
        else {
    
            console.log("Cannot find '/src/controller' Directory  , are you sure that you are in AMFY project ?")
            process.exit()
        }
    }
    
    public static setListOfTag(): {[key: string]: string} {
        let toReturn: {[key: string]: string} = {};
        for (let i = 0; i < this.listOfTemplateVar.length; i++) {
            for (const [template, replacer] of Object.entries(this.listOfTemplateVar[i])) {
                toReturn[template] = replacer
            }
        }
        return toReturn
    }

    private static async getControllerPath(isInit: boolean = false, projectName?: string) {
        const rootPath = isInit && projectName ? path.join(process.cwd(), projectName) : await Tools.getAppRootPath();
        const modelPath = '/src/controllers';

        return rootPath + modelPath;
    }
}