<?php
    require '../../config/database.php';

    // Set up default sample data
    $ApplicationId  = $_REQUEST['ApplicationId'] ?? '';
    $debug          = $_REQUEST['degug'] ?? '';

    $sql =  "\n\nCALL del_Application($ApplicationId)";

    if ($debug) {
        echo  'ApplicationId = ', $ApplicationId;
        echo $sql;
    }
    $call = mysqli_prepare($con, $sql);

    $return = mysqli_stmt_execute($call);

    if($return){
        echo json_encode(1);

    } else {
        echo $sql,"\n";
        echo '***** Unable to call the procedure, please check logs and retry *****';
        echo json_encode("failure");

    };

?>

