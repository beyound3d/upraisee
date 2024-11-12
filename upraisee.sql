create database upraisee

table students
 Student_id 	 name    	 class 
 1          	 Rahul   	 10    
 2          	 Anjali  	 12    
 3          	 Sameer  	 10    


create table students
(
student_id int,
name varchar(50),
class varchar(40)
)

select * from students

insert into students(student_id, name, class)
values( '3','Sameer','10')

 Student_id 	 Subject   	 Marks
 1          	Maths 	     90 
 2          	 Science	 85  
 3          	 Maths  	 88
 3	            Science   	 75


create table studentsMarks
(
student_id int,
subject varchar(30),
marks varchar(40)
)

insert into studentsMarks(student_id, subject, marks)
values(  '3','Science','75')

ALTER TABLE studentsMarks
Alter COLUMN marks int;

select * from studentsMarks

--Creation process complete--

--⦁	Task: Write SQL queries to:
--a) Retrieve the names of students with their marks.
--b) Show students who scored more than 80 in Math.


SELECT s.name, m.Marks
FROM Students s
INNER JOIN studentsMarks m ON s.Student_id = m.Student_id;


SELECT s.name, m.Marks
FROM Students s
INNER JOIN studentsMarks m ON s.Student_id = m.Student_id
WHERE m.Subject = 'Maths' AND m.Marks > 80;

--⦁	c) Use INNER JOIN and LEFT JOIN on the above tables, explaining their difference with outputs.

--Answer:

--INNER JOIN only shows students who have corresponding marks in the Marks table. If a student has no marks, 
--they will not appear in the result.

--LEFT JOIN includes all students, regardless of whether they have marks or not.
--Students without marks will show NULL in the subject and marks columns.

SELECT s.name, m.Subject, m.Marks
FROM Students s
INNER JOIN studentsMarks m ON s.Student_id = m.Student_id;


SELECT s.name, m.Subject, m.Marks
FROM Students s
LEFT JOIN studentsMarks m ON s.Student_id = m.Student_id;
