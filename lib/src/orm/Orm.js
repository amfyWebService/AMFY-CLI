"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
class Orm {
    constructor() {
        commander_1.default
            .command('add')
            .description('Model generator')
            .option("-s, --setup_mode [mode]", "Which setup mode to use")
            .action(function (env, options) {
            console.log('coco');
            // var mode = options.setup_mode || "normal";
            // env = env || 'all';
            // console.log('setup for %s env(s) with %s mode', env, mode);
        });
        commander_1.default
            .command('toto', 'Generator model');
        commander_1.default.parse(process.argv);
    }
}
exports.Orm = Orm;
new Orm();
