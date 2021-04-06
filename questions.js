const fs = require('fs');

function getCompanyQuestions(company){
    fs.readFile(`./${company}.json`, 'utf8', (err, json) => {
        if(err){
            console.log("File read failed:", err);
            return;
        }
        try{
            const companyObject = JSON.parse(json)
            const problems = companyObject.problems;

            problems.sort(function(a, b){
                return b.freq - a.freq;
            });

            console.log("Showing questions for "+companyObject.company+"\n");
            for(var x=0;x<problems.length;x++){
                console.log(x+1+ ": " + problems[x].name + ` (${problems[x].freq} times)`);
                console.log(problems[x].problemStatement);
                console.log("Solution: "+problems[x].solution);
                console.log("\n");
            }
        }
        catch(err){
            console.log("Error: "+err);
        }
    })
}

getCompanyQuestions("Bloomberg");