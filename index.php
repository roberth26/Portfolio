<html>
	<head>
		<title>Robert Hall</title>
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
		<meta charset="utf-8" />
		<style>
			<?php echo file_get_contents( './css/style.min.css' ); ?>
		</style>
	</head>
	<body>
		<div id="app_container"></div>
		<script>
			window.app_data = <?php require_once( './wordpress_data.php' ); ?>;
			<?php echo file_get_contents( './app/build/app.min.js' ); ?>
		</script>
	</body>
</html>