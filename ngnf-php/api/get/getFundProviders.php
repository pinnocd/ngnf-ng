<?php
    require '../../config/database.php';

    // Set up default sample data
    $FundProviders = [];
    $sql = "SELECT FundProviderCode, FundProviderName
            FROM   FundProviders ";

    if($result = mysqli_query($con, $sql))
    {
      $i = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $FundProviders[$i]['FundProviderCode']  = $row['FundProviderCode'];
        $FundProviders[$i]['FundProviderName']  = $row['FundProviderName'];
        $i++;
      }
    
      echo json_encode($FundProviders);
    }
    else
    {
      echo $sql,"\n";
      echo '***** Unable to retrieve the data, please check logs and retry *****';
      echo json_encode("failure");
    }

?>

