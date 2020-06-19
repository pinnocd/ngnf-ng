<?php
    require '../../config/database.php';

    // Set up default sample data
    $ApplicationId  = $_REQUEST['ApplicationId'] ?? '';
    $Org_name 		= $_REQUEST['Orgname'] ?? '';
    $Org_address 	= $_REQUEST['Orgaddress'] ?? '';
    $Org_postcode 	= $_REQUEST['Orgpostcode'] ?? '';
    $Org_email 		= $_REQUEST['Orgemail'] ?? '';
    $Org_website 	= $_REQUEST['Orgwebsite'] ?? '';
    $Org_type 		= $_REQUEST['Orgtype'] ?? '';
    $Org_charity 	= $_REQUEST['Orgcharity'] ?? 'null';
    $Org_charity_no = $_REQUEST['Orgcharity_no'] ?? 'null';
    $Org_start_date	= $_REQUEST['Orgstart_date'] ?? '';
    $Org_open 		= $_REQUEST['Orgopen'] ?? 'null';
    $Org_info 		= $_REQUEST['Orginfo'] ?? '';
    $UserId         = $_REQUEST['UserId'] ?? '';
    $debug          = $_REQUEST['debug']; 

    if ($debug){
        echo 
            'ApplicationId = ', $ApplicationId, '
            Org_name = ', $Org_name, '
            Org_address = ',  $Org_address, '
            Org_postcode = ',  $Org_postcode, '
            Org_email = ',  $Org_email, '
            Org_website = ',  $Org_website, '
            Org_type = ', $Org_type, '
            Org_charity = ', $Org_charity, '
            Org_charity_no = ', $Org_charity_no, '
            Org_start_date = ', $Org_start_date, '
            Org_open = ', $Org_open, '
            Org_info = ', $Org_info ;
    }

    $sql =  "UPDATE Org_model SET 
                OrgName ='$Org_name', 
                OrgAddress ='$Org_address', 
                OrgPostcode ='$Org_postcode', 
                OrgEmail ='$Org_email', 
                OrgWebsite ='$Org_website', 
                OrgType ='$Org_type',
                OrgCharity ='$Org_charity', 
                OrgCharityNo =$Org_charity_no, 
                OrgStartDate ='$Org_charity_no', 
                OrgOpen ='$Org_open', 
                OrgInfo ='$Org_info',
                UpdateDateTime = NOW(), 
                UpdateBy='$UserId'
            WHERE ApplicationId = $ApplicationId";

    if(!mysqli_query($con, $sql))
    {
        echo $sql;
        echo "\n\n";
        echo '***** Unable to update the data, please check logs and retry *****';
    }
    else
    {
        echo json_encode("successS");
    }

?>
