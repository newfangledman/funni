const fs = require('fs');
const path = require('path');
const dataRoot = path.join(__dirname, '../../../data/');
const inputPath = path.join(dataRoot, 'dataset.csv');

function csvToJSON(csv) {
    const lines = csv.split('\n');

    const result = { places: [] };

    const headers = lines[0].split(',');
    lines.splice(0, 1);
    lines.forEach(function(line, pos) {
        const obj = {};
        obj['id'] = pos + 1;
        const currentline = line.split(',');
        headers.forEach(function(header, i) {
            obj[header] = currentline[i];
        });
        result.places.push(obj);
    });
    return result;
}

function writeJSON(json) {
    const jsonContent = JSON.stringify(json);
    console.log(jsonContent);

    fs.writeFile(
        path.join(dataRoot, 'data.json'),
        jsonContent,
        'utf8',
        function(err) {
            if (err) {
                console.log(
                    'An error occured while writing JSON Object to File.'
                );
                return console.log(err);
            }

            console.log('JSON file has been saved.');
        }
    );
}

async function loadCsvFile(path) {
    return fs.readFileSync(path, 'utf-8');
}

async function processCsv(path) {
    const fileData = await loadCsvFile(path);
    writeJSON(csvToJSON(fileData));
}

processCsv(inputPath);
