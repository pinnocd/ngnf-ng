<?php
    require '../../config/database.php';

    // Set up default sample data
    $ApplicationId  = $_REQUEST['ApplicationId'] ?? '';
    $UserId  = $_REQUEST['UserId'] ?? '';

    $Applications = [];
    $sql = "SELECT 		  app.ApplicationId, org.OrgName, gen.GenName, gen.GenStartDate, s.StatusName, app.UserId, u.name, app.InsertDateTime 
            FROM 		    Applications app
            LEFT JOIN	  Org_model org ON org.ApplicationId = app.ApplicationId
            LEFT JOIN 	Gen_model gen ON gen.ApplicationId = app.ApplicationId
            LEFT JOIN   Statuses  s   ON s.StatusCode  =  app.Status
            LEFT JOIN   Users u       ON u.id = app.UserId
            WHERE       1=1 ";
    if ($ApplicationId) {
            $sql .= " AND  app.ApplicationId = $ApplicationId";}
    if ($UserId) {
            $sql .= " AND  app.UserId = $UserId";}
  

    if($result = mysqli_query($con, $sql))
    {
      $i = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $Applications[$i]['ApplicationId']  = $row['ApplicationId'];
        $Applications[$i]['OrgName'] 		    = $row['OrgName'];
        $Applications[$i]['GenName'] 	      = $row['GenName'];
        $Applications[$i]['GenStartDate']   = $row['GenStartDate'];
        $Applications[$i]['Status'] 	      = $row['StatusName'];
        $Applications[$i]['UserId'] 	      = $row['UserId'];
        $Applications[$i]['User'] 	        = $row['name'];
        $Applications[$i]['InsertDateTime'] = $row['InsertDateTime'];
        
        $i++;
      }
    
      echo json_encode($Applications);
    }
    else
    {
      http_response_code(404);
    }
    ?>

