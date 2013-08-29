<?php

function csvToArrayTwo($file, $delimiter) {
  if (($handle = fopen($file, 'r')) !== FALSE) {
    $i = 0; 
    while (($lineArray = fgetcsv($handle, 4000, $delimiter, '"')) !== FALSE) {
      for ($j = 0; $j < count($lineArray); $j++) {
//      for ($j = 0; $j < 3; $j++) { 
	$arr[$i][$j] = $lineArray[$j];
	//print $lineArray[$j];
      } 
      $i++; 
    } 
    fclose($handle); 
  } 
  return $arr; 
}

function processArrayToJSON($choice) {
	if ($choice == 1) {
		$feedTwo = '/home/dolphin/Documents/Research/MPAttendance/ls/15th/csv/15-1.csv'; //'https://docs.google.com/spreadsheet/pub?key=0AvsB_DdOG-ZSdDlZQTU4bHFObVFWeDJhMXRJMkRpRkE&output=csv'; 
	}
	if ($choice == 2) {
		$feedTwo = '/home/dolphin/Documents/Research/MPAttendance/ls/15th/csv/15-2.csv';
	}
	if ($choice == 3) {
		$feedTwo = '/home/dolphin/Documents/Research/MPAttendance/ls/15th/csv/15-3.csv';
	}
	if ($choice == 4) {
		$feedTwo = '/home/dolphin/Documents/Research/MPAttendance/ls/15th/csv/15-4.csv';
	}
	if ($choice == 5) {
		$feedTwo = '/home/dolphin/Documents/Research/MPAttendance/ls/15th/csv/15-5.csv';
	}
	if ($choice == 6) {
		$feedTwo = '/home/dolphin/Documents/Research/MPAttendance/ls/15th/csv/15-6.csv';
	}
	if ($choice == 7) {
		$feedTwo = '/home/dolphin/Documents/Research/MPAttendance/ls/15th/csv/15-7.csv';
	}
	if ($choice == 8) {
		$feedTwo = '/home/dolphin/Documents/Research/MPAttendance/ls/15th/csv/15-8.csv';
	}
	if ($choice == 9) {
		$feedTwo = '/home/dolphin/Documents/Research/MPAttendance/ls/15th/csv/15-9.csv';
	}
	if ($choice == 10) {
		$feedTwo = '/home/dolphin/Documents/Research/MPAttendance/ls/15th/csv/15-10.csv';
	}
	if ($choice == 11) {
		$feedTwo = '/home/dolphin/Documents/Research/MPAttendance/ls/15th/csv/15-11.csv';
	}
	if ($choice == 12) {
		$feedTwo = '/home/dolphin/Documents/Research/MPAttendance/ls/15th/csv/15-12.csv';
	}

	$keysTwo = array();
	$newArrayTwo = array();

	// Do it
	$dataTwo = csvToArrayTwo($feedTwo, ',');

	$countTwo = count($dataTwo) - 2;
	for ($iter = 1; $iter<$countTwo; $iter++) {
	  $dataTwo[$iter][1] = str_replace('"', '', $dataTwo[$iter][1]);
	}

	$labelsTwo = array_shift($dataTwo);
	foreach ($labelsTwo as $labelTwo) {
	  $keysTwo[] = $labelTwo;
	}

	$keysTwo[] = 'id';

	for ($eyeter = 0; $eyeter < $countTwo; $eyeter++) {
	  $dataTwo[$eyeter][] = $eyeter;
	}

	for ($k = 0; $k < $countTwo; $k++) {
	  $dTwo = array_combine($keysTwo, $dataTwo[$k]);
	  $newArrayTwo[$k] = $dTwo;
	}

	return $newArrayTwo;
}

if(isset($_POST['lsSessionId'])) {

    if($_POST['lsSessionId'] == 1) {
        $sigh = processArrayToJSON(1);
        echo json_encode($sigh);
    }
    if($_POST['lsSessionId'] == 2) {
        $sigh = processArrayToJSON(2);
        echo json_encode($sigh);
    }

    if($_POST['lsSessionId'] == 3) {
        $sigh = processArrayToJSON(3);
        echo json_encode($sigh);
    }
    if($_POST['lsSessionId'] == 4) {
        $sigh = processArrayToJSON(4);
        echo json_encode($sigh);
    }

    if($_POST['lsSessionId'] == 5) {
        $sigh = processArrayToJSON(5);
        echo json_encode($sigh);
    }
    if($_POST['lsSessionId'] == 6) {
        $sigh = processArrayToJSON(6);
        echo json_encode($sigh);
    }

    if($_POST['lsSessionId'] == 7) {
        $sigh = processArrayToJSON(7);
        echo json_encode($sigh);
    }
    if($_POST['lsSessionId'] == 8) {
        $sigh = processArrayToJSON(8);
        echo json_encode($sigh);
    }

    if($_POST['lsSessionId'] == 9) {
        $sigh = processArrayToJSON(9);
        echo json_encode($sigh);
    }
    if($_POST['lsSessionId'] == 10) {
        $sigh = processArrayToJSON(10);
        echo json_encode($sigh);
    }

    if($_POST['lsSessionId'] == 11) {
        $sigh = processArrayToJSON(11);
        echo json_encode($sigh);
    }
    if($_POST['lsSessionId'] == 12) {
        $sigh = processArrayToJSON(12);
        echo json_encode($sigh);
    }

}
?>
