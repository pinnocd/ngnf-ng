USE ngnf;

/* Dynamic Tables */
DROP TABLE IF EXISTS Applications;
CREATE TABLE Applications (
	ApplicationId		INT 			PRIMARY KEY		AUTO_INCREMENT,
	OrigApplicationId	INT,
    Status				VARCHAR(1),
	InsertDateTime		TIMESTAMP		DEFAULT CURRENT_TIMESTAMP,
	UpdateDateTime		TIMESTAMP		NULL ON UPDATE CURRENT_TIMESTAMP,
    UserId				INT,
	ProposalWriter		INT,
	SeniorApprover		INT,
	FundProviderCode 	VARCHAR(5),
	InsertBy			VARCHAR(70),
	UpdateBy			VARCHAR(70)
	)
;

DROP TABLE IF EXISTS Org_model;
CREATE TABLE Org_model (
	ApplicationId		INT 			PRIMARY KEY,
	OrgName				VARCHAR(70),
	OrgAddress			VARCHAR(200),
	OrgPostcode			VARCHAR(10),
	OrgEmail			VARCHAR(30),
	OrgWebsite			VARCHAR(50),
	OrgType				VARCHAR(1),
	OrgCharity			BOOLEAN,
	OrgCharityNo		INT(8),
	OrgStartDate		DATE,
	OrgOpen				BOOLEAN,
	OrgInfo				VARCHAR(1000),
	InsertDateTime		TIMESTAMP		DEFAULT CURRENT_TIMESTAMP,
	UpdateDateTime		TIMESTAMP		NULL ON UPDATE CURRENT_TIMESTAMP,
	InsertBy			VARCHAR(70),
	UpdateBy			VARCHAR(70)
	)
;

DROP TABLE IF EXISTS Con_model;
CREATE TABLE Con_model (
	ApplicationId		INT				PRIMARY KEY,
	ConName				VARCHAR(50),
	ConDOB				DATE,
	ConAddress			VARCHAR(200),
	ConPreAddress		VARCHAR(200),
	ConLandlineNo		VARCHAR(15),
	ConOtherNo			VARCHAR(15),
	ConEmail			VARCHAR(30),
	ConSenName			VARCHAR(50),
	ConSenDOB			DATE,
	ConSenAddress		VARCHAR(200),
	ConSenPreAddress 	VARCHAR(200),
	ConSenLandlineNo 	VARCHAR(15),
	ConSenOtherNo		VARCHAR(15),
	ConSenEmail			VARCHAR(30),
	InsertDateTime		TIMESTAMP		DEFAULT CURRENT_TIMESTAMP,
	UpdateDateTime		TIMESTAMP		NULL ON UPDATE CURRENT_TIMESTAMP,
	InsertBy			VARCHAR(70),
	UpdateBy			VARCHAR(70)
	)
;

DROP TABLE IF EXISTS Gen_model;
CREATE TABLE Gen_model (
	ApplicationId		INT 			PRIMARY KEY,
	GenName				VARCHAR(10),
	GenStartDate		DATE,
	GenAchieve			VARCHAR(3000),
	GenProblem			VARCHAR(3000),
	GenVulnerables		BOOLEAN,
	GenSafeguards		BOOLEAN,
	InsertDateTime		TIMESTAMP		DEFAULT CURRENT_TIMESTAMP,
	UpdateDateTime		TIMESTAMP		NULL ON UPDATE CURRENT_TIMESTAMP,
	InsertBy			VARCHAR(70),
	UpdateBy			VARCHAR(70)
	)
;

DROP TABLE IF EXISTS Bac_model;
CREATE TABLE Bac_model (
	ApplicationId		INT 			PRIMARY KEY,
	BacNeed				VARCHAR(2000),
	BacTarget			VARCHAR(2000),
	BacActivities		VARCHAR(2000),
	BacDeliver			VARCHAR(2000),
	BacUsers			VARCHAR(2000),
	InsertDateTime		TIMESTAMP		DEFAULT CURRENT_TIMESTAMP,
	UpdateDateTime		TIMESTAMP		NULL ON UPDATE CURRENT_TIMESTAMP,
	InsertBy			VARCHAR(70),
	UpdateBy			VARCHAR(70)
	)
;
    
DROP TABLE IF EXISTS Fin_model;
CREATE TABLE Fin_model (
	ApplicationId		INT 			PRIMARY KEY,
	FinOrgName			VARCHAR(100),
	FinBank				VARCHAR(100),
	FinAccount			INT(8),
	FinSortCode			VARCHAR(8),
	FinBankOrgAddress	VARCHAR(500),
    FinActivity 		VARCHAR(100), 
	FinCost     		DECIMAL(10,2),
    InsertDateTime		TIMESTAMP		DEFAULT CURRENT_TIMESTAMP,
	UpdateDateTime		TIMESTAMP		NULL ON UPDATE CURRENT_TIMESTAMP,
	InsertBy			VARCHAR(70),
	UpdateBy			VARCHAR(70)
	)
;

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
	id			INT 		PRIMARY KEY		AUTO_INCREMENT,
    name		VARCHAR(20),
    email		VARCHAR(30),
    password	VARCHAR(64),
    usertype	VARCHAR(1),
    UNIQUE KEY unique_email (email)
	)
;


/* Static Data Tables */
DROP TABLE IF EXISTS OrgTypes;
CREATE TABLE OrgTypes (
    OrgType 		VARCHAR(1) 		PRIMARY KEY,
    OrgTypeName 	VARCHAR(30)
	)
;

DROP TABLE IF EXISTS Statuses;
CREATE TABLE Statuses (
    StatusCode VARCHAR(1) PRIMARY KEY,
    StatusName VARCHAR(15)
	)
;

DROP TABLE IF EXISTS FundProviders;
CREATE TABLE FundProviders (
    FundProviderCode VARCHAR(5) PRIMARY KEY,
    FundProviderName VARCHAR(20)
	)
;
