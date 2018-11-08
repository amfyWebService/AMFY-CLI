#!/usr/bin/env node

import * as commander from "commander"
import GitUtils from './src/utils/GitUtils'
import { Exports } from './src/utils/Exports';
import * as archiver from 'archiver'
import { exec } from 'child_process';
import { ControllerGenerator } from "./src/ControllerGenerator";
import { Orm } from "./src/orm/Orm";


const url: string = "https://github.com/amfyWebService/AMFY"

const optionsBasePull: object = { checkoutBranch: "develop" };


async function init() {
    let command: any = new commander.Command()
    command.command("export")
        .description("Export file ")
        .option("-n, --name <value>", "name of the archive")
        .option("--tar")
        .option("--zip")
        .option("-d, --dir <dir>")
        .action(function (name: any, args: any) {
            let type: archiver.Format = args.tar ? "tar" : "zip"
            let exp: Exports = new Exports()
            args.dir ? exp.pathArchive = args.dir : exp.pathArchive = process.cwd() + "/"
            exp.exportToServer(name, type)
        })

    command.command("init <projectName>")
        .description('Model generator')
        .option("-w, --withcontroller <controllerName>")
        .action(async (projectName: any, options: any) => {
            await GitUtils.clone(url, projectName, optionsBasePull) // cut the execution if failed , no need to handle error, we want this behaviour

            if (options.withcontroller)
                ControllerGenerator.createController(options.withcontroller, true, projectName)


        });

    command.command("controller-add <name>")
        .description('add controller')
        .action((templateName: any) => {
            ControllerGenerator.createController(templateName)
        })

    new Orm(command);

    command.parse(process.argv);

}

init()
