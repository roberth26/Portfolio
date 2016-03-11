<?php

// entry point
theme_init();

function theme_init() {
	add_action( 'init', 'theme_register_custom_post_types' );

	add_theme_support( 'post-thumbnails' ); 
	add_theme_support( 'menus' ); 
	add_theme_support( 'html5' );

	add_shortcode( 'graphic', 'theme_graphic_shortcode' );
}

function theme_register_custom_post_types() {
	$labels = array(
		'name'                => __( 'Projects', 'portfolio_v2' ),
		'singular_name'       => __( 'Project', 'portfolio_v2' ),
		'add_new'             => _x( 'Add New Project', 'portfolio_v2', 'portfolio_v2' ),
		'add_new_item'        => __( 'Add New Project', 'portfolio_v2' ),
		'edit_item'           => __( 'Edit Project', 'portfolio_v2' ),
		'new_item'            => __( 'New Project', 'portfolio_v2' ),
		'view_item'           => __( 'View Project', 'portfolio_v2' ),
		'search_items'        => __( 'Search Projects', 'portfolio_v2' ),
		'not_found'           => __( 'No Projects found', 'portfolio_v2' ),
		'not_found_in_trash'  => __( 'No Projects found in Trash', 'portfolio_v2' ),
		'parent_item_colon'   => __( 'Parent Project:', 'portfolio_v2' ),
		'menu_name'           => __( 'Projects', 'portfolio_v2' ),
	);
	register_post_type( 'project',
		array(
			'labels' => $labels,
			'public' => true,
			'has_archive' => true,
			'show_in_rest' => true,
			'query_var' => 'project',
			'taxonomies' => array(
				'post_tag',
				'category'
			),
			'supports' => array(
				'thumbnail',
				'title',
				'editor',
				'excerpt', 
				'trackbacks',
				'custom-fields',
				'comments',
				'page-attributes'
			),
			'rewrite' => array( 'slug' => 'projects', 'with_front' => false )
		)
	);
}

function theme_get_images( $array_of_ids ) {
	$output = array();
	foreach( $array_of_ids as $id ) {
		$output[] = array(
			'full' => wp_get_attachment_image_src( $id, 'full' )[ 0 ],
			'small' => wp_get_attachment_image_src( $id, 'thumbnail' )[ 0 ]
		);
	}
	return $output;
}

function theme_get_post_categories( $post_id ) {
	$output = array();
	foreach ( get_the_category( $post_id ) as $cat ) {
		$output[] = $cat -> name;
	}
	return $output;
}

function theme_get_all_categories() {
	$output = array();
	$output[] = 'All';
	foreach ( get_categories() as $cat ) {
		if ( $cat -> name != 'Uncategorized' )
			$output[] = $cat -> name;
	}
	return $output;
}

function theme_get_tools( $tools_str ) {
	return explode( ',', str_replace( ', ', ',', $tools_str ) );
}

function theme_get_social_menu() {
	$output = array();
	foreach( wp_get_nav_menu_items( 'Social Menu' ) as $menu_item ) {
		$output[] = array(
			'label' => ''. do_shortcode( $menu_item -> post_title ),
			'url' => $menu_item -> url
		);
	}
	return $output;
}

function theme_get_graphic( $name ) {
	return file_get_contents( get_stylesheet_directory_uri() . '/img/' . $name . '.svg' );
}

function theme_graphic_shortcode( $atts ) {
	extract( shortcode_atts( array(
		'name' => 'graphic_name'
	), $atts ) );
	return theme_get_graphic( $name );
}