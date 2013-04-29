<?php
    if(isset($_POST["json"])){
    	


    
    $person = json_encode($_POST["json"]);
    $person = str_replace('\\', '', $person);
 	$file = fopen('screen.json','w+');	

    fwrite($file, $person);
    fclose($file);

    $output = json_decode($person);
   	//echo $output->title;
    
    $resp = exec('python3 ./scripts/cropcrop.py ./files/'. $output->title ." screen.json  ./files/". $output->title);
    echo $resp;
}

?>