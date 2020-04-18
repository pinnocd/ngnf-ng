<?php
    require '../../config/database.php';

    // Set up default sample data
    $ApplicationId  = $_REQUEST['ApplicationId'] ?? '';
    $Bac_need 		= $_REQUEST['Bacneed'] ?? '';
    $Bac_target	    = $_REQUEST['Bactarget'] ?? '';
    $Bac_activities = $_REQUEST['Bacactivities'] ?? '';
    $Bac_deliver    = $_REQUEST['Bacdeliver'] ?? '';
    $Bac_users      = $_REQUEST['Bacusers'] ?? '';
    $UserId         = $_REQUEST['UserId'] ?? '';
    $debug          = $_REQUEST['debug'];

    if ($debug){
        echo 'ApplicationId = ', $ApplicationId, '
            Bac_need = ', $Bac_need, '
            Bac_target = ', $Bac_target, '
            Bac_activities = ', $Bac_activities, '
            Bac_deliver = ', $Bac_deliver, '
            Bac_users = ', $Bac_users, '
            ';
        echo "\n\n";
    }
  
    $sql =  "UPDATE Bac_model SET 
                BacNeed ='$Bac_need', 
                BacTarget ='$Bac_target', 
                BacActivities ='$Bac_activities', 
                BacDeliver ='$Bac_deliver', 
                BacUsers ='$Bac_users', 
                UpdateDateTime = NOW(), 
                UpdateBy='$UserId'
            WHERE ApplicationId = $ApplicationId";

    if(!mysqli_query($con, $sql))
    {
        echo $sql;
        echo "\n";
        echo '***** Unable to insert the data, please check logs and retry *****';
    }
    else
    {
        echo json_encode("success");        
    }

?>
