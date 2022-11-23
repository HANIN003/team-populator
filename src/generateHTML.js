const createManager = function (manager) {
    return `
    <div class="card mr-4 ml-4 mb-4 mt-4">
        <div class="card-header">
            <h2 class="card-title">${manager.name}</h2>
            <h3 class="card-subtitle"><i class="fa-solid fa-mug-hot"></i> Manager</h3>
        </div>
        <div class="card-body">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${manager.id}</li>
                <li class="list-group-item">Email: <a href="mailto:${manager.email}">${manager.email}</a></li>
                <li class="list-group-item">Office Number: ${manager.officeNumber}</li>
            </ul>
        </div>
    </div>`;
};

const createEngineer = function (engineer) {
    return `
    <div class="card mr-4 ml-4 mb-4 mt-4">
        <div class="card-header">
            <h2 class="card-title">${engineer.name}</h2>
            <h3 class="card-subtitle"><i class="fa-solid fa-glasses"></i> Engineer</h3>
        </div>
        <div class="card-body">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${engineer.id}</li>
                <li class="list-group-item">Email: <a href="mailto:${engineer.email}">${engineer.email}</a></li>
                <li class="list-group-item">GitHub: <a href="https://www.github.com/${engineer.github}" target="_blank">${engineer.github}</a></li>
            </ul>
        </div>
    </div>`;
};

const createIntern = function (intern) {
    return `
    <div class="card mr-4 ml-4 mb-4 mt-4">
        <div class="card-header">
            <h2 class="card-title">${intern.name}</h2>
            <h3 class="card-subtitle"><i class="fa-solid fa-user-graduate"></i> Intern</h3>
        </div>
        <div class="card-body">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${intern.id}</li>
                <li class="list-group-item">Email: <a href="mailto:${intern.email}">${intern.email}</a></li>
                <li class="list-group-item">School: ${intern.school}</li>
            </ul>
        </div>
    </div>`;
};

generateHTML = (data) => {
    cardArray = [];

    for (let i = 0; i < data.length; i++) {
        const employee = data[i];
        const role = employee.getRole(); 

        if (role === 'Manager') {
            const managerCard = createManager(employee);

            cardArray.push(managerCard);
        }

        if (role === 'Engineer') {
            const engineerCard = createEngineer(employee);

            cardArray.push(engineerCard);
        }

        if (role === 'Intern') {
            const internCard = createIntern(employee);

            cardArray.push(internCard);
        }
    }

    const employeeCards = cardArray.join("")
    const generateTeam = generateTeamHTML(employeeCards);
    return generateTeam;
}

const generateTeamHTML = function (employeeCards) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Software Team</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
        <script src="https://kit.fontawesome.com/e3f7cf7fbc.js" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="./style.css">
    </head>
    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 jumbotron mb-3">
                    <h1 class="text-center">Software Team</h1>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12 d-flex justify-content-center">
                    ${employeeCards}
                </div>
            </div>
        </div>
    </body>
    </html>`;
};

module.exports = generateHTML;