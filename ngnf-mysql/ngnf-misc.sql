USE ngnf;

/* pass a user id to create an application */
CALL add_Application(3, @out);
SELECT @out;
SELECT * FROM Applications WHERE ApplicationId = @out;

/* delete an application */
CALL del_Application(216);


/* get data from each table */
SELECT * FROM Applications;
SELECT * FROM Org_model;
SELECT * FROM Con_model;
SELECT * FROM Gen_model;
SELECT * FROM Bac_model;
SELECT * FROM Fin_model;
SELECT * FROM Users;

/* static data */
SELECT * FROM Statuses;
SELECT * FROM OrgTypes;

/* DDE Calls */
SHOW TABLES;
SHOW CREATE PROCEDURE add_Application;
SHOW PROCEDURE STATUS WHERE Db = 'ngnf';
SELECT VERSION();
DROP PROCEDURE del_Application2;


