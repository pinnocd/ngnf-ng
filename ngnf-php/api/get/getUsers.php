<?php
    require '../../config/database.php';

    $PWriter = $_REQUEST['PWriter'] ?? '';

    // Set up default sample data
    $Users = [];
    $sql = "SELECT id, name, email, CASE usertype 
                                        WHEN 'C' THEN 'Client'
                                        WHEN 'P' THEN 'Proposal Writer'
                                        WHEN 'A' THEN 'Admin'
                                        ELSE usertype
                                    END as usertype
            FROM    Users ";
            
            if ($PWriter) {
                    $sql .= " WHERE  usertype IN ('P', 'A')";}
        

    if($result = mysqli_query($con, $sql))
    {
      $i = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $Users[$i]['id']      = $row['id'];
        $Users[$i]['name']    = $row['name'];
        $Users[$i]['email']   = $row['email'];
        $Users[$i]['usertype']= $row['usertype'];

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

