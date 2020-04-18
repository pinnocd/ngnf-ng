<?php
    require '../../config/database.php';

    // Set up default sample data
    $ApplicationId  = $_REQUEST['ApplicationId'] ?? '';

    $Fin_models = [];
    $sql = "SELECT ApplicationId, FinOrgName, FinBank, FinAccount, FinSortCode, FinBankOrgAddress, FinActivity, FinCost
            FROM Fin_model";
    if ($ApplicationId) {
      $sql .= " WHERE  ApplicationId = $ApplicationId";
    }
    
    if($result = mysqli_query($con, $sql))
    {
      $i = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $Fin_models[$i]['ApplicationId']        = $row['ApplicationId'];
        $Fin_models[$i]['FinOrgName'] 		      = $row['FinOrgName'];
        $Fin_models[$i]['FinBank'] 	            = $row['FinBank'];
        $Fin_models[$i]['FinAccount'] 	        = $row['FinAccount'];
        $Fin_models[$i]['FinSortCode'] 	        = $row['FinSortCode'];
        $Fin_models[$i]['FinBankOrgAddress'] 	  = $row['FinBankOrgAddress'];
        $Fin_models[$i]['FinActivity'] 	        = $row['FinActivity'];
        $Fin_models[$i]['FinCost'] 	            = $row['FinCost'];

        $i++;
      }
    
      echo json_encode($Fin_models);
    }
    else
    {
      echo $sql,"\n";
      echo '***** Unable to retrieve the data, please check logs and retry *****';
      echo json_encode("failure");
    }
    ?>

