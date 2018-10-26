#!/usr/bin/env node

import commander from 'commander';
import GitUtils from './utils/GitUtils'
import FilesUtils from './utils/FilesUtils'


console.log(__dirname);

commander
  .version('0.1.0')
  .option('init, --init', 'start')
  .parse(process.argv);

var url = "https://github.com/amfyWebService/AMFY-CLI",
  fileName =  "Fichier_clone",
  cloneOpts = {};

if (commander.init){
  GitUtils.clone(url, fileName, cloneOpts).then(res => { 
    // FilesUtils.rename(local+'/index.ts','bonjour.ts')
  }).catch(error => {
      console.log('ERROR:', error.message);
  });
}
