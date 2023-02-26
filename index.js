const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const teamMembers = [];

// TODO: Write Code to gather information about the development team members, and render the HTML file.
// Prompt questions for the manager
const promptManager = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the team manager's name?",
        },
        {
          type: "input",
          name: "id",
          message: "What is the team manager's employee ID?",
        },
        {
          type: "input",
          name: "email",
          message: "What is the team manager's email address?",
        },
        {
          type: "input",
          name: "officeNumber",
          message: "What is the team manager's office number?",
        },
      ])
      .then((answers) => {
        const manager = new Manager(
          answers.name,
          answers.id,
          answers.email,
          answers.officeNumber
        );
        teamMembers.push(manager);
        promptMenu();
      });
  };
  
  // Prompt questions for adding an engineer
  const promptEngineer = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the engineer's name?",
        },
        {
          type: "input",
          name: "id",
          message: "What is the engineer's employee ID?",
        },
        {
          type: "input",
          name: "email",
          message: "What is the engineer's email address?",
        },
        {
          type: "input",
          name: "github",
          message: "What is the engineer's GitHub username?",
        },
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.name,
          answers.id,
          answers.email,
          answers.github
        );
        teamMembers.push(engineer);
        promptMenu();
      });
  };
  
  // Prompt questions for adding an intern
  const promptIntern = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the intern's name?",
        },
        {
          type: "input",
          name: "id",
          message: "What is the intern's employee ID?",
        },
        {
          type: "input",
          name: "email",
          message: "What is the intern's email address?",
        },
        {
          type: "input",
          name: "school",
          message: "What is the intern's school?",
        },
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.name,
          answers.id,
          answers.email,
          answers.school
        );
        teamMembers.push(intern);
        promptMenu();
      });
  };
  // Prompt menu for adding an engineer or an intern, or finishing the team
  const promptMenu = () => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "What would you like to do?",
          choices: ["Add an engineer", "Add an intern", "Finish building the team"],
        },
      ])
      .then((answers) => {
        if (answers.choice === "Add an engineer") {
          promptEngineer();
        } else if (answers.choice === "Add an intern") {
          promptIntern();
        } else {
          const html = render(teamMembers);
          //to generate HTML
        fs.writeFile('output/team.html', html, (err) => {
            if (err) throw err;
            console.log(`The HTML has been generated and saved to ${outputPath}.`);
          });
        }
      });
  };
  
  promptManager();
