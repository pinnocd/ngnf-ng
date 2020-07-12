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
    $Gen_notes	        = $_REQUEST['Gennotes'] ?? '';
    $UserId             = $_REQUEST['UserId'] ?? '';
    $debug              = $_REQUEST['debug'];

    if ($debug){
        echo 
            'ApplicationId = ', $ApplicationId, '
            Gen_name = ', $Gen_name, '
            Gen_startdate = ', $Gen_startdate, '
            Gen_achieve = ', $Gen_achieve, '
            Gen_problem = ', $Gen_problem, '
            Gen_vulnerables = ', $Gen_vulnerables, '
            Gen_safeguards = ', $Gen_safeguards, '
            Gen_notes = ', $Gen_notes, '
            ';
        echo "\n\n";
    }
  
    $sql =  "UPDATE Gen_model SET 
                GenName =' $Gen_name', 
                GenStartDate = '$Gen_startdate', 
                GenAchieve = '$Gen_achieve', 
                GenProblem = '$Gen_problem', 
                GenVulnerables = $Gen_vulnerables,
                GenSafeguards = $Gen_safeguards,
                GenNotes = '$Gen_notes',
                UpdateDateTime = NOW(), 
                UpdateBy='$UserId'
            WHERE ApplicationId = $ApplicationId";

    if(!mysqli_query($con, $sql))
    {
        echo $sql;
        echo "\n\n";
        echo '***** Unable to insert the data, please check logs and retry *****';
    }
    else
    {
        echo json_encode("successS");
    }

?>
