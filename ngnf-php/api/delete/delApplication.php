<?php
    require '../../config/database.php';

    // Set up default sample data
    $ApplicationId  = $_REQUEST['ApplicationId'] ?? '';

    echo  'ApplicationId = ', $ApplicationId;

    //try {
        $sql =  "\n\nCALL del_Application($ApplicationId)";
        echo $sql;

        $call = mysqli_prepare($con, $sql);
        mysqli_stmt_execute($call);

        // retrieve returned value
        return true;
?>
