<?php
	define( 'WP_USE_THEMES', false );
	require_once( dirname(__FILE__) . '/wordpress/wp-load.php' );

	$ip = $_SERVER[ 'REMOTE_ADDR' ];

	$id = json_decode( file_get_contents( 'php://input' ) ) -> id;

	$views = get_post_meta( $id, 'views', true );

	if ( $views ) {
		$views = json_decode( $views );
		if ( !in_array( $ip, $views -> ips ) ) {
			$views -> count++;
			update_post_meta( $id, 'views', json_encode( $views ) );
		}
	} else {
		$views = array(
			'count' => 1,
			'ips' => array( $ip )
		);
		add_post_meta( $id, 'views', json_encode( $views ), true );
	}

?>