const fs = require('fs');
const path = require('path');

const myOptions = {
    'path': { alias: 'p', type: 'string', describe: 'Path of the folder (leave blank to get current directory)' },
    'from': { alias: 'f', type: 'string', describe: 'Search extension inside this directory' },
    'to': { alias: 't', type: 'string', describe: 'Update files with the new extension' }

};
const argv = require('yargs').version('1.1.0').options(myOptions).demandOption(['from', 'to']).help().parse();
const location = argv.path || process.cwd();

if (!fs.existsSync(location)) {
    console.log('Invalid Path. Please try again')
} else {
    const readFolder = fs.readdirSync(location);
    const fromExt = argv.from;
    const toExt = argv.to;

    const extensionArr = readFolder.map((extension) => {
        let ext = path.parse(extension).ext;
        return { from: extension, extension: ext.replace('.', '') };
    })

    let arr = [];
    let start = extensionArr.map((e) => {
        if (e.extension === fromExt) {
            arr.push(true)
            let updateName = `${location}/${path.parse(e.from).name}.${toExt}`
            let from = `${location}/${e.from}`
            fs.appendFile(`${location}/log`, `${e.from} --> ${path.parse(e.from).name}.${toExt} ${new Date().toLocaleString("en-US")}\n`, function (error, success) {
                if (error) throw error;
                console.log(`Added logs : ${e.from} --> ${path.parse(e.from).name}.${toExt}`)
            })
            fs.renameSync(from, updateName);
        }
    })
    if (arr.length == 0) console.log(`No files exist in this directory that has an extension of ${toExt}. Please try again.`)
}