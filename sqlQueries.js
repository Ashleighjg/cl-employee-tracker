const { Pool } = require('pg');

// Connect to database
const pool = new Pool(
  {
    // TODO: Enter PostgreSQL username
    user: 'postgres',
    // TODO: Enter PostgreSQL password
    password: 'Yahgood4dasoul',
    host: 'localhost',
    database: 'employee_db',
  },
  console.log(`Connected to the employee_db database.`)
);

pool.connect();

class sqlQueries {
  constructor(database) {
    this.database = database;
  }

  viewAllDepartments() {
    // Implement logic to retrieve all data from the database
    //return `SELECT * FROM ${this.database}`;
    const sql = `SELECT department.id AS id, department.department_name AS department FROM department`;
    connection.promise().query(sql, (error, response) => {
      if (error) throw error;
      console.log('All Departments:');
      console.table(response);
    });
  }

  viewAllRoles() {
    // Implement logic to insert data into the database
    //return `SELECT * FROM ${this.database}`;
    const sql = `SELECT role.title, role.id, department.department_name AS department
                  FROM role
                  INNER JOIN department ON role.department_id = department.id`;
    connection.promise().query(sql, (error, response) => {
      if (error) throw error;
      console.log('All Roles:');
      console.table(response);
    });
  }

  // Add more query functions as needed
}

module.exports = sqlQueries;
