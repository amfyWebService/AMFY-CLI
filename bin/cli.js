#!/usr/bin/env node
let fs = require("fs")
console.log(__dirname)
console.log(process.cwd())


 function test()
{
    if(!fs.existsSync(process.cwd()+"/tsconfig.json"))
    {
        fs.copyFileSync(__dirname+"/tsconfig.json", process.cwd()+"/tsconfig.json")
        require('ts-node').register({});
        require('../index.ts');
        fs.unlinkSync(process.cwd()+"/tsconfig.json")
    }
    else
    {
        require('ts-node').register({});
        require('../index.ts');
    }
 

}

test()