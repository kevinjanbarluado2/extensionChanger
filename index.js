const fs = require('fs');
const path = require('path');

const argv = require('yargs').demandOption(['path', 'from', 'to'], 'Path = directory\nFrom = current extension\nTo = update to this new extension').parse();
const location = argv.path;
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
