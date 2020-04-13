<?php
    require '../../config/database.php';

    // Set up default sample data
    $ApplicationId      = $_REQUEST['ApplicationId'] ?? '';
    $Con_name 		    = $_REQUEST['Conname'] ?? '';
    $Con_dob 		    = $_REQUEST['Condob'] ?? '';
    $Con_address 	    = $_REQUEST['Conaddress'] ?? '';
    $Con_preaddress     = $_REQUEST['Conpreaddress'] ?? '';
    $Con_landlineno	    = $_REQUEST['Conlandlineno'] ?? '';
    $Con_otherno	    = $_REQUEST['Conotherno'] ?? '';
    $Con_email 		    = $_REQUEST['Conemail'] ?? '';
    $Con_senname	    = $_REQUEST['Consenname'] ?? '';
    $Con_sendob 	    = $_REQUEST['Consendob'] ?? '';
    $Con_senaddress     = $_REQUEST['Consenaddress'] ?? '';
    $Con_senpreaddress  = $_REQUEST['Consenpreaddress'] ?? '';
    $Con_senlandlineno  = $_REQUEST['Consenlandlineno'] ?? '';
    $Con_senotherno	    = $_REQUEST['Consenotherno'] ?? '';
    $Con_senemail 	    = $_REQUEST['Consenemail'] ?? '';

    echo 
        'ApplicationId = ', $ApplicationId, '
        Con_name = ', $Con_name, '
        Con_dob = ',  $Con_dob, '
        Con_address = ',  $Con_address, '
        Con_preaddress = ',  $Con_preaddress, '
        Con_landlineno = ',  $Con_landlineno, '
        Con_otherno = ',  $Con_otherno, '
        Con_email = ',  $Con_email, '
        Con_senname = ', $Con_senname, '
        Con_sendob = ',  $Con_sendob, '
        Con_senaddress = ',  $Con_senaddress, '
        Con_senpreaddress = ',  $Con_senpreaddress, '
        Con_senlandlineno = ',  $Con_senlandlineno, '
        Con_senotherno = ',  $Con_senotherno, '
        Con_senemail = ',  $Con_senemail;
    echo "\n\n";
  
    $sql =  "INSERT INTO Con_model ( ApplicationId, ConName, ConDOB, ConAddress, ConPreAddress, ConLandlineNo, ConOtherNo, ConEmail, 
             ConSenName, ConSenDOB, ConSenAddress, ConSenPreAddress, ConSenLandlineNo, ConSenOtherNo, ConSenEmail, InsertBy) 
            VALUES ( $ApplicationId, '$Con_name', '$Con_dob', '$Con_address', '$Con_preaddress', '$Con_landlineno', '$Con_otherno', '$Con_email', 
            '$Con_senname', '$Con_sendob', '$Con_senaddress', '$Con_senpreaddress', '$Con_senlandlineno', '$Con_senotherno', '$Con_senemail', USER())";

    echo $sql;
    echo "\n\n";

    if(!mysqli_query($con, $sql))
    {
        echo '***** Unable to insert the data, please check logs and retry *****';
    }
    else
    {
        echo '***** Data Successfully inserted *****';
    }

  header("refresh:5; url=index.html");
?>
