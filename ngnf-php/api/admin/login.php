<?php
    require '../../config/database.php';

    $email  = $_REQUEST['email'] ?? '';
    $pwd    = $_REQUEST['pwd'] ?? '';

    $sql = "SELECT id, name, password, email, usertype FROM Users where email='$email' and password='$pwd'";

    if(!$result = mysqli_query($con, $sql))
    {
        echo '***** Unable to retrieve login data, please check logs and retry *****';
        http_response_code(404);
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
