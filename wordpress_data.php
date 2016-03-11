<?php
	define( 'WP_USE_THEMES', false );
	require_once( dirname( __FILE__ ) . '/wordpress/wp-load.php' );

	$args = array(
		'posts_per_page' => -1,
		'post_type'      => 'project',
		'post_status'    => 'publish'
	);
	$projects = get_posts( $args );

	$demo_reel = get_page_by_title( 'Demo Reel' );

	$output = array(
		'projects' => array(),
		'categories' => theme_get_all_categories(),
		'about' => wpautop( get_page_by_title( 'About' ) -> post_content, true ),
		'demo_reel' => array(
			'description' => wpautop( $demo_reel -> post_content, true ),
			'url' => get_post_meta( $demo_reel -> ID, 'url', true )
		),
		'social_menu' => theme_get_social_menu()
	);
	foreach( $projects as $project ) {
		$date = get_post_meta( $project -> ID, 'date', true );
		$output[ 'projects' ][] = array(
			'title' => $project -> post_title,
			'id' => $project -> ID,
			'description' => wpautop( $project -> post_content, true ),
			'images' => theme_get_images( get_post_meta( $project -> ID, 'images', true ) ),
			'tools' => theme_get_tools( get_post_meta( $project -> ID, 'tools', true ) ),
			'categories' => theme_get_post_categories( $project -> ID ),
			'date' => array(
				'unformatted' => $date,
				'formatted' => date( 'M. j, Y', strtotime( $date ) )
			),
			'view_count' => json_decode( get_post_meta( $project -> ID, 'views', true ) ) -> count
		);
	}

	echo json_encode( $output, JSON_HEX_QUOT | JSON_HEX_TAG );
?>