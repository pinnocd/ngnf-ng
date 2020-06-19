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
DELETE  FROM Users WHERE id IN (38, 39, 43);
UPDATE Applications SET UserId = 1 WHERE ApplicationId = 1 ;

UPDATE Users SET usertype = 'P' WHERE id IN (44)

SELECT id, name, email, CASE usertype 
							WHEN 'R' THEN 'Regular' 
							WHEN 'A' THEN 'Admin'
                            ELSE usertype
						END AS usertype
            FROM Users;
SELECT id, name, email, CASE usertype 
                                        WHEN 'R' THEN 'Regular'
                                        WHEN 'A' THEN 'Admin'
                                        ELSE usertype
                                    END as usertype
            FROM Users


/* static data */
SELECT * FROM Statuses;
SELECT * FROM OrgTypes;

UPDATE Users SET usertype = 'R' WHERE id IN (38);

ALTER TABLE Users MODIFY password VARCHAR(64);

ALTER TABLE Applications ADD   ProposalWriter		INT;
ALTER TABLE Applications ADD   SeniorApprover		INT;


/* DDE Calls */
SHOW TABLES;
SHOW CREATE PROCEDURE add_Application;
SHOW PROCEDURE STATUS WHERE Db = 'ngnf';
SELECT VERSION();
DROP PROCEDURE del_Application2;

SELECT @appid := 228;
SELECT * FROM Applications WHERE ApplicationId = @appid;
SELECT * FROM Org_model WHERE ApplicationId = @appid;
SELECT * FROM Con_model WHERE ApplicationId = @appid;
SELECT * FROM Gen_model WHERE ApplicationId = @appid;
SELECT * FROM Bac_model WHERE ApplicationId = @appid;
SELECT * FROM Fin_model WHERE ApplicationId = @appid;

