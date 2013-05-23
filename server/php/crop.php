<?php

    if(isset($_POST["json"])){
        try {

        // DATA ANALYSIS
            $incommingJson = $_POST["json"];
            // $incommingJson = '{"foo":"bar","hello":"hi"}';

            if (json_decode($incommingJson) == null) {
                throw new Exception('Invalid Json');
            }
            $validJson = json_encode($incommingJson);                     // Transform received information into json string


        // STOCK DATA IN FILE
            $jsonReplaced = str_replace('\\', '', $validJson);            // Clean special caracters wich would crash the application
            // echo $jsonReplaced; // The MTV : Moving Testing Variable
            
            $file = fopen('screen.json','w+');                            // Open a file to write into
            fwrite($file, $jsonReplaced);                                 // Stock our json into that file
            fclose($file);                                                // Close the file 

            if ( file_get_contents('screen.json') == '') {                          // If  screen.json
                throw new Exception('screen.json is empty. Content : '.file_get_contents('screen.json'));
            }

            if ( ! file_exists('screen.json')) {                          // If exists screen.json
                throw new Exception('screen.json has not been created');
            }

        // EXECUTE PYTHON CROP SCRIPT
            $resp = exec('python3 ./scripts/cropcrop.py ./files/'. $validJson->title ." screen.json  ". $validJson->title, $output );
            if(json_encode($output) == '[]'){
                throw new Exception('Failed cropcrop.py, result is : '.json_encode($output));
            }
            echo $resp;                                                   // Send back json informations
        }
        catch (Exception $e){
            echo ('Fatal error : '. $e->getMessage());
        }

    }

?>