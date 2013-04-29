<?php
    if(isset($_POST["json"])){
    	


    
    $person = json_encode($_POST["json"]);
    $person = str_replace('\\', '', $person);
 	$file = fopen('screen.json','w+');	

    fwrite($file, $person);
    fclose($file);

    $output = json_decode($person);
   	echo $output->title;
    
    // Now you can access your php object like so
    // $output[0]->variable-name
}

?>