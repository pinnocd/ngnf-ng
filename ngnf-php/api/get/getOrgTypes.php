<?php
    require '../../config/database.php';

    // Set up default sample data
    $OrgTypes = [];
    $sql = "SELECT OrgType, OrgTypeName
            FROM   OrgTypes ";

    if($result = mysqli_query($con, $sql))
    {
      $i = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $OrgTypes[$i]['OrgType']  = $row['OrgType'];
        $OrgTypes[$i]['OrgTypeName']  = $row['OrgTypeName'];
        $i++;
      }
    
      echo json_encode($OrgTypes);
    }
    else
    {
      echo $sql,"\n";
      echo '***** Unable to retrieve the data, please check logs and retry *****';
      echo json_encode("failure");
    }

?>

