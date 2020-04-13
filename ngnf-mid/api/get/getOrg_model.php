<?php
    require '../../config/database.php';

    // Set up default sample data
    $ApplicationId  = $_REQUEST['ApplicationId'] ?? '';

    $Org_models = [];
    $sql = "SELECT o.ApplicationId, o.OrgName, o.OrgAddress, o.OrgPostcode, o.OrgEmail, o.OrgWebsite, o.OrgType,
                    o.OrgCharity, o.OrgCharityNo, o.OrgStartDate, o.OrgOpen, o.OrgInfo, t.OrgTypeName 
            FROM   Org_model o
            LEFT JOIN  OrgTypes t ON t.OrgType = o.OrgType";
    if ($ApplicationId) {
      $sql .= " WHERE  ApplicationId = $ApplicationId";
    }
    
    if($result = mysqli_query($con, $sql))
    {
      $i = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $Org_models[$i]['ApplicationId'] = $row['ApplicationId'];
        $Org_models[$i]['OrgName'] 		   = $row['OrgName'];
        $Org_models[$i]['OrgAddress'] 	 = $row['OrgAddress'];
        $Org_models[$i]['OrgPostcode'] 	 = $row['OrgPostcode'];
        $Org_models[$i]['OrgEmail'] 		 = $row['OrgEmail'];
        $Org_models[$i]['OrgWebsite'] 	 = $row['OrgWebsite'];
        $Org_models[$i]['OrgType'] 		   = $row['OrgType'];
        $Org_models[$i]['OrgTypeName']   = $row['OrgTypeName'];
        $Org_models[$i]['OrgCharity'] 	 = $row['OrgCharity'];
        $Org_models[$i]['OrgCharityNo']  = $row['OrgCharityNo'];
        $Org_models[$i]['OrgStartDate']  = $row['OrgStartDate'];
        $Org_models[$i]['OrgOpen'] 		   = $row['OrgOpen'];
        $Org_models[$i]['OrgInfo'] 		   = $row['OrgInfo'];
        $i++;
      }
    
      echo json_encode($Org_models);
    }
    else
    {
      http_response_code(404);
    }
    ?>

