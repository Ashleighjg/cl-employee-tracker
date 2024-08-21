const sequelize = require('./config/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

//connect to database and initiate prompt
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

      
      if (choices === 'add a Department') {
        addDepartment();
      }

      if (choices === 'add a Role') {
        addRole();
      }
/*
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


async function addDepartment() {
  try {
    const answer = await inquirer.prompt([
      {
        name: 'department',
        type: 'input',
        message: 'What is the name of your new Department?'
      },
    ])
    
    const sql = `INSERT INTO department (department_name) VALUES ('${answer.department}')`;
    sequelize.query(sql, answer.department)
    
    console.log('Department Created');
    viewAllDepartments();
    //promptUser();
  
  } catch (error) {
    console.error(error);
  }
};


async function addRole() {

/*

 await sequelize.query(`Select department.name FROM department`,
   (err, response) => {
     if (err) throw err;

     let deptArray = [];

     for (let i = 0; i < response.length; i++) {
       deptArray.push(response[i].name);
     }
*/
     try {
       const answers = await inquirer.prompt([
         {
           name: 'role',
           type: 'input',
           message: 'Enter new role',
         },
         {
           name: 'salary',
           type: 'input',
           message: 'Enter role salary',
         },
         {
           name: 'departmentID',
           type: 'input',
           message: 'Enter the Department ID for the role',
         },
       ]);

       const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
       const [role, salary, departmentID] = [answers.role, answers.salary, answers.departmentID];

       const res = await sequelize.query(sql, [role, salary, departmentID]);
       //const sql2 = `INSERT INTO role (title, salary, department_id) VALUES ('${data.role}', '${data.salary}', '${results[0].id}')`;

       console.log('Role Created');
       viewAllRoles();
       //promptUser();
     } catch (error) {
       console.error(error);
     }
   
 
 };
  

/*
// TODO: Create a function to initialize app
function init() {
  promptUser();
}



// Function call to initialize app
init();
*/
