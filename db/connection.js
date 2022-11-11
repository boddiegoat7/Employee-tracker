const mysql = require("mysql2");


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Citibank123@',
    database: 'team'
},
    
    console.log('Connected to the team database.')
);

module.exports = db;