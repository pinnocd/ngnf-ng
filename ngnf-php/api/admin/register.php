<?php
    require '../../config/database.php';

    $name       = $_REQUEST['name'] ?? '';
    $email      = $_REQUEST['email'] ?? '';
    $password   = $_REQUEST['password'] ?? '';

    $sql = "INSERT INTO Users( name, password, email, usertype ) VALUES ('$name','$password','$email', 'P')";

    if(!mysqli_query($con, $sql))
    {
        echo $sql,"\n";
        echo '***** Unable to insert the data, please check logs and retry *****';
        echo json_encode("failure");
    }
    else
    {
        echo json_encode($name);
    }
?>
