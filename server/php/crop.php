<?php

    if(isset($_POST["json"])){
        try {

        // DATA ANALYSIS
            $incommingJson = $_POST["json"];
            // $incommingJson = '{"foo":"bar","hello":"hi"}';

            if (json_decode($incommingJson) == null) {
                throw new Exception('Invalid Json');
            }
            $validJson = json_decode($incommingJson);

            // Transform received information into json string
            // $jsonInformations = json_encode($incommingJson);

        // STOCK DATA IN FILE

            /* Open a file to write into */
                $file = fopen('screen.json','w+');
            // Stock our json into that file
                fwrite($file, $validJson);
            // Close the file 
                fclose($file);
            // If  screen.json
                if ( file_get_contents ('screen.json') == '') {
                    throw new Exception('screen.json is empty. Content : '.file_get_contents ('screen.json'));
                }
            // If exists screen.json
                if ( ! file_exists('screen.json')) {
                    throw new Exception('screen.json has not been created');
                }
            // Clean special caracters wich would crash the application
                // $jsonInformations = str_replace('\\', '', $jsonInformations);

        // EXECUTE PYTHON CROP SCRIPT
            // echo $validJson->title; // The MTV : Moving Testing Variable
                $resp = exec('python3 ./scripts/cropcrop.py ./files/'. $validJson->title ." screen.json  ". $validJson->title, $output );
                if(json_encode($output) == '[]'){
                    throw new Exception('Failed cropcrop.py, result is : '.json_encode($output));
                }
            // Send back json informations
                echo $resp;
        }
        catch (Exception $e){
            echo ('Fatal error : '. $e->getMessage());
        }

    }

?>