<?php
    require '../../config/database.php';

    // Set up default sample data
    $ApplicationId  = $_REQUEST['ApplicationId'] ?? '';
    $Status         = $_REQUEST['Status'] ?? '';

    echo 
        "ApplicationId = ", $ApplicationId, 
        "\nStatus = ", $Status, "\n";

    $sql =  "UPDATE Applications SET Status ='$Status' WHERE ApplicationId = $ApplicationId";

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
