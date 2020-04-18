<?php
    require '../../config/database.php';

    // Set up default sample data
    $ApplicationId  = $_REQUEST['ApplicationId'] ?? '';

    $Gen_models = [];
    $sql = "SELECT ApplicationId, GenName, GenStartDate, GenAchieve, GenProblem, GenVulnerables, GenSafeguards
            FROM Gen_model";
    if ($ApplicationId) {
      $sql .= " WHERE  ApplicationId = $ApplicationId";
    }
    
    if($result = mysqli_query($con, $sql))
    {
      $i = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $Gen_models[$i]['ApplicationId']    = $row['ApplicationId'];
        $Gen_models[$i]['GenName'] 		    = $row['GenName'];
        $Gen_models[$i]['GenStartDate'] 	    = $row['GenStartDate'];
        $Gen_models[$i]['GenAchieve'] 	= $row['GenAchieve'];
        $Gen_models[$i]['GenProblem'] 	= $row['GenProblem'];
        $Gen_models[$i]['GenVulnerables'] 	    = $row['GenVulnerables'];
        $Gen_models[$i]['GenSafeguards'] 		= $row['GenSafeguards'];

        $i++;
      }
    
      echo json_encode($Gen_models);
    }
    else
    {
      echo $sql,"\n";
      echo '***** Unable to retrieve the data, please check logs and retry *****';
      echo json_encode("failure");
    }
    ?>

