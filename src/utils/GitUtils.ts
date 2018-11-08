import nodegit from 'nodegit';
import path from 'path';
export default class GitUtils
{
    static async clone(url : string, fileName : string, cloneOpts : {}, message: string = "Project has been created")
    {   
        const local = path.join("./", fileName);
        await nodegit.Clone.clone(url, local, cloneOpts).then(async function (repo) {
        console.log(message);
        }).catch(function (err) {
            console.log(err);
            process.exit();
        }); 
    }
}

