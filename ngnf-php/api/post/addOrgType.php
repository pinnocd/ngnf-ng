<?php
    require '../../config/database.php';

    // Set up default sample data
    $OrgTypeCode  = $_REQUEST['OrgTypeCode'] ?? '';
    $OrgTypeName  = $_REQUEST['OrgTypeName'] ?? '';

    $sql =  "INSERT INTO OrgTypes (OrgType, OrgTypeName) VALUES ('$OrgTypeCode', '$OrgTypeName')";

    if(!mysqli_query($con, $sql))
    {
        echo $sql;
        echo "\n\n";
        echo '***** Unable to insert the data, please check logs and retry *****';
    }
    else
    {
        if ($debug) {
            echo '***** Data Successfully inserted *****';
        }
        echo json_encode("success");        
    }

?>
