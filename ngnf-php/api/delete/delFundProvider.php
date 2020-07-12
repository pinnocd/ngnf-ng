<?php
    require '../../config/database.php';

    // Set up default sample data
    $FundProviderCode  = $_REQUEST['FundProviderCode'] ?? '';

    $sql =  "DELETE FROM FundProviders WHERE FundProviderCode = '$FundProviderCode'";
    
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
