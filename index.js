const sequelize = require('./config/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

//const sqlQueries = require('./sqlQueries.js');
// Import and require Pool (node-postgres)
// We'll be creating a Connection Pool. Read up on the benefits here: https://node-postgres.com/features/pooling
/*const { Pool } = require('pg');

// Connect to database
const pool = new Pool(
  {
    // TODO: Enter PostgreSQL username
    user: 'postgres',
    // TODO: Enter PostgreSQL password
    password: '',
    host: 'localhost',
    database: 'employee_db',
  },
  console.log(`Connected to the employee_db database.`)
);

pool.connect();
*/

sequelize.sync().then(() => {
  console.log("connected to database");
    promptUser();
});


const promptUser = async () => {
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
      }
    ])
    .then((answers) => {
      const { choices } = answers;

      if (choices === 'view all Departments') {
        viewAllDepartments();
      }

      if (choices === 'view all Roles') {
        viewAllRoles();
      }

      if (choices === 'view all Employees') {
        viewAllEmployees();
      }

      /*
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
      */
    });
};

async function viewAllDepartments() {
    try {
        const sql = `SELECT department.id AS id, department.department_name AS department FROM department`;
        const [response] = await sequelize.query(sql);
        
        console.log('All Departments:');
        console.table(response);
        promptUser();
    } catch (error) {
        console.error(error);
    }
};

async function viewAllRoles() {
    try {
        const sql = `SELECT role.title, role.id, role.salary, department.department_name AS department
                  FROM role
                  INNER JOIN department ON role.department_id = department.id`;
        const [response] = await sequelize.query(sql);
        console.log('All Roles:');
        console.table(response);
      promptUser();
    } catch (error) {
        console.error(error);
    }
};

async function viewAllEmployees() {
    try {
        const sql = `SELECT employee.id AS id, 
                  employee.first_name, 
                  employee.last_name, 
                  role.title, 
                  role.salary
                  FROM employee
                  INNER JOIN role ON employee.role_id = role.id
                  ORDER BY employee.last_name ASC`;
        const [response] = await sequelize.query(sql);
        console.log('All Employees:');
        console.table(response);
      promptUser();
    } catch (error) {
        console.error(error);
    }
};
/*
function viewAllDepartments() {
    // Implement logic to retrieve all data from the database
    //return `SELECT * FROM ${this.database}`;
    const sql = `SELECT department.id, department.name AS department FROM department`;
    sequelize.promise().query(sql, (error, response) => {
      if (error) throw error;
      console.log('All Departments:');
      console.table(response);
      promptUser();
    });
  };

/*
// TODO: Create a function to initialize app
function init() {
  promptUser();
}



// Function call to initialize app
init();
*/
