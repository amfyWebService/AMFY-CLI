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
Object.defineProperty(exports, "__esModule", { value: true });
const nodegit_1 = __importDefault(require("nodegit"));
const path_1 = __importDefault(require("path"));
class GitUtils {
    static clone(url, fileName, cloneOpts) {
        return __awaiter(this, void 0, void 0, function* () {
            const local = ".\\" + fileName;
            // console.log(local)
            yield nodegit_1.default.Clone.clone(url, local, cloneOpts).then(function (repo) {
                console.log("Cloned " + path_1.default.basename(url) + " to " + repo.workdir());
            }).catch(function (err) {
                console.log(err);
                process.exit();
            });
        });
    }
}
exports.default = GitUtils;
