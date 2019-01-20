<?php
require_once('../lib/paginator.php');
$strSQL = "SELECT * FROM twallets WHERE status = 1";
if(isset($_GET['find']) && $_GET['find'] != ''){
    $find = $_GET['find'];
	if($_GET['field_name'] == 'phone'){
        $find = str_replace('-','',$find);
	}
    $strSQL .= " AND ".$_GET['field_name']." LIKE '%".$find ."%'";
}
$objQuery = mysqli_query($conn, $strSQL) or die (mysqli_error());
$Num_Rows = mysqli_num_rows($objQuery);

$Per_Page = 15;   // Per Page

$Page = $_GET["page"];
if (!$_GET["page"]) {
    $Page = 1;
}

$Prev_Page = $Page - 1;
$Next_Page = $Page + 1;

$Page_Start = (($Per_Page * $Page) - $Per_Page);
if ($Num_Rows <= $Per_Page) {
    $Num_Pages = 1;
} else if (($Num_Rows % $Per_Page) == 0) {
    $Num_Pages = ($Num_Rows / $Per_Page);
} else {
    $Num_Pages = ($Num_Rows / $Per_Page) + 1;
    $Num_Pages = (int)$Num_Pages;
}

$strSQL .= " ORDER  BY id DESC LIMIT $Page_Start , $Per_Page";
$objQuery = mysqli_query($conn, $strSQL);
?>

<!-- Page Heading -->
<div class="row">
	<div class="col-lg-12">
		<h1 class="page-header">
			True Wallet
			<small>เติมเงินด้วย True Wallet (<?php echo $Num_Rows; ?> รายการ)</small>
		</h1>
		<!--		                    <ol class="breadcrumb">-->
		<!--		                        <li class="active">-->
		<!--		                            <i class="fa fa-dashboard"></i> Dashboard-->
		<!--		                        </li>-->
		<!--		                    </ol>-->
	</div>
</div>
<!-- /.row -->
<form action="/adminpanel/?action=twallet" method="get" id="findForm">
	<input type="hidden" name="action" value="twallet">
	<input type="hidden" name="field_name" value="<?php echo is_null($_GET['field_name']) ? 'username' : $_GET['field_name'] ?>">
	<input type="hidden" name="field_title" value="<?php echo is_null($_GET['field_title']) ? 'Username' : $_GET['field_title'] ?>">
	<div class="form-group input-group">
		<div class="input-group-btn">
			<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
			        aria-expanded="false"><span class="field-title"><?php echo is_null($_GET['field_title']) ? 'Username' : $_GET['field_title'] ?></span> <span class="caret"></span></button>
			<ul class="dropdown-menu">
				<li><a onclick="return chFindValue('username','Username');" href="#">Username</a></li>
				<li><a onclick="return chFindValue('fulldate','วัน/เวลาทำรายการ');" href="#">วัน/เวลาทำรายการ</a></li>
				<li><a onclick="return chFindValue('txid','หมายเลขอ้างอิง');" href="#">หมายเลขอ้างอิง</a></li>
				<li><a onclick="return chFindValue('message','ข้อความ');" href="#">ข้อความ</a></li>
				<li><a onclick="return chFindValue('phone','โทรศัพท์');" href="#">โทรศัพท์</a></li>
				<li><a onclick="return chFindValue('owner','ชื่อบัญชี');" href="#">ชื่อบัญชี</a></li>
			</ul>
		</div><!-- /btn-group -->
		<input type="text" class="form-control" name="find" value="<?php echo $_GET['find'];?>">
		<span class="input-group-btn">
        <button class="btn btn-default" type="submit">
            <i class="fa fa-search"></i>
        </button>
    </span>
	</div>
</form>


<table class="table">
	<tr>
		<th>ID</th>
		<th>วันที่ทำรายการ</th>
		<th>หมายเลขอ้างอิง</th>
		<th>จำนวน</th>
		<th>ข้อความ</th>
		<th>โทรศัพท์</th>
		<th>ชื่อบัญชี</th>
		<th>User</th>
	</tr>
    <?php
    while ($objResult = mysqli_fetch_array($objQuery)) {
        ?>
		<tr>
			<td><?php echo $objResult["id"]; ?></td>
			<td><?php echo $objResult["fulldate"]; ?></td>
			<td><?php echo $objResult["txid"]; ?></td>
			<td><?php echo $objResult["signed_amount"]; ?></td>
			<td><?php echo $objResult["message"]; ?></td>
			<td><?php echo $objResult["signed_phone"]; ?></td>
			<td><?php echo $objResult["owner"]; ?></td>
			<td><?php echo (!is_null($objResult["username"])) ? $objResult["username"] : 'ยังไม่ยืนยัน'; ?></td>
		</tr>
        <?php
    }
    ?>
</table>
<div align="center">


    <?php

    $pages = new Paginator;
    $pages->items_total = $Num_Rows;
    $pages->mid_range = 10;
    $pages->current_page = $Page;
    $pages->default_ipp = $Per_Page;
    if(isset($_GET['find'])){
        $pages->url_next = "/adminpanel/?action=twallet&field_name=".$_GET['field_name']."&field_title=".$_GET['field_title']."&find=".$_GET['find']."&page=";
    } else {
        $pages->url_next = "/adminpanel/?action=twallet&page=";
    }

    $pages->paginate();

    echo $pages->display_pages()
    ?>
</div>

<script type="text/javascript">
	function chFindValue(field,title){
        $('#findForm').find('[name=field_name]').val(field);
        $('#findForm').find('[name=field_title]').val(title);
        $('#findForm').find('.field-title').text(title);
        return false;
	}
</script>


