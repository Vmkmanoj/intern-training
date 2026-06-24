-- ==========================================
-- USERS TABLE
-- ==========================================

CREATE TABLE users (
    name VARCHAR(200),
    age INT,
    collega VARCHAR(200)
);

INSERT INTO users (name, age, college)
VALUES ('manojkumar', 23, 'Kongu Engineering College');

UPDATE users
SET college = 'Sasurie College'
WHERE age = 23;

SELECT * FROM users;

ALTER TABLE users
RENAME COLUMN collega TO college;

ALTER TABLE users
ADD COLUMN id SERIAL;

DELETE FROM users
WHERE id = 2;

TRUNCATE TABLE users;

ROLLBACK;

-- ==========================================
-- STUDENT TABLE
-- ==========================================

CREATE TABLE student (
    id SERIAL,
    name VARCHAR(20),
    department VARCHAR(20),
    addederss TEXT,
    createdBy VARCHAR(20),
    createdAt TIMESTAMPTZ,
    updatedBy VARCHAR(20),
    updatedAt TIMESTAMPTZ
);

SELECT * FROM student;

ALTER TABLE student
ADD COLUMN description TEXT;

ALTER TABLE student
RENAME COLUMN id TO i_d;

ALTER TABLE student
ADD COLUMN age INT;

ALTER TABLE student
DROP COLUMN description;

INSERT INTO student (
    name,
    department,
    addederss,
    createdby,
    updatedby
)
VALUES (
    'manoj',
    'mca',
    'tiruppur',
    'manoj',
    'manoj'
);

-- ==========================================
-- BULK INSERT STUDENTS
-- ==========================================

INSERT INTO student (
    name,
    age,
    department,
    addederss,
    createdby,
    updatedby,
    createdat,
    updatedat
)
VALUES
('Manoj',23,'MCA','Tiruppur','manoj','manoj',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('Arun',22,'MCA','Coimbatore','admin','admin',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('Karthik',24,'MBA','Erode','admin','admin',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('Priya',21,'MCA','Salem','admin','admin',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('Divya',20,'BCA','Chennai','admin','admin',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('Vignesh',23,'BSc CS','Madurai','admin','admin',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('Suresh',25,'MCA','Karur','admin','admin',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('Keerthana',22,'MBA','Namakkal','admin','admin',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('Naveen',21,'B.Tech IT','Trichy','admin','admin',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
('Harini',24,'MSc CS','Vellore','admin','admin',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

-- ==========================================
-- VIEWS
-- ==========================================

CREATE VIEW createStudent_View AS
SELECT *
FROM student
WHERE department = 'MCA';

SELECT * FROM createStudent_View;

CREATE VIEW senior_view AS
SELECT *
FROM student
WHERE age > 22;

SELECT * FROM senior_view;

-- ==========================================
-- UPDATES
-- ==========================================

UPDATE student
SET age = 12
WHERE name = 'Manoj';

INSERT INTO student (
    name,
    age,
    department,
    addederss,
    createdby,
    updatedby,
    createdat,
    updatedat
)
VALUES (
    'Manoj',
    40,
    'MCA',
    'Tiruppur',
    'manoj',
    'manoj',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- ==========================================
-- QUERIES
-- ==========================================

SELECT name, department
FROM student
WHERE age < 22;

SELECT name
FROM student
WHERE name ILIKE 'K%';

SELECT name, age
FROM student
WHERE name ILIKE 'A%';

SELECT COUNT(*) FROM student;

SELECT SUM(age) FROM student;

SELECT *
FROM student
ORDER BY age;

SELECT *
FROM student
ORDER BY createdat;

SELECT *
FROM student
LIMIT 5 OFFSET 2;

-- ==========================================
-- DEPARTMENTS TABLE
-- ==========================================

CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(50)
);

INSERT INTO departments (department_name)
VALUES
('HR'),
('Finance'),
('IT'),
('Marketing'),
('Sales'),
('Operations'),
('Support'),
('Admin'),
('Legal'),
('Research'),
('Security'),
('Training'),
('Development'),
('QA'),
('DevOps'),
('Design'),
('Procurement'),
('Logistics'),
('Analytics'),
('Management');

-- ==========================================
-- EMPLOYEES TABLE
-- ==========================================

CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    employee_name VARCHAR(50),
    age INT,
    salary DECIMAL(10,2),
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(department_id)
);

INSERT INTO employees (
    employee_name,
    age,
    salary,
    department_id
)
VALUES
('Manoj',22,30000,3),
('Ajith',32,65000,16),
('Arun',25,35000,1),
('Kumar',28,40000,2),
('Priya',24,45000,4),
('Divya',27,50000,5),
('Rahul',30,55000,6),
('Sneha',26,42000,7),
('Vijay',29,48000,8),
('Anu',23,32000,9),
('Ravi',31,60000,10),
('Hari',22,33000,11),
('Meena',24,36000,12),
('Suresh',27,47000,13),
('Karthik',29,52000,14),
('Nisha',25,39000,15),
('Deepa',26,43000,17),
('Gokul',28,49000,18),
('Pooja',24,41000,19),
('Ashwin',33,70000,20);

-- ==========================================
-- USER DETAILS TABLE
-- ==========================================

CREATE TABLE userdetails (
    id SERIAL PRIMARY KEY,

    employee_details INT NOT NULL,
    department INT NOT NULL,

    FOREIGN KEY (employee_details)
    REFERENCES employees(employee_id),

    FOREIGN KEY (department)
    REFERENCES departments(department_id)
);

INSERT INTO userdetails (
    employee_details,
    department
)
VALUES (2,2);

SELECT * FROM userdetails;

-- ==========================================
-- JOIN VIEW
-- ==========================================

CREATE VIEW usersDetails AS
SELECT
    u.id,
    e.employee_name,
    d.department_name
FROM userdetails u
INNER JOIN employees e
    ON u.employee_details = e.employee_id
INNER JOIN departments d
    ON u.department = d.department_id;

SELECT * FROM usersDetails;

-- ==========================================
-- SALARY VIEW
-- ==========================================

CREATE VIEW salaryForEachDepartment AS
SELECT
    e.employee_name,
    e.salary,
    d.department_name
FROM employees e
INNER JOIN departments d
ON e.department_id = d.department_id;

SELECT * FROM salaryForEachDepartment;