import commander from "commander";

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
            .command('add', 'Generator model');


        commander.parse(process.argv);
    }
}

new Orm();