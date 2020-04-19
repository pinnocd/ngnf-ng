<?php
    require '../../config/database.php';

    $email  = $_REQUEST['email'] ?? '';

    $sql = "SELECT id, name, password, email, usertype FROM Users where email='$email'";

    if(!$result = mysqli_query($con, $sql))
    {
        echo $sql,"\n";
        echo '***** Unable to retrieve login data, please check logs and retry *****';
        echo json_encode("failure");
    }
    else
    {
        $rows = array();
        while($row = mysqli_fetch_assoc($result))
        {
        $rows[] = $row;
        }
        echo json_encode($rows);
    }
?>
