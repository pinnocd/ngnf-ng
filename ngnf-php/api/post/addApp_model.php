<?php
    require '../../config/database.php';

    $UserId  = $_REQUEST['UserId'] ?? '';

    $sql =  "CALL add_Application($UserId, @AppId)";
    
    $call = mysqli_prepare($con, $sql);
    mysqli_stmt_execute($call);

    // retrieve returned value and pass back to the calling script
    $select     = mysqli_query($con, 'SELECT @AppId');
    $result     = mysqli_fetch_assoc($select);
    $new_AppId  = $result['@AppId'];

    echo $new_AppId;

    return $new_AppId;
?>
