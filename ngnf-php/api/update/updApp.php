<?php
    require '../../config/database.php';

    // Set up default sample data
    $ApplicationId  = $_REQUEST['ApplicationId'] ?? '';
    $Status         = $_REQUEST['Status'] ?? '';
    $UserId         = $_REQUEST['UserId'] ?? '';
    $ProposalWriter = $_REQUEST['ProposalWriter'] ?? '';
    $SeniorApprover = $_REQUEST['SeniorApprover'] ?? '';
    $debug          = $_REQUEST['degug'];

    $sql =  "UPDATE Applications SET Status ='$Status', UpdateDateTime=NOW() , UpdateBy='$UserId', 
                    ProposalWriter='$ProposalWriter', SeniorApprover='$SeniorApprover' 
            WHERE ApplicationId = $ApplicationId";

    if ($debug) {
        echo 
            "\nApplicationId = ", $ApplicationId, 
            "\nStatus = ", $Status, "\n",
            "UserId = ", $UserId, "\n",
            "ProposalWriter = ", $ProposalWriter, "\n",
            "SeniorApprover = ", $SeniorApprover, "\n"
            ;

        echo $sql,"\n";
    }

    if(!mysqli_query($con, $sql))
    {
        echo $sql,"\n";
        echo '***** Unable to update the data, please check logs and retry *****';
        echo json_encode("failure");
    }
    else
    {
        if ($debug) {
            echo '***** Data Successfully updated *****';
        }
        echo json_encode("success");
    }

?>
