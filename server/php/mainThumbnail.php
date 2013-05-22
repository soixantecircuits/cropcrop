<?php 

	if (isset($_POST['name']))
	{
		$filename = $_POST['name'];

		$tmp = json_decode(exec("python3 scripts/uploadinfo.py files/'". $filename."'"));
		$response = array(
			"message" => $tmp
		);
		header('Content-Type: application/json');
		echo json_encode($response);
	}

?>
