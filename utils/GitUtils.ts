import nodegit from 'nodegit';
import path from 'path';
export default class GitUtils
{
    static async clone(url : string, fileName : string, cloneOpts : {})
    {   
        const local = ".\\"+fileName
        // console.log(local)
        await nodegit.Clone.clone(url, local, cloneOpts).then(function (repo) {
            console.log("Cloned " + path.basename(url) + " to " + repo.workdir());
        }).catch(function (err) {
            console.log(err);
            process.exit();
        }); 
    }
}

