<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

define('DB_HOST', 'ngnf-mysql.cp842gttjsxj.eu-west-2.rds.amazonaws.com');
define('DB_USER', 'dbuser');
define('DB_PASS', 'Gone5w4zfrQhMPoVZ5Dv');
define('DB_NAME', 'ngnf');
define('DB_PORT', '3306');

function connect()
{
  $connect = mysqli_connect(DB_HOST ,DB_USER ,DB_PASS ,DB_NAME, DB_PORT);

  if (mysqli_connect_errno($connect)) {
    die("Failed to connect:" . mysqli_connect_error());
  }

  mysqli_set_charset($connect, "utf8");

  return $connect;
}

$con = connect();
?>


