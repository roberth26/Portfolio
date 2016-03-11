<?php

$output = array();
$data = json_decode( file_get_contents( 'php://input' ), true );

// validate
foreach( $data as $key => $value ) {	
	$required = $value[ 'is_required' ];
	$value = stripslashes( trim( $value[ 'value' ] ) );
	switch ( $key ) {
	    case 'Name':
	        if ( $required === true && $value == '' ) {
	        	$output[ $key ] = 'Please provide your name.';
	        } else if ( !preg_match( "/^[a-zA-Z ]*$/", $value ) ) {
				$output[ $key ] = "Name: Letters and spaces only"; 
	        } else {
	        	$data[ $key ] = htmlentities( $value );	
	        }		        
	        break;
	    case 'Email':
	        if ( $required === true && $value == '' ) {
	        	$output[ $key ] = 'Please provide an email address.';
	    	} else if ( filter_var( $value, FILTER_VALIDATE_EMAIL ) == false ) {
	    		$output[ $key ] = 'Please provide a valid email address.';
	    	} else {
	    		$value = filter_var( $value, FILTER_SANITIZE_EMAIL );
	    		$data[ $key ] = htmlentities( $value );
	    	}	        
	        break;
	    case 'Message':
	        if ( $required === true && $value == '' ) {
	        	$output[ $key ] = 'Please provide a message.';
	        } else {
	        	$data[ $key ] = htmlentities( $value );
	        }
	        break;
	    case 'Subject':
	    	$data[ $key ] = htmlentities( $value );
	    	break;
	}				
}

// if no errors
if ( empty( $output ) ) {
	$to = 'robert@roberthall.co';
	$subject = 'Contact Form: ' . $data[ 'Subject' ];
	$head = 'Content-Type: text/html; charset=utf-8' . "\r\n";
	$head .= 'From: roberthall.co/wordpress <robert@roberthall.co>' . "\r\n";

	$message = file_get_contents( 'http://' . $_SERVER[ 'SERVER_NAME' ] . '/portfolio_v2/email_template.html' );

	// replaces all variables in html template
	foreach( $data as $key => $value ) {
		$message = str_replace( '{$' . $key . '}', $value, $message );
	}

	mail( $to, $subject, $message, $head );

	$output[ 'success' ] = true;
}

echo json_encode( $output );

?>