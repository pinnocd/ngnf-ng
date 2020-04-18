<?php
    require '../../config/database.php';

    // Set up default sample data
    $ApplicationId  = $_REQUEST['ApplicationId'] ?? '';
    $Bac_need 		= $_REQUEST['Bacneed'] ?? '';
    $Bac_target	    = $_REQUEST['Bactarget'] ?? '';
    $Bac_activities = $_REQUEST['Bacactivities'] ?? '';
    $Bac_deliver    = $_REQUEST['Bacdeliver'] ?? '';
    $Bac_users      = $_REQUEST['Bacusers'] ?? '';
    $debug          = $_REQUEST['debug'];

    if ($debug){

        echo
       'ApplicationId = ', $ApplicationId, '
        Bac_need = ', $Bac_need, '
        Bac_target = ', $Bac_target, '
        Bac_activities = ', $Bac_activities, '
        Bac_deliver = ', $Bac_deliver, '
        Bac_users = ', $Bac_users, '
        ';
        echo "\n\n";
    }
  
    $sql =  "INSERT INTO Bac_model (ApplicationId, BacNeed, BacTarget, BacActivities, BacDeliver, BacUsers, InsertBy)
                     VALUES ( $ApplicationId, '$Bac_need', '$Bac_target', '$Bac_activities', '$Bac_deliver', '$Bac_users', USER())";


    if(!mysqli_query($con, $sql))
    {
        echo $sql;
        echo "\n\n";
        echo '***** Unable to insert the data, please check logs and retry *****';
    }
    else
    {
        if ($debug) {
            echo '***** Data Successfully inserted *****';
        }
        echo json_encode("success");        
    }

?>
