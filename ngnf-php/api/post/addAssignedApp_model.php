<?php
    require '../../config/database.php';

    $UserId         = $_REQUEST['UserId'] ?? '';
    $ApplicationId  = $_REQUEST['ApplicationId'] ?? '';
    $ProposalWriter = $_REQUEST['ProposalWriter'] ?? '';
    $FundProvider   = $_REQUEST['FundProvider'] ?? '';

    $sql =  "CALL add_AssignedApp($UserId, $ApplicationId, $ProposalWriter, '$FundProvider', @NewAppId)";
    
    $call = mysqli_prepare($con, $sql);
    
    $return = mysqli_stmt_execute($call);

    if($return) {
        // retrieve returned value and pass back to the calling script
        $select     = mysqli_query($con, 'SELECT @NewAppId');
        $result     = mysqli_fetch_assoc($select);
        $new_AppId  = $result['@NewAppId'];
        echo json_encode($new_AppId);
    } else {
        echo $sql,"\n";
        echo '***** Unable to create the application, please check logs and retry *****';
        echo json_encode("failure");
    };
?>
