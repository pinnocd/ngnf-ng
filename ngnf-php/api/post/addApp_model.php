<?php
    require '../../config/database.php';

    $UserId  = $_REQUEST['UserId'] ?? '';

    //try {
        $sql =  "CALL add_App($UserId, @AppId)";
        
        $call = mysqli_prepare($con, $sql);
        mysqli_stmt_execute($call);

        // retrieve returned value
        $select     = mysqli_query($con, 'SELECT @AppId');
        $result     = mysqli_fetch_assoc($select);
        $new_AppId  = $result['@AppId'];

        echo $new_AppId;

        return $new_AppId;
?>
