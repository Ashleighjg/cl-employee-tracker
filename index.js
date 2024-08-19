//const connection = require('./config/connection');
const inquirer = require('inquirer');
// Import and require Pool (node-postgres)
// We'll be creating a Connection Pool. Read up on the benefits here: https://node-postgres.com/features/pooling
const sqlQueries = require('./sqlQueries.js');



const promptUser = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What do you want to do?',
        name: 'choices',
        choices: [
          'view all Departments',
          'view all Roles',
          'view all Employees',
          'add a Department',
          'add a Role',
          'add an Employee',
          'update an Employee',
        ],
      },
    ])
    .then((answers) => {
      const { choices } = answers;
      const mySQLQueries = new SQLQueries('my_table');

      if (choices === 'view all Departments') {
        console.log (mySQLQueries.viewAllDepartments());
        promptUser();
      }

      if (choices === 'view all Roles') {
        console.log(mySQLQueries.viewAllRoles());
        promptUser();
      }

      if (choices === 'view all Employees') {
        viewAllEmployees();
      }

      if (choices === 'add a Department') {
        addDepartment();
      }

      if (choices === 'add a Role') {
        addRole();
      }

      if (choices === 'add an Employee') {
        addEmployee();
      }

      if (choices === 'update an Employee') {
        updateEmployee();
      }
    });
};

// TODO: Create a function to initialize app
function init() {
  promptUser();
}

// Function call to initialize app
init();
