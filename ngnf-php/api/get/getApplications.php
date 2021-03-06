<?php
    require '../../config/database.php';

    // Set up default sample data
    $ApplicationId  = $_REQUEST['ApplicationId'] ?? '';
    $UserId         = $_REQUEST['UserId'] ?? '';
    $PWriter        = $_REQUEST['PWriter'] ?? '';
    $Original       = $_REQUEST['Original'] ?? '';

    $Applications = [];
    $sql = "SELECT      app.ApplicationId,
                        concat(left(org.OrgName, 30), if(length(org.OrgName) < 30, '', '...')) AS OrgName,
                        concat(left(gen.GenName, 30), if(length(gen.GenName) < 30, '', '...')) AS GenName,
                        gen.GenStartDate, s.StatusName, app.OrigApplicationId,
                        app.UserId, u.name AS username, pw.name AS proposalwriter, sa.name AS seniorapprover,
                        concat(p.FundProviderCode, ' - ', left(p.FundProviderName, 25), if(length(p.FundProviderName) < 25, '', '...')) AS FundProviderName, 
                        orgt.OrgTypeName AS OrgType,
                        DATE(app.InsertDateTime) AS InsertDateTime, app.UpdateDateTime, app.InsertBy, app.UpdateBy
            FROM        Applications app
            LEFT JOIN   Org_model org   ON org.ApplicationId = app.ApplicationId
            LEFT JOIN   OrgTypes  orgt  ON orgt.OrgType = org.OrgType
            LEFT JOIN 	Gen_model gen   ON gen.ApplicationId = app.ApplicationId
            LEFT JOIN   Statuses  s     ON s.StatusCode  =  app.Status
            LEFT JOIN   FundProviders p ON p.FundProviderCode = app.FundProviderCode
            LEFT JOIN   Users u         ON u.id = app.UserId
            LEFT JOIN   Users pw        ON pw.id = app.ProposalWriter
            LEFT JOIN   Users sa        ON sa.id = app.SeniorApprover
            WHERE       1=1 ";
    if ($ApplicationId) {
            $sql .= " AND  app.ApplicationId = $ApplicationId";}
    if ($UserId) {
            $sql .= " AND  app.UserId = $UserId";}
    if ($Original==='Yes') {
        $sql .= " AND  app.OrigApplicationId IS NULL";}
    if ($Original==='No') {
        $sql .= " AND  app.OrigApplicationId IS NOT NULL";}


    if($result = mysqli_query($con, $sql))
    {
      $i = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $Applications[$i]['ApplicationId']     = $row['ApplicationId'];
        $Applications[$i]['OrigApplicationId'] = $row['OrigApplicationId'];
        $Applications[$i]['OrgName']           = $row['OrgName'];
        $Applications[$i]['GenName'] 	       = $row['GenName'];
        $Applications[$i]['GenStartDate']      = $row['GenStartDate'];
        $Applications[$i]['Status'] 	       = $row['StatusName'];
        $Applications[$i]['UserId'] 	       = $row['UserId'];
        $Applications[$i]['User'] 	       = $row['username'];
        $Applications[$i]['ProposalWriter']    = $row['proposalwriter'];
        $Applications[$i]['SeniorApprover']    = $row['seniorapprover'];
        $Applications[$i]['FundProvider']      = $row['FundProviderName'];
        $Applications[$i]['OrgType']           = $row['OrgType'];
        $Applications[$i]['InsertDateTime']    = $row['InsertDateTime'];
        $Applications[$i]['UpdateDateTime']    = $row['UpdateDateTime'];
        $Applications[$i]['InsertBy']          = $row['InsertBy'];
        $Applications[$i]['UpdateBy']          = $row['UpdateBy'];

        $i++;
      }
    
      echo json_encode($Applications);
    }
    else
    {
      echo $sql,"\n";
      echo '***** Unable to retrieve the data, please check logs and retry *****';
      echo json_encode("failure");
    }

?>

