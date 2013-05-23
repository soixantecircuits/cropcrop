<?php

    if(isset($_POST["json"])){
        try {

        // DATA ANALYSIS
            $incommingJson = $_POST["json"];                              // Wild Json
            if (json_decode($incommingJson) == null) {                    // Is $incommingJson valid?
                throw new Exception('Invalid Json');
            }
            $jsonExploitable = json_decode($incommingJson, true);         // Specific var used to access json datas
            
        // STOCK DATA IN FILE
            $file = fopen('screen.json','w+');                            // Create/modify file containing crops to be passed to python crop script
            fwrite($file, $incommingJson);                                // Stock our json into that file
            fclose($file);                                                // Close the file 

            if ( ! file_exists('screen.json')) {                          // Does screen.json exists?
                throw new Exception('screen.json has not been created');
            }
            if ( file_get_contents('screen.json') == '') {                // Is screen.json empty?
                throw new Exception('screen.json is empty. Content : '.file_get_contents('screen.json'));
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
            if(json_encode($output) == '[]'){                             // Does python script return informations?
                throw new Exception('Failed cropcrop.py, command is : '.$command);
            }
            echo $resp;                                                   // Send back json informations
        }
        catch (Exception $e){
            echo ('Fatal error : '. $e->getMessage());
        }

    }

?>