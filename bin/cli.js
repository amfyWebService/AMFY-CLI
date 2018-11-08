#!/usr/bin/env node
require('ts-node').register({"compilerOptions": {
    "target": "es2017",
    "module": "commonjs",
    "lib"   : ["es2017","dom","es2017.object"],
    "outDir" : "lib",
    "rootDir": "",
    "strict": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  }});
require('../index.ts');

