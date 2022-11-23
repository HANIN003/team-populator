const fs = require("fs");
const inquirer = require("inquirer");
const emailValidator = require("email-validator");
const generateHTML = require("./src/generateHTML");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const util = require("util");

const teamArray = [];

const addManager = () => {
    return inquirer.prompt ([
        {
            type: "input",
            name: "name",
            message: "Please enter manager's name.",
            validate: (value) => {
                if (value) {
                    return true
                } else {
                    return "Please enter manager's name."
                }
            }
        },

        {
            type: "input",
            name: "id",
            message: "Please enter manager's ID.",
            validate: (value) => {
                if (isNaN(value)) {
                    return "Please enter a number."
                } else {
                    return true
                }
            }

        },

        {
            type: "input",
            name: "email",
            message: "Please enter manager's email address.",
            validate: (value) => {
                if (emailValidator.validate(value)) {
                    return true
                } else {
                    return "Please enter a valid email address."
                }

            }
        },

        {
            type: "input",
            name: "officeNumber",
            message: "Please enter the manager's office number.",
            validate: (value) => {
                if (isNaN(value)) {
                    return "Please enter a number."
                } else {
                    return true
                }
            }
        },
    ])

    .then(managerInput => {
        const { name, id, email, officeNumber } = managerInput;
        const manager = new Manager (name, id, email, officeNumber);
        teamArray.push(manager);
    })
};

const addTeamMember = () => {
    return inquirer.prompt ([
        {
            type: "list",
            name: "role",
            message: "Please provide the role for your team member.",
            choices: ["Engineer", "Intern"],
        },

        {
            type: "input",
            name: "name",
            message: "Please enter engineer's name.",
            when: (input) => input.role === "Engineer",
            validate: (value) => {
                if (value) {
                    return true
                } else {
                    return "Please enter engineer's name."
                }
            }
        },

        {
            type: "input",
            name: "id",
            message: "Please enter engineer's ID.",
            when: (input) => input.role === "Engineer",
            validate: (value) => {
                if (isNaN(value)) {
                    return "Please enter a number."
                } else {
                    return true
                }
            }

        },

        {
            type: "input",
            name: "email",
            message: "Please enter engineer's email address.",
            when: (input) => input.role === "Engineer",
            validate: (value) => {
                if (emailValidator.validate(value)) {
                    return true
                } else {
                    return "Please enter a valid email address."
                }

            }
        },

        {
            type: "input",
            name: "github",
            message: "Please enter the engineer's GitHub username.",
            when: (input) => input.role === "Engineer",
            validate: (value) => {
                if (value) {
                    return true
                } else {
                    return "Please enter a GitHub username."
                }
            }
        },

        {
            type: "input",
            name: "name",
            message: "Please enter intern's name.",
            when: (input) => input.role === "Intern",
            validate: (value) => {
                if (value) {
                    return true
                } else {
                    return "Please enter intern's name."
                }
            }
        },

        {
            type: "input",
            name: "id",
            message: "Please enter intern's ID.",
            when: (input) => input.role === "Intern",
            validate: (value) => {
                if (isNaN(value)) {
                    return "Please enter a number."
                } else {
                    return true
                }
            }

        },

        {
            type: "input",
            name: "email",
            message: "Please enter intern's email address.",
            when: (input) => input.role === "Intern",
            validate: (value) => {
                if (emailValidator.validate(value)) {
                    return true
                } else {
                    return "Please enter a valid email address."
                }

            }
        },

        {
            type: "input",
            name: "school",
            message: "Please enter the name of the school the intern is attending.",
            when: (input) => input.role === "Intern",
            validate: (value) => {
                if (value) {
                    return true
                } else {
                    return "Please enter the name of the school."
                }
            }
        },
        
        {
            type: "confirm",
            name: "addEmployee",
            message: "Would you like to add another team member?",
            default: false
        },
    ])

    .then(employeeData => {
        let { name, id, email, role, github, school, addEmployee } = employeeData;
        let employee;

        if (role === "Engineer") {
            employee = new Engineer (name, id, email, github);
        
        } else if (role === "Intern") {
            employee = new Intern (name, id, email, school);
        }

        teamArray.push(employee);

        if (addEmployee) {
            return addTeamMember(teamArray);
        } else {
            return teamArray;
        }
    })
};


const writeFile = data => {
    fs.writeFile("./dist/index.html", data, err => {
        if (err) {
            console.error(err);
        } else {
            console.log("The team page has been created successfully!")
        };
    });
};

addManager()
    .then(addTeamMember)
    .then(teamArray => {
        return generateHTML(teamArray);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .catch(err => {
        console.log(err);
    });
