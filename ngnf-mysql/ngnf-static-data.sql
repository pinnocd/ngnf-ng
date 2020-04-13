USE ngnf;

INSERT INTO OrgTypes (OrgType, OrgName)
VALUES  ('C', 'Charity'),
		('V', 'Voluntary or Community'),
		('S', 'School'),
		('H', 'Health Body'),
		('P', 'Parish or Town Council')
;		

INSERT INTO Statuses (StatusCode, StatusName)
Values	('N', 'New'),
		('S', 'Submitted'),
		('U', 'Under Review'),
		('A', 'Accepted'),
		('R', 'Rejected'),
		('I', 'In Progress'),
		('C', 'Successful'),
		('F', 'Failed')
;
