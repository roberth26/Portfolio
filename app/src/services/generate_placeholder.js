import loremIpsum from 'lorem-ipsum';

export default function generate_placeholder( projects, categories ) {
    function _generate_title() {
        var title = loremIpsum({
            count: Math.ceil( Math.random() * 3 ),
            units: 'words'
        }).split( ' ' );
        for ( var i = 0; i < title.length; i++ ) { // loop each word
            let first = title[ i ].split( '' )[ 0 ].toUpperCase();
            title[ i ] = first + title[ i ].slice( 1 );
        }
        return title.join( ' ' );
    }

    function _generate_date() {
    	let months = [
    		'Jan.',
    		'Feb.',
    		'Mar.',
    		'Apr.',
    		'May',
    		'Jun.',
    		'Jul.',
    		'Aug.',
    		'Sep.',
    		'Oct.',
    		'Nov.',
    		'Dec.'
    	];
    	let day = Math.floor( Math.random() * 30 + 1 );
    	let month = Math.floor( Math.random() * 11 + 1 );
    	let year = Math.floor( Math.random() * 6 + 2010 );
    	return {
    		formatted: months[ month - 1 ] + ' ' + day + ', ' + year,
    		unformatted: year + pad( month ) + pad( day )
    	};

    	function pad( num ) {
    		return num < 10 ? '0' + num : num;
    	}
    }

    function _generate_tools() {
    	let tools = [];
    	let count = Math.floor( Math.random() * 5 );
    	for ( let i = 0; i < count; i++ ) {
    		let tool = loremIpsum({
	            count: 1,
	            units: 'words'
	        });
            let first = tool.split( '' )[ 0 ].toUpperCase();
            tool = first + tool.slice( 1 );
    		tools.push( tool );
    	}
    	return tools;
    }

    function _generate_categories() {
    	let cats = [];
    	for ( let i = 1; i < categories.length; i++ ) {
    		if ( Math.round( Math.random() ) ) {
    			cats.push( categories[ i ] );
    		}
    	}
    	if ( !cats.length ) {
    		let rand = Math.floor( Math.random() * categories.length ) - 1;
    		cats.push( categories[ rand ] );
    	}
    	return cats;
    }

    function _generate_id() {
    	var match = true;
    	var id = 0;
    	while ( match ) {
    		id = Math.round( Math.random() * 1000 );
    		if ( !is_taken( id, projects ) ) {
    			break;
    		}
    	}
    	return id;

    	function is_taken( id, projects ) {
    		for ( let i = 0; i < projects.length; i++ ) {
    			if ( projects[ i ].id == id ) {
    				return true;
    			}
    		}
    		return false;
    	}
    }

    function _generate_description() {
    	let description = [
    		'<p>This is a randomly generated placeholder project.</p>'
    	];
    	let count = Math.round( Math.random() * 3 + 1 );
    	for ( let i = 0; i < count; i++ ) {
    		let lorem = loremIpsum({
	            count: Math.round( Math.random() * 20 ),
	            units: 'sentences'
	        });
    		description.push( '<p>' + lorem + '</p>' );
    	}
		return description.join( '' );
    }

    function _generate_images() {
    	let images = [];
    	let count = Math.round( Math.random() * 3 + 1 );
    	for ( let i = 0; i < count; i++ ) {
    		let index = Math.round( Math.random() * 8 + 1 );
    		images.push({
				full: 'http://' + location.hostname +
					location.pathname + 'wordpress/wp-content/uploads/placeholder_0' + index + '.jpg',
				small: 'http://' + location.hostname +
					location.pathname + 'wordpress/wp-content/uploads/placeholder_0' + index + '-300x300.jpg'
    		});
    	}
    	return images;
	}

	return {
		title: _generate_title(),
		tools: _generate_tools(),
		categories: _generate_categories(),
		id: _generate_id(),
		description: _generate_description(),
		date: _generate_date(),
		view_count: Math.round( Math.random() * 10 ),
		images: _generate_images(),
		is_placeholder: true,
		is_hidden: false
	};
}