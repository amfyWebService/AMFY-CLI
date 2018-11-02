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
const json_type_validation_1 = require("@mojotech/json-type-validation");
const fs_1 = __importDefault(require("fs"));
const constants_1 = require("constants");
class FilesUtils {
    /*
* Extension : Extension of the file to generate
* name: Name of the file to generate
* fullPathSrc : Path of the src file exemple : __dirname+"/myTemplate.ts"
* fullPathDest : Path where the file has to be copied exemple : __diname"/myDest/"
* template : enum of the type of template to copy
*/
    static createFileFromTemplate(fullPathSrc, fullPathDest) {
        return __awaiter(this, void 0, void 0, function* () {
            fs_1.default.copyFile(fullPathSrc, fullPathDest, constants_1.COPYFILE_EXCL, (err) => {
                if (err)
                    throw new Error("Can't copy file from template to : " + fullPathDest);
            });
        });
    }
    static replaceTag(listOfTag, fullPathDest) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs_1.default.readFile(fullPathDest, function (err, data) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw new Error("Can't open file : " + fullPathDest);
                    let fileText = data.toString();
                    yield listOfTag.map((obj) => {
                        fileText = fileText.replace(obj.toReplace, obj.replacer);
                    });
                    yield fs_1.default.writeFile(fullPathDest, fileText, (err) => {
                        if (err)
                            throw new Error("Can't write file : " + fullPathDest);
                    });
                });
            });
        });
    }
    static rename(oldPath, newName) {
        return __awaiter(this, void 0, void 0, function* () {
            let tabPath = oldPath.split("/");
            tabPath.pop();
            let newPath = tabPath.join('/') + '/' + newName;
            yield fs_1.default.rename(oldPath, newPath, (err) => {
                if (err)
                    throw err;
                console.log('renamed complete');
            });
        });
    }
}
FilesUtils.decoderValueTochange = json_type_validation_1.object({
    toReplace: json_type_validation_1.string(),
    replacer: json_type_validation_1.string()
});
exports.default = FilesUtils;
