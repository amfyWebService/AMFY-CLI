import fs from 'fs-extra';
import nodegit from 'nodegit';
import path from 'path';

export default class GitUtils {
    static async clone(url: string, fileName: string, cloneOpts: {}, message: string = "Project has been created") {
        const local = path.join("./", fileName);
        await nodegit.Clone.clone(url, local, cloneOpts).then(async function (repo) {
            console.log(message);
            fs.removeSync(path.join(local, '.git'));
            fs.unlinkSync(path.join(local, 'LICENSE.md'));
        }).catch(function (err) {
            console.log(err);
            process.exit();
        });
    }
}

