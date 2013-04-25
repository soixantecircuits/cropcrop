<?php
include("classes/easy_upload/upload_class.php"); //classes is the map where the class file is stored
$analys = false;
$upload = new file_upload();

$upload->upload_dir = 'uploads/';
$upload->extensions = array('.png', '.jpg', '.zip', '.pdf', '.mp4','zip', '.mov'); // specify the allowed extensions here
$upload->rename_file = true;


if(!empty($_FILES)) {
	$upload->the_temp_file = $_FILES['userfile']['tmp_name'];
	$upload->the_file = $_FILES['userfile']['name'];
	$upload->http_error = $_FILES['userfile']['error'];
	$upload->do_filename_check = 'y'; // use this boolean to check for a valid filename
	
		if ($upload->upload()){
		$analys = true;
		echo  "<h1> ". $upload->file_copy ."aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h1>";
    		$tmp = exec("python3 ./uploads/upload_video_toServer.py ".$upload->file_copy);
		
		
		echo '<div id="status">success</div>';
		echo '<div id="message">'. $tmp.' </div>';		
		echo '<div id="uploadedfile">'. $upload->file_copy .'</div>';
		#exec('python3 ./uploads/cropcrop.py ./uploads/'. $upload->file_copy .' ./uploads/screen.json '. $upload->file_copy);
				
	} else {
		
		echo '<div id="status">failed</div>';
		echo '<div id="message">'. $upload->show_error_string() .'</div>';
		
	}
}




?>
