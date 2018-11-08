import commander from "commander";
import { EntityGenerator } from "./utils/EntityGenerator";
import { IEntityPropertiesType } from "./utils/IEntity";

export class Orm {
    constructor() {
        commander
            .command('add')
            .description('Model generator')
            .option("-s, --setup_mode [mode]", "Which setup mode to use")
            .action(function (env, options) {console.log('coco')
                // var mode = options.setup_mode || "normal";
                // env = env || 'all';
                // console.log('setup for %s env(s) with %s mode', env, mode);
            });


        commander
            .command('toto')
            .description('Model generator')
            .action(async () => {
                EntityGenerator.generate({entityName: 'user', properties: [{name: 'name', type: IEntityPropertiesType.TEXT}]})
            })


        commander.parse(process.argv);
    }
}

new Orm();