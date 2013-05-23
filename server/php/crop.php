<?php

    if(isset($_POST["json"])){
        try {

        // DATA ANALYSIS
            $incommingJson = $_POST["json"];
            // $incommingJson = '{"foo":"bar","hello":"hi"}';

            if (json_decode($incommingJson) == null) {
                throw new Exception('Invalid Json');
            }
            // Transform received information into json string
            $validJson = json_decode($incommingJson);


        // STOCK DATA IN FILE

            // Clean special caracters wich would crash the application
                // $jsonReplaced = str_replace('\\', '', $jsonInformations);
            // Open a file to write into
                $file = fopen('screen.json','w+');
            // Stock our json into that file
                fwrite($file, "$jsonReplaced");
            // Close the file 
                fclose($file);
            // If  screen.json
                if ( readfile('screen.json') == 0) {
                    throw new Exception('screen.json is empty. Content : '.readfile('screen.json'));
                }
            // If exists screen.json
                if ( ! file_exists('screen.json')) {
                    throw new Exception('screen.json has not been created');
                }

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