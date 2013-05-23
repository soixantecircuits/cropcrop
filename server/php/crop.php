<?php

    if(isset($_POST["json"])){

        // DATA ANALYSIS
        try {
            if (json_decode($_POST["json"]) == null) {
                throw new Exception('Invalid Json');
            }
            // Transform received information into json string
            $jsonInformations = json_encode($_POST["json"]);
            // Clean special caracters wich would crash the application
            $jsonInformations = str_replace('\\', '', $jsonInformations);
        }
        catch (Exception $e){
            echo ('Fatal error : '. $e->getMessage() );
        }

        // STOCK DATA IN FILE
        try {
            /* Open a file to write into */
            $file = fopen('screen.json','w+');
            // Stock our json into that file
            fwrite($file, $jsonInformations);
            // Close the file 
            fclose($file);
            // If exists screen.json
            if ( ! file_exists('screen.json')) {
                throw new Exception('screen.json has not been created');
            }
        }
        catch (Exception $e){
            echo ('Fatal error : '. $e->getMessage() );
        }


        // Output is what we send 
        $output = json_decode($jsonInformations);


        // Exec python script
        $resp = exec('python3 ./scripts/cropcrop.py ./files/'. $output->title ." screen.json  ". $output->title);


        // Send back json informations
        echo $resp;
    }

?>