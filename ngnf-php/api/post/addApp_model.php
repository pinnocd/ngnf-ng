<?php
    require '../../config/database.php';

    $UserId  = $_REQUEST['UserId'] ?? '';

    $sql =  "CALL add_Application($UserId, @AppId)";
    
    $call = mysqli_prepare($con, $sql);
    
    $return = mysqli_stmt_execute($call);

    if($return) {
        // retrieve returned value and pass back to the calling script
        $select     = mysqli_query($con, 'SELECT @AppId');
        $result     = mysqli_fetch_assoc($select);
        $new_AppId  = $result['@AppId'];
        echo json_encode($new_AppId);
    } else {
        echo $sql,"\n";
        echo '***** Unable to create the application, please check logs and retry *****';
        echo json_encode("failure");
    };
?>
