<?php

    if(isset($_POST["json"])){
        // DATA ANALYSIS
        $incommingJson = $_POST["json"];
        // $incommingJson = '{"foo":"bar","hello":"hi"}';
        try {
            if (json_decode($incommingJson) == null) {
                throw new Exception('Invalid Json');
            }
            $validJson = json_decode($incommingJson);
            // Transform received information into json string
            // $jsonInformations = json_encode($incommingJson);
            // Clean special caracters wich would crash the application
            // $jsonInformations = str_replace('\\', '', $jsonInformations);
        }
        catch (Exception $e){
            echo ('Fatal error : '. $e->getMessage() ." ".$incommingJson );
        }

        // STOCK DATA IN FILE
        try {
            /* Open a file to write into */
            $file = fopen('screen.json','w+');
            // Stock our json into that file
            fwrite($file, $validJson);
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


        // validJson is what we send 
        // $validJson = json_decode($jsonInformations);
        // echo $validJson->title; // The MTV : Moving Testing Variable


        // Exec python script
        try{
            $resp = exec('python3 ./scripts/cropcrop.py ./files/'. $validJson->title ." screen.json  ". $validJson->title, $output );
            if(json_encode($output) == '[]'){
                throw new Exception('Failed to execute cropcrop.py.');
            }
        }
        catch (Exception $e){
            echo ('Fatal error : '. $e->getMessage());
        }
        // Send back json informations
        echo $resp;
    }

?>