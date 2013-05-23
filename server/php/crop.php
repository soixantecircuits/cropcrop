<?php

    if(isset($_POST["json"])){
        try {

        // DATA ANALYSIS
            $incommingJson = $_POST["json"];                              // Wild Json
            // $incommingJson = '{"foo":"bar","hello":"hi"}';
            if (json_decode($incommingJson) == null) {
                throw new Exception('Invalid Json');
            }
            $validJson = json_encode($incommingJson);                     // Transform received information into json string
            $jsonExploitable = json_decode($incommingJson, true);         // Json selectable elements
            $jsonReplaced = str_replace('\\', '', $validJson);            // Clean special caracters wich would crash the application

        // STOCK DATA IN FILE
            $file = fopen('screen.json','w+');                            // Open a file to write into
            fwrite($file, $incommingJson);                                // Stock our json into that file
            fclose($file);                                                // Close the file 

            if ( file_get_contents('screen.json') == '') {                          // If  screen.json
                throw new Exception('screen.json is empty. Content : '.file_get_contents('screen.json'));
            }
            if ( ! file_exists('screen.json')) {                          // If exists screen.json
                throw new Exception('screen.json has not been created');
            }

        // EXECUTE PYTHON CROP SCRIPT
            // All elements of the executed command
            $software = 'python3';
            $scriptPath = './scripts/cropcrop.py';
            $arg1 = './files/'.$jsonExploitable["title"];
            $arg2 = 'screen.json';
            $arg3 = $jsonExploitable["title"];

            // Execute command
            $command = $software.' '.$scriptPath.' '.$arg1.' '.$arg2.' '.$arg3;
            $resp = exec($command, $output);
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