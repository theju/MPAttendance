<?php
if( isset($_POST['session_selected']) ) {
    $host = "localhost";
    $user = "root";
    $pwd = "123456";
    $db = "map_attendance";
    $db_connect = mysql_connect($host, $user, $pwd);
    if(!$db_connect) {
	    die('Could not establish the connection');
    }
    
    mysql_select_db($db, $db_connect) or die('Could not connect to the database');

    $s = mysql_real_escape_string( $_POST['session_selected'] ); #mysql_real_escape_string($_POST['message']);
    $rows = array();
    if($s != 15) {
        $query = mysql_query("SELECT * FROM mp_session_data, mp_info WHERE mp_session_data.mp_auto_id = mp_info.mp_auto_id and mp_session_data.session_id='$s'", $db_connect);
    } else {
        $query = mysql_query("SELECT * FROM mp_session_data, mp_info WHERE mp_session_data.mp_auto_id = mp_info.mp_auto_id", $db_connect);
    }
    while($r = mysql_fetch_assoc($query)) {
        $rows[] = $r;
    }
    
    echo json_encode($rows);
} else {
    echo json_encode("Data error. Report to @bkamapantula");
}
?>
