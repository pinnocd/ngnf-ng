<?php
    require '../../config/database.php';

    // Set up default sample data
    $UserId     = $_REQUEST['UserId'] ?? '';
    $UserType   = $_REQUEST['UserType'] ?? '';

    $sql =  "UPDATE Users SET usertype ='$UserType' WHERE id = $UserId";

    if(!mysqli_query($con, $sql))
    {
        echo $sql,"\n";
        echo '***** Unable to update the data, please check logs and retry *****';
        echo json_encode("failure");
    }
    else
    {
        echo json_encode("success");
    }
?>
