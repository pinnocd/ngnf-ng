<?php
    require '../../config/database.php';

    // Set up default sample data
    $ApplicationId      = $_REQUEST['ApplicationId'] ?? '';
    $Gen_name 		    = $_REQUEST['Genname'] ?? '';
    $Gen_startdate	    = $_REQUEST['Genstartdate'] ?? '';
    $Gen_achieve 	    = $_REQUEST['Genachieve'] ?? '';
    $Gen_problem        = $_REQUEST['Genproblem'] ?? '';
    $Gen_vulnerables    = $_REQUEST['Genvulnerables'] ?? '';
    $Gen_safeguards	    = $_REQUEST['Gensafeguards'] ?? '';
    $UserId             = $_REQUEST['UserId'] ?? '';

    echo 
        'ApplicationId = ', $ApplicationId, '
        Gen_name = ', $Gen_name, '
        Gen_startdate = ', $Gen_startdate, '
        Gen_achieve = ', $Gen_achieve, '
        Gen_problem = ', $Gen_problem, '
        Gen_vulnerables = ', $Gen_vulnerables, '
        Gen_safeguards = ', $Gen_safeguards, '
        ';
    echo "\n\n";
  
    $sql =  "UPDATE Gen_model SET 
                GenName =' $Gen_name', 
                GenStartDate = '$Gen_startdate', 
                GenAchieve = '$Gen_achieve', 
                GenProblem = '$Gen_problem', 
                GenVulnerables = $Gen_vulnerables,
                GenSafeguards = $Gen_safeguards,
                UpdateDateTime = NOW(), 
                UpdateBy='$UserId'
            WHERE ApplicationId = $ApplicationId";

    echo $sql;
    echo "\n\n";

    if(!mysqli_query($con, $sql))
    {
        echo '***** Unable to insert the data, please check logs and retry *****';
    }
    else
    {
        echo json_encode($ApplicationId);
    }

?>
