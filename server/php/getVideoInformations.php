<?php 

	if (isset($_POST['name']))
	{
		$filename = $_POST['name'];
		$newFilename = preg_replace('/\s+/', '_', $filename);
		rename( "files/".$filename, "files/".$newFilename );

		$tmp = json_decode(exec("python3 scripts/uploadinfo.py files/'".$newFilename."'"));
		$response = array(
			"message" => $tmp
		);
		header('Content-Type: application/json');
		echo json_encode($response);
	}

?>
