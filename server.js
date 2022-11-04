const express = require("express");
const inputCheck = require("./utils/inputCheck");
const PORT = process.env.PORT || 3001;
const app = express();

const mysql = require("mysql2");



app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Citibank123@',
    database: 'team'
},
    
    console.log('Connected to the team database.')
);


// GET all employees

app.get("/api/department", (req, res) => {

    const sql = `SELECT * FROM employees`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
    
        res.json({
            message: "success",
            data: rows,
        });
    });
});




// Get a single candidate

app.get('/api/department/:id', (req, res) => {

    const sql = `SELECT * FROM employees WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
    
        res.json({
            message: 'success',
            data: row
        });

    }); 

});






// Delete a candidate

app.delete('/api/employees/:id', (req, res) => {
    
    const sql = `DELETE FROM employees WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        
        if (err) {
        res.statusMessage(400).json({ error: res.message });
        }
        
        else if (!result.affectedRows) {
            res.json({
            message: 'employee not found'
            });
        }
        
        else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});



// Create a candidate

app.post("/api/department", ({ body }, res) => {

    const errors = inputCheck(
        body,
        'name'
    );

    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    
    
    const sql = `INSERT INTO department (name)
        VALUES (?)`;
    const params = [body.name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
    
        res.json({
            message: 'success',
            data: body
        });
    
    });

});





app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});