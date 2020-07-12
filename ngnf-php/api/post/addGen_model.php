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
  
    $sql =  "INSERT INTO Gen_model (ApplicationId, GenName, GenStartDate, GenAchieve, GenProblem, GenVulnerables, GenSafeguards, GenNotes, InsertBy)
            VALUES ( $ApplicationId, '$Gen_name', '$Gen_startdate', '$Gen_achieve', '$Gen_problem', $Gen_vulnerables, $Gen_safeguards, '$Gen_notes', USER())";

    if(!mysqli_query($con, $sql))
    {
        echo $sql;
        echo "\n\n";
        echo '***** Unable to insert the data, please check logs and retry *****';
    }
    else
    {
        echo json_encode("success");        
    }

?>
