const fs = require('fs');
const path = require('path');
const less = require('less');

const lessDir = './src/.less/';
const stylesDir = './src/styles/';

const camelize = str => str.replace(/\W+(.)/g, (match, chr) => chr.toUpperCase());
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

fs.readdirSync(lessDir).forEach(lessFile => {
    const lessFilePath = lessDir + lessFile;
    const lessFileExt = path.extname(lessFilePath);
    
    if (lessFileExt != ".less")
        return;

    const outputFileName = path.basename(lessFilePath, '.less');
    const outputFilePath = stylesDir + outputFileName + '.js';
    const outputStyleName = capitalize(camelize(outputFileName.replace("-", " ")));

    fs.readFile(lessFilePath, function (error, lessContent) {
        if (error) {
            console.error("An error occurred when reading " + lessFile + ":\n" + error);
            return;
        }

        less.render(lessContent.toString(), { filename: path.resolve(lessFilePath) }).then(output => {
            const styleContent = "import { css } from 'lit-element';\n\nexport const " + outputStyleName + " = css`\n" + output.css + "`;";
            fs.writeFileSync(outputFilePath, styleContent, 'utf8');
        }, 
        err => { console.error("An error occurred when compiling " + lessFile + ":\n" + err); });
    });
});