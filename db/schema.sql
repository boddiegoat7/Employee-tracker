
CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    title VARCHAR(30) NOT NULL,
    department VARCHAR(30) NOT NULL,
    salary INTEGER NOT NULL,
    manager VARCHAR(30) NOT NULL
);
