<?php
    require '../../config/database.php';

    // Set up default sample data
    $FundProviderCode  = $_REQUEST['FundProviderCode'] ?? '';
    $FundProviderName  = $_REQUEST['FundProviderName'] ?? '';

    $sql =  "INSERT INTO FundProviders (FundProviderCode, FundProviderName) VALUES ('$FundProviderCode', '$FundProviderName')";

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
