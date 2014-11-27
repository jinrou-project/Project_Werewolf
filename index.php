<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<title>werewolf</title>
</head>
<body>
	<h1>人狼プロジェクト</h1>
<?php
	echo "hello from php\n";

	$counter_file = 'counter.txt';
	$counter_lenght = 8;

	$fp = fopen($counter_file, 'r+');

	if ($fp){
	    if (flock($fp, LOCK_EX)){

	        $counter = fgets($fp, $counter_lenght);
	        $counter++;

	        rewind($fp);

	        if (fwrite($fp,  $counter) === FALSE){
	            print('ファイル書き込みに失敗しました');
	        }

	        flock($fp, LOCK_UN);
	    }
	}

	fclose($fp);

	print("<h2>".$counter."</h2>");
?>
</body>
</html>
