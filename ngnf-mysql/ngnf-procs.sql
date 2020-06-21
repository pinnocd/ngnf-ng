USE ngnf;

DROP PROCEDURE IF EXISTS `add_Application`;
DROP PROCEDURE IF EXISTS `del_Application`;
DROP PROCEDURE IF EXISTS `add_AssignedApp`;

DELIMITER //
CREATE PROCEDURE add_AssignedApp(
	IN  	iUserId			INT,
	IN		iApplicationId	INT,
	IN		iProposalWriter	INT,
	IN 		iFundProvider	VARCHAR(5),
	OUT		oApplicationId 	INT)
BEGIN
	INSERT INTO Applications (Status, UserId, InsertBy, ProposalWriter, SeniorApprover, FundProviderCode, OrigApplicationId)
	SELECT  'A', iUserId, iUserId, iProposalWriter, iUserId, iFundProvider, iApplicationId
	FROM	Applications
	WHERE 	ApplicationId = iApplicationId;

	SELECT LAST_INSERT_ID() INTO oApplicationId;

	UPDATE 	Applications
	SET 	Status = 'A', UpdateBy = iUserid
	WHERE 	ApplicationId = iApplicationId;
    
  	INSERT INTO Org_model (ApplicationId, OrgName, OrgAddress, OrgPostcode, OrgEmail, OrgWebsite, OrgType,
							OrgCharity, OrgCharityNo, OrgStartDate, OrgOpen, OrgInfo, InsertBy)
	SELECT  oApplicationId, OrgName, OrgAddress, OrgPostcode, OrgEmail, OrgWebsite, OrgType,
			OrgCharity, OrgCharityNo, OrgStartDate, OrgOpen, OrgInfo, iUserid 
	FROM 	Org_model
	WHERE 	ApplicationId = iApplicationId;

 	INSERT INTO Con_model (ApplicationId, ConName, ConDOB, ConAddress, ConPreAddress, ConLandlineNo, ConOtherNo, ConEmail,
				ConSenName, ConSenDOB, ConSenAddress, ConSenPreAddress, ConSenLandlineNo, ConSenOtherNo, ConSenEmail, InsertBy)
	SELECT  oApplicationId, ConName, ConDOB, ConAddress, ConPreAddress, ConLandlineNo, ConOtherNo, ConEmail,
				ConSenName, ConSenDOB, ConSenAddress, ConSenPreAddress, ConSenLandlineNo, ConSenOtherNo, ConSenEmail, iUserId
    FROM    Con_model
	WHERE 	ApplicationId = iApplicationId;

 	INSERT INTO Gen_model (ApplicationId, GenName, GenStartDate, GenAchieve, GenProblem, GenVulnerables, GenSafeguards, InsertBy)
 	SELECT  oApplicationId, GenName, GenStartDate, GenAchieve, GenProblem, GenVulnerables, GenSafeguards, iUserId
    FROM	Gen_model
	WHERE 	ApplicationId = iApplicationId;


	INSERT INTO Bac_model (ApplicationId, BacNeed, BacTarget, BacActivities, BacDeliver, BacUsers, InsertBy)
	SELECT 	oApplicationId, BacNeed, BacTarget, BacActivities, BacDeliver, BacUsers, iUserId
	FROM  	Bac_model 
	WHERE 	ApplicationId = iApplicationId;
    
 	INSERT INTO Fin_model (ApplicationId, FinActivity, FinCost, InsertBy)    
	SELECT 	oApplicationId, FinActivity, FinCost, iUserId
    FROM 	Fin_model
	WHERE 	ApplicationId = iApplicationId;
END
;
CREATE PROCEDURE add_Application(
	IN  	UserId			INT,
	OUT		ApplicationId 	INT)
BEGIN
	INSERT INTO Applications (Status, UserId, InsertBy) VALUES ( 'N', UserId, USER() );
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
