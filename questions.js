const fs = require('fs');

function getCompanyQuestions(company){
    fs.readFile(`./Companies/${company}.json`, 'utf8', (err, json) => {
        if(err){
            console.log("File read failed:", err);
            return;
        }
        try{
            //console.log(json);
            const companyObject = JSON.parse(json)
            const problems = companyObject.problems;

            problems.sort(function(a, b){
                if(a.completed == b.completed){
                    return b.freq - a.freq;
                }
                if(a.completed){
                    return 1;
                }
                if(b.completed){
                    return -1;
                }
            });

            console.log("Showing questions for "+companyObject.company+", sorted by frequency\n");
            for(var x=0;x<problems.length;x++){
                var completed = "Unanswered";
                if(problems[x].completed){
                    completed = "Completed";
                }
                console.log(x+1+ ": " + problems[x].name + ` (${problems[x].freq} times)` + ` (${completed})`);
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

function addCompanyQuestion(company, questionName, link, prompt){ 
    var newFile = {
        company: company,
        problems: [],
    }

    fs.readFile(`./Companies/${company}.json`, 'utf8', (err, json) => {
        if(err){
            console.log("Company does not yet exist, creating file");
            
            var newProblem = {
                name:questionName,
                freq: 1,
                completed: false,
                solution: link,
                problemStatement: prompt
            }

            newFile.problems.push(newProblem);

            fs.writeFile(`./Companies/${company}.json`, JSON.stringify(newFile), (err) =>{
                if(err){
                    console.log("An error occurred: " + err);
                }
                else{
                    console.log("Created company file for " + company);
                }
            });
        }
        else{
            var companyObject = JSON.parse(json);
            var problems = companyObject.problems;
            
            for(var x=0;x<problems.length;x++){
                if(problems[x].name == questionName){
                    //console.log("Incrementing frequency for " + problems[x].name + " at " + company);
                    problems[x].freq = problems[x].freq+1;
                    fs.writeFile(`./Companies/${company}.json`, JSON.stringify(companyObject), (err) => {
                        if(err){
                            console.log("An error occurred while editing " + err);
                        }
                        else{
                            //console.log("Successfully edited company file");
                        }
                    });
                    return;
                }
            }

            console.log("Problem not found for " + company + ", adding question");
            var newProblem = {
                name:questionName,
                freq: 1,
                completed: false,
                solution: link,
                problemStatement: prompt
            }
            
            problems.push(newProblem);

            fs.writeFile(`./Companies/${company}.json`, JSON.stringify(companyObject), (err) =>{
                if(err){
                    console.log("An error occurred while adding new question: " + err);
                }
                else{
                    //console.log("Successfully edited");
                }
            });
        }
    });

}

addCompanyQuestion("Amazon", "Two Sum", "https://leetcode.com/problems/two-sum", "Find out if 2 elements of array add up to target sum");

getCompanyQuestions("Amazon"); 