const fs = require('fs');
const path = require('path');

const myOptions = {
    'path': { alias: 'p', type: 'string', describe: 'Path of the folder (leave blank to get current directory)' },
    'from': { alias: 'f', type: 'string', describe: 'Search extensions inside the chosen folder' },
    'to': { alias: 't', type: 'string', describe: 'Update files with the new extension' }

};
const argv = require('yargs').version('1.1.0').options(myOptions).demandOption(['from', 'to']).help().parse();

const location = argv.path || __dirname;
console.log(location)
const readFolder = fs.readdirSync(location);
const fromExt = argv.from;
const toExt = argv.to;

const extensionArr = readFolder.map((extension) => {
    let ext = path.parse(extension).ext;
    return { from: extension, extension: ext.replace('.', '') };
})

let start = extensionArr.map((e) => {
    if (e.extension === fromExt) {
        let updateName = `${location}/${path.parse(e.from).name}.${toExt}`
        let from = `${location}/${e.from}`
        console.log(`${e.from} --> ${path.parse(e.from).name}.${toExt}`)
        fs.renameSync(from, updateName);
    }
})
