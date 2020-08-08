<?php
    require '../../config/database.php';

    $name       = $_REQUEST['name'] ?? '';
    $email      = $_REQUEST['email'] ?? '';
    $password   = $_REQUEST['password'] ?? '';
    $debug      = $_REQUEST['debug'];

    $sql = "INSERT INTO Users( name, password, email, usertype ) VALUES ('$name','$password','$email', 'C')";
    
    if (!mysqli_query($con, $sql)) {
        if ($debug){
            echo "Error: " . $sql . "\n\n" . mysqli_error($con);
            echo("\n\nErrorcode: " . $con -> errno);    

        } else {
            echo($con -> errno);

        }
    } else {
        echo json_encode($name);

    }
?>
