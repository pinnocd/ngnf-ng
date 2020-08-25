<?php
    require '../../config/database.php';

    // Set up default sample data
    $Categories = [];
    $sql = "SELECT CategoryCode, CategoryName FROM Categories ";
            
    if($result = mysqli_query($con, $sql))
    {
      $i = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $Users[$i]['CategoryCode'] = $row['CategoryCode'];
        $Users[$i]['CategoryName'] = $row['CategoryName'];

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

