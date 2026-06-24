create table users(
	userid serial primary key not null,
	name varchar(200) not null,
	about varchar(200) not null,
	createdAt timestamptz,
	updatedAt timestamptz,
	createdby varchar(200),
	updatedby varchar(200)
)

create table post(
	id serial primary key not null,
	userId int not null,
	foreign key (userId) references users(userid) on delete cascade,
	description varchar(200),
	createdAt timestamptz,
	updatedAt timestamptz,
	createdby varchar(200),
	updatedby varchar(200)
)

drop table post

INSERT INTO users (
    name,
    about,
    createdAt,
    updatedAt,
    createdby,
    updatedby
)
VALUES
(
    'mahi',
    'React Developer',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    'admin',
    'admin'
)
-- (
--     'Arun Kumar',
--     'Backend Developer',
--     CURRENT_TIMESTAMP,
--     CURRENT_TIMESTAMP,
--     'admin',
--     'admin'
-- ),
-- (
--     'Priya',
--     'Full Stack Developer',
--     CURRENT_TIMESTAMP,
--     CURRENT_TIMESTAMP,
--     'admin',
--     'admin'
-- );

select * from users

INSERT INTO post (
    userId,
    description,
    createdAt,
    updatedAt,
    createdby,
    updatedby
)
VALUES
(
    5,
    'My first post about React',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    'Manoj Kumar',
    'Manoj Kumar'
);
-- (
--     4,
--     'Learning PostgreSQL',
--     CURRENT_TIMESTAMP,
--     CURRENT_TIMESTAMP,
--     'Manoj Kumar',
--     'Manoj Kumar'
-- ),
-- (
--     2,
--     'FastAPI authentication tutorial',
--     CURRENT_TIMESTAMP,
--     CURRENT_TIMESTAMP,
--     'Arun Kumar',
--     'Arun Kumar'
-- ),
-- (
--     3,
--     'Building a MERN application',
--     CURRENT_TIMESTAMP,
--     CURRENT_TIMESTAMP,
--     'Priya',
--     'Priya'
-- );

select * from post

select * from users
 
update post set description = 'hello this mano doing it' where id = 7

create view userPostView as select u.name,u.about,p.description , p.createdat , p.createdby 
from users u inner join post p on u.userId = p.userId

create view leftJoinuserPostView as select u.name,u.about,p.description , p.createdat , p.createdby 
from users u left join post p on u.userId = p.userId


select * from userpostview

select * from leftJoinuserPostView

delete from users where userid = 1

create view total_post_User as select u.name , count(p.userId) as totalpost from users u
inner join post p on u.userId = p.userId group by u.name

select * from total_post_User

SELECT
    u.name,
    COUNT(p.userId) AS totalPost
FROM users u
left JOIN post p
    ON u.userid = p.userId
GROUP BY u.name;

drop view userpostview


------------------------------------------------------------------------------------------------------------------------


create table teacher (

	teacherId serial primary key not null,
	teacherName varchar(100),
	teacherPhoneNumber varchar(20),
	adderss varchar(200),

	createdAt timestamptz,
	updatedAt timestamptz,
	createdby varchar(200),
	updatedby varchar(200)

)

create table student(

	studentId serial primary key not null,
	studentName varchar(100),

	teacherId int not null,

	foreign key (teacherId) references teacher(teacherId) on delete cascade,
	
	createdAt timestamptz,
	updatedAt timestamptz,
	createdby varchar(200),
	updatedby varchar(200)

)


INSERT INTO teacher (
    teacherName,
    teacherPhoneNumber,
    adderss,
    createdAt,
    updatedAt,
    createdby,
    updatedby
)
VALUES
('Rajesh Kumar', '9876543210', 'Chennai', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
('Priya Sharma', '9876543211', 'Coimbatore', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
('Arun Prakash', '9876543212', 'Madurai', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
('Divya Rani', '9876543213', 'Salem', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
('Karthik S', '9876543214', 'Erode', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
('Meena Devi', '9876543215', 'Tiruppur', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
('Vijay Kumar', '9876543216', 'Trichy', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
('Anitha M', '9876543217', 'Vellore', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
('Suresh Babu', '9876543218', 'Thanjavur', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
('Lakshmi Priya', '9876543219', 'Karur', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin');


INSERT INTO student (
    studentName,
    teacherId,
    createdAt,
    updatedAt,
    createdby,
    updatedby
)
VALUES
('Manoj Kumar', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
('Arun Kumar', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
('Hemavarshini', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
('Kavin', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
('Nandhini', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
('Praveen', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
('Harini', 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
('Ragul', 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
('Keerthana', 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
('Vignesh', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin');


select * from student

select * from teacher


create view studentAndTreacher as select s.studentname , t.teacherName from student s inner join 
teacher t on s.teacherId = t.teacherId

create view teacherStudentCount as select t.teacherName , count(*) as totalStudent from teacher t
inner join student s on s.teacherId = t.teacherId group by t.teacherName

select * from teacherStudentCount

CREATE UNIQUE INDEX idx_teacher_phone
ON teacher(teacherPhoneNumber);

drop index idx_teacher_phone

select * from teacher where teacherPhoneNumber = '9876543215'

SELECT *
FROM pg_indexes
WHERE tablename = 'student';

CREATE INDEX idx_student_teacher
ON student(studentName, teacherId);

SELECT *
FROM student
WHERE studentName = 'Manoj Kumar'
  AND teacherId = 1;    