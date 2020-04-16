<?php
    require '../../config/database.php';

    // Set up default sample data
    $ApplicationId  = $_REQUEST['ApplicationId'] ?? '';
    $Status         = $_REQUEST['Status'] ?? '';
    $UserId         = $_REQUEST['UserId'] ?? '';

    echo 
        "ApplicationId = ", $ApplicationId, 
        "\nStatus = ", $Status, "\n",
        "UserId = ", $UserId, "\n";

    $sql =  "UPDATE Applications SET Status ='$Status', UpdateDateTime=NOW() , UpdateBy='$UserId' 
            WHERE ApplicationId = $ApplicationId";

    echo $sql,"\n";

    if(!mysqli_query($con, $sql))
    {
    echo '***** Unable to update the data, please check logs and retry *****';
    }
    else
    {
    echo '***** Data Successfully updated *****';
    }

?>
