<?php
    require '../../config/database.php';

    // Set up default sample data
    $ApplicationId       = $_REQUEST['ApplicationId'] ?? '';
    $Fin_orgname 	     = $_REQUEST['Finorgname'] ?? '';
    $Fin_bank	         = $_REQUEST['Finbank'] ?? '';
    $Fin_account         = $_REQUEST['Finaccount'] ?? '';
    $Fin_sortcode        = $_REQUEST['Finsortcode'] ?? '';
    $Fin_bankorgaddress  = $_REQUEST['Finbankorgaddress'] ?? '';
    $Fin_activity        = $_REQUEST['Finactivity'] ?? '';
    $Fin_cost            = $_REQUEST['Fincost'] ?? '';
    $Fin_capital         = $_REQUEST['Fincapital'] ?? '';
    $Fin_revenue         = $_REQUEST['Finrevenue'] ?? '';
    $Fin_auditedaccounts = $_REQUEST['Finauditedaccounts'] ?? '';
    $UserId              = $_REQUEST['UserId'] ?? '';
    $debug               = $_REQUEST['debug'];

    // Check numbers for emptyness
    if (empty($Fin_account)){$Fin_account='null';}
    if (empty($Fin_cost)){$Fin_cost='null';}
    if (empty($Fin_capital)){$Fin_capital='null';}
    if (empty($Fin_revenue)){$Fin_revenue='null';}
 
    if ($debug){
        echo 
            'ApplicationId = ', $ApplicationId, '
            Fin_orgname      = ', $Fin_orgname, '
            Fin_bank      = ', $Fin_bank, '
            Fin_account  = ', $Fin_account, '
            Fin_sortcode     = ', $Fin_sortcode, '
            Fin_bankorgaddress = ', $Fin_bankorgaddress, '
            Fin_activity = ', $Fin_activity, '
            Fin_cost = ', $Fin_cost, '
            Fin_capital = ', $Fin_capital, '
            Fin_revenue = ', $Fin_revenue, '
            Fin_auditedaccounts = ', $Fin_auditedaccounts;
            
        echo "\n\n";
    }
  
    $sql =  "UPDATE Fin_model SET 
                FinOrgName =' $Fin_orgname', 
                FinBank = '$Fin_bank', 
                FinAccount = $Fin_account, 
                FinSortCode = '$Fin_sortcode', 
                FinBankOrgAddress = '$Fin_bankorgaddress',
                FinActivity = '$Fin_activity',
                FinCost = $Fin_cost,
                FinCapital = $Fin_capital,
                FinRevenue = $Fin_revenue,
                FinAuditedAccounts = $Fin_auditedaccounts,
                UpdateDateTime = NOW(), 
                UpdateBy='$UserId'
            WHERE ApplicationId = $ApplicationId";

    if(!mysqli_query($con, $sql))
    {
        echo $sql;
        echo "\n\n";
        echo '***** Unable to insert the data, please check logs and retry *****';
    }
    else
    {
        echo json_encode("success");        
    }

?>
