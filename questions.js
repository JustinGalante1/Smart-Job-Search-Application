const fs = require('fs');

function getCompanyQuestions(company){
    fs.readFile(`./${company}.json`, 'utf8', (err, json) => {
        if(err){
            console.log("File read failed:", err);
            return;
        }
        console.log('File data:', jsonString);
    })
}