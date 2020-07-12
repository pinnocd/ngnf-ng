<?php
    require '../../config/database.php';

    // Set up default sample data
    $ApplicationId  = $_REQUEST['ApplicationId'] ?? '';

    $Con_models = [];
    $sql = "SELECT ApplicationId, ConName, ConPosition, ConDOB, ConAddress, ConPreAddress, ConLandlineNo, ConOtherNo, ConEmail,
                    ConSenName, ConSenPosition, ConSenDOB, ConSenAddress, ConSenPreAddress, ConSenLandlineNo, ConSenOtherNo, ConSenEmail 
            FROM Con_model";
    if ($ApplicationId) {
      $sql .= " WHERE  ApplicationId = $ApplicationId";
    }
    
    if($result = mysqli_query($con, $sql))
    {
      $i = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $Con_models[$i]['ApplicationId']    = $row['ApplicationId'];
        $Con_models[$i]['ConName'] 		      = $row['ConName'];
        $Con_models[$i]['ConPosition'] 	    = $row['ConPosition'];
        $Con_models[$i]['ConDOB']           = $row['ConDOB'];
        $Con_models[$i]['ConAddress'] 	    = $row['ConAddress'];
        $Con_models[$i]['ConPreAddress'] 	  = $row['ConPreAddress'];
        $Con_models[$i]['ConLandlineNo'] 	  = $row['ConLandlineNo'];
        $Con_models[$i]['ConOtherNo'] 	    = $row['ConOtherNo'];
        $Con_models[$i]['ConEmail'] 		    = $row['ConEmail'];
        $Con_models[$i]['ConSenName'] 	    = $row['ConSenName'];
        $Con_models[$i]['ConSenPosition'] 	= $row['ConSenPosition'];
        $Con_models[$i]['ConSenDOB']        = $row['ConSenDOB'];
        $Con_models[$i]['ConSenAddress']    = $row['ConSenAddress'];
        $Con_models[$i]['ConSenPreAddress'] = $row['ConSenPreAddress'];
        $Con_models[$i]['ConSenLandlineNo'] = $row['ConSenLandlineNo'];
        $Con_models[$i]['ConSenOtherNo'] 	  = $row['ConSenOtherNo'];
        $Con_models[$i]['ConSenEmail'] 		  = $row['ConSenEmail'];

        $i++;
      }
    
      echo json_encode($Con_models);
    }
    else
    {
      echo $sql,"\n";
      echo '***** Unable to retrieve the data, please check logs and retry *****';
      echo json_encode("failure");
    }
?>
