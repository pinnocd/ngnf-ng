<?php
    require '../../config/database.php';

    // Set up default sample data
    $Statuses = [];
    $sql = "SELECT StatusCode, StatusName FROM Statuses ";
            
    if($result = mysqli_query($con, $sql))
    {
      $i = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $Users[$i]['StatusCode'] = $row['StatusCode'];
        $Users[$i]['StatusName'] = $row['StatusName'];

        $i++;
      }
    
      echo json_encode($Users);
    }
    else
    {
      echo $sql,"\n";
      echo '***** Unable to retrieve the data, please check logs and retry *****';
      echo json_encode("failure");
    }

?>

