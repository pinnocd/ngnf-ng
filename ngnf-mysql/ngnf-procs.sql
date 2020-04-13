USE ngnf;

DROP PROCEDURE IF EXISTS `add_Application`;
DROP PROCEDURE IF EXISTS `del_Application`;

DELIMITER //
CREATE PROCEDURE add_Application(
	IN  	UserId			INT,
	OUT		ApplicationId 	INT)
BEGIN
	INSERT INTO Applications (Status, UserId) VALUES ( 'N', UserId );
	SELECT LAST_INSERT_ID() INTO ApplicationId;
END
;

CREATE PROCEDURE del_Application(
 	IN		AppId 	INT)
BEGIN
 	DELETE FROM Org_model WHERE ApplicationId = AppId;
 	DELETE FROM Con_model WHERE ApplicationId = AppId;
 	DELETE FROM Gen_model WHERE ApplicationId = AppId;
 	DELETE FROM Bac_model WHERE ApplicationId = AppId;
 	DELETE FROM Fin_model WHERE ApplicationId = AppId;
 	DELETE FROM Applications WHERE ApplicationId = AppId;
END
;
//
DELIMITER ;

