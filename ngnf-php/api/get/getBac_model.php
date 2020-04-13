<?php
    require '../../config/database.php';

    // Set up default sample data
    $ApplicationId  = $_REQUEST['ApplicationId'] ?? '';

    $Bac_models = [];
    $sql = "SELECT  ApplicationId, BacNeed, BacTarget, BacActivities, BacDeliver, BacUsers
            FROM    Bac_model";
    if ($ApplicationId) {
      $sql .= " WHERE  ApplicationId = $ApplicationId";
    }
    
    if($result = mysqli_query($con, $sql))
    {
      $i = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $Bac_models[$i]['ApplicationId']  = $row['ApplicationId'];
        $Bac_models[$i]['BacNeed'] 		    = $row['BacNeed'];
        $Bac_models[$i]['BacTarget'] 	    = $row['BacTarget'];
        $Bac_models[$i]['BacActivities'] 	= $row['BacActivities'];
        $Bac_models[$i]['BacDeliver'] 	  = $row['BacDeliver'];
        $Bac_models[$i]['BacUsers'] 	    = $row['BacUsers'];

        $i++;
      }
    
      echo json_encode($Bac_models);
    }
    else
    {
      http_response_code(404);
    }
    ?>
