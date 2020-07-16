<?php
    require '../../config/database.php';

    // Set up default sample data
    $OrgTypeCode  = $_REQUEST['OrgTypeCode'] ?? '';

    $sql =  "DELETE FROM OrgTypes WHERE OrgType = '$OrgTypeCode'";
    
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
