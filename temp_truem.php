<?php
echo 'ERROR|ACCESS_DENIED';
exit();
/* API Connection  TMTopup for Dadteam.Com*/
/*
* Modify by Nst Interactive [http://www.nstinteractive.com/]
*/


# ------------------------------------- Config Begin ------------------------------------- #
// ------------------------------------------------------------------------------------------------
/* MySQL Config | Begin */
// Hostname ของ MySQL Server
$_CONFIG['mysql']['dbhost'] = 'localhost';

if($_SERVER['REMOTE_ADDR'] == '127.0.0.1' || $_SERVER['REMOTE_ADDR'] == '::1')
{
	// Username ที่ใช้เชื่อมต่อ MySQL Server
	$_CONFIG['mysql']['dbuser'] = 'root';
	
	// Password ที่ใช้เชื่อมต่อ MySQL Server
	$_CONFIG['mysql']['dbpw'] = 'rooteen';
}
else
{
	// Username ที่ใช้เชื่อมต่อ MySQL Server
	$_CONFIG['mysql']['dbuser'] = 'pbea_dba';
	
	// Password ที่ใช้เชื่อมต่อ MySQL Server
	$_CONFIG['mysql']['dbpw'] = '0UNlpJezgrEDdmq#ySCWXH!5f+F-jcRP';
}

// ชื่อฐานข้อมูลที่เราจะเติม Point ให้
$_CONFIG['mysql']['dbname'] = 'pbea_db';

// ชื่อตารางที่เราจะเติม Point ให้ ตัวอย่าง : member
$_CONFIG['mysql']['tbname'] = 'members';

// ชื่อ field ที่ใช้อ้าง Username
$_CONFIG['mysql']['field_username'] = 'username';

// ชื่อ field ที่ใช้ในการเก็บ Point จากการเติมเงิน
$_CONFIG['TMN']['point_field_name'] = 'point';
/* MySQL Config | End */
// ------------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------------
/* จำนวน Point ที่จะได้รับเมื่อเติมเงินในราคาต่างๆ | Begin */
$_CONFIG['TMN'][50]['point'] = 42;                    // Point ที่ได้รับเมื่อเติมเงินราคา 50 บาท
$_CONFIG['TMN'][90]['point'] = 76;                    // Point ที่ได้รับเมื่อเติมเงินราคา 90 บาท
$_CONFIG['TMN'][150]['point'] = 127;                // Point ที่ได้รับเมื่อเติมเงินราคา 150 บาท
$_CONFIG['TMN'][300]['point'] = 255;                // Point ที่ได้รับเมื่อเติมเงินราคา 300 บาท
$_CONFIG['TMN'][500]['point'] = 425;                // Point ที่ได้รับเมื่อเติมเงินราคา 500 บาท
$_CONFIG['TMN'][1000]['point'] = 851;            // Point ที่ได้รับเมื่อเติมเงินราคา 1,000 บาท
/* จำนวน Point ที่จะได้รับเมื่อเติมเงินในราคาต่างๆ | End */
// ------------------------------------------------------------------------------------------------


// กำหนด API Passkey
define('API_PASSKEY', 'pBEzZP6shop4');

# -------------------------------------- Config End -------------------------------------- #




// ------------------------------------------------------------------------------------------------
/* เชื่อมต่อฐานข้อมูล | Begin */
$conn = mysqli_connect($_CONFIG['mysql']['dbhost'], $_CONFIG['mysql']['dbuser'], $_CONFIG['mysql']['dbpw'], $_CONFIG['mysql']['dbname']) or die('ERROR|DB_CONN_ERROR|' . mysqli_error());
/* เชื่อมต่อฐานข้อมูล | End */
// ------------------------------------------------------------------------------------------------


if (isset($_POST['request'])) {
    $result = mysqli_query($conn, 'SELECT * FROM members WHERE username LIKE "'.$_POST['username'].'"') or die(mysqli_error());
    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_assoc($result);
        if (mysqli_query($conn, "UPDATE members SET `point` = `point`+'" . $_CONFIG['TMN'][$_POST['point']]['point'] . "' WHERE `username` LIKE '".$_POST['username']."'") == false) {
            echo 'ERROR|mysqli_UDT_ERROR|' . mysqli_error();
        } else {
            $strSQL_LOGS = "INSERT INTO logs (`username`, `type`, `value` , `total`, `time`) VALUES ('" . $_POST['username'] . "', 'TMN_TOPUP','" . $_CONFIG['TMN'][$_POST['point']]['point'] . "', '" . ($row['point'] + $_CONFIG['TMN'][$_POST['point']]['point']) . "','".$_POST['time']."')";
            $objQuery_LOGS = mysqli_query($conn, $strSQL_LOGS);
            echo 'SUCCEED|UID=' . $_POST['username'];
        }
    }
}
?>
