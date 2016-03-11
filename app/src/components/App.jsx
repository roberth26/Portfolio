import React from 'react';
import 'es6-promise';
//import 'whatwg-fetch';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import NavDrawer from './NavDrawer.jsx';
import generate_placeholder from '../services/generate_placeholder.js';

export default class App extends React.Component {
	constructor( props ) {
		super( props );
		this.sort_projects = this.sort_projects.bind( this );
		this.filter_projects = this.filter_projects.bind( this );
        this._get_filtered_projects = this._get_filtered_projects.bind( this );
		this.set_keyword_filter = this.set_keyword_filter.bind( this );
		this.set_category_filter = this.set_category_filter.bind( this );
		this.toggle_menu = this.toggle_menu.bind( this );
        this.get_project_by_id = this.get_project_by_id.bind( this );
        this.get_previous_project_id = this.get_previous_project_id.bind( this );
        this.get_next_project_id = this.get_next_project_id.bind( this );
        this.generate_placeholders = this.generate_placeholders.bind( this );
        this.remove_placeholders = this.remove_placeholders.bind( this );
		this.state = {
			menu_is_open: false,
			keyword_filter: '',
			category_filter: 'All',
			sort_key: 'Newest',
            action: null
        };
	}
    componentDidMount() {
        /*
		fetch( 'wordpress/' ).then( function( data ) {
			return data.json();
		}).then( function( data ) {
			console.log( data );
			this.setState( Object.assign( this.state, data ) );
		}.bind( this ));
        */
        window.app_data.projects = window.app_data.projects.sort( function( a, b ) {
            return b.date.unformatted - a.date.unformatted;
        });
		this.setState( Object.assign( {}, this.state, window.app_data, { action: 'load' } ), function() {
            delete window.app_data;
        }.bind( this ));
    }
    toggle_menu() {
    	this.setState({
    		menu_is_open: !this.state.menu_is_open,
            action: 'menu'
    	});
    }
    sort_projects( sort_key ) {
        this.setState({
        	sort_key: sort_key,
            projects: this.state.projects.sort( function( a, b ) {
            	switch( sort_key ) {
            		case 'Newest':
            			return b.date.unformatted - a.date.unformatted;
            		case 'Oldest':
            			return a.date.unformatted - b.date.unformatted;
                    case 'Most Viewed':
                        return b.view_count - a.view_count;
                    case 'Least Viewed':
                        return a.view_count - b.view_count;
            		case 'Title A-Z':
            			return a.title.toLowerCase().localeCompare( b.title.toLowerCase() );
            		case 'Title Z-A':
            			return b.title.toLowerCase().localeCompare( a.title.toLowerCase() );
            		return 1;
            	}
	    	}),
            action: 'sort'
        });
    }
    get_project_by_id( id ) {
        if ( this.state.projects ) {
            for ( var i = 0; i < this.state.projects.length; i++ ) {
                var project = this.state.projects[ i ];
                if ( project.id == id ) {
                    return project;
                }
            }
        }
        return null;
    }
    set_keyword_filter( keyword ) {
    	this.setState({
    		keyword_filter: keyword,
            action: 'filter'
    	}, this.filter_projects );
    }
    set_category_filter( category ) {
    	this.setState({
    		category_filter: category,
            action: 'filter'
    	}, this.filter_projects );
    }
    _get_filtered_projects() {
        var new_projects = this.state.projects.slice();
        for ( var i = 0; i < new_projects.length; i++ ) {
            var project = new_projects[ i ];
            project.is_hidden = true; // reset
            if ( this.state.category_filter == 'All' || project.categories.indexOf( this.state.category_filter ) > -1 ) {
                let proj = Object.assign( {}, project );
                proj.images = null; // dont search through images
                if ( this.state.keyword_filter == '' || JSON.stringify( proj ).toLowerCase().indexOf( this.state.keyword_filter.toLowerCase() ) > -1 ) {
                    project.is_hidden = false;
                }
            }
        }
        return new_projects;
    }
    filter_projects() {
        this.setState({
            projects: this._get_filtered_projects(),
            action: 'projects'
        });
    }
    get_previous_project_id( id ) {
        if ( this.state.projects ) {
            let index = null;
            for ( var i = 0; i < this.state.projects.length; i++ ) {
                if ( this.state.projects[ i ].id == id ) {
                    index = i;
                    break;
                }
            }
            if ( index <= 0 ) {
                index = this.state.projects.length - 1;
            } else {
                index--;
            }
            return this.state.projects[ index ].id;
        } else {
            return null;
        }
    }
    get_next_project_id( id ) {
        if ( this.state.projects ) {
            let index = null;
            for ( var i = 0; i < this.state.projects.length; i++ ) {
                if ( this.state.projects[ i ].id == id ) {
                    index = i;
                    break;
                }
            }
            if ( index >= this.state.projects.length - 1 ) {
                index = 0
            } else {
                index++;
            }
            return this.state.projects[ index ].id;
        } else {
            return null;
        }
    }
    generate_placeholders( event ) {
        if ( event ) event.preventDefault();
        var projects = this.state.projects.slice();
        var count = Math.floor( Math.random() * 20 + 5 );
        for ( var i = 0; i < count; i++ ) {
            projects.push( generate_placeholder( projects, this.state.categories ) );
        }
        this.setState({
            projects: projects
        }, function() {
            this.filter_projects();
            this.sort_projects( this.state.sort_key );
        }.bind( this ));
    }
    remove_placeholders( event ) {
        if ( event ) event.preventDefault();
        let projects = this.state.projects.slice().filter( function( project ) {
            return !project.is_placeholder;
        });
        this.setState({
            projects: projects
        });
    }
	render() {
        var footer = <Footer {...this.state} />;
        var header = (
            <Header {...this.state}
                toggle_menu={this.toggle_menu}
                current_project={this.state.current_project}
                location={this.props.location}
            />
        );
        if ( this.props.location.pathname.indexOf( '/landing' ) > -1 ) {
            footer = null;
            header = null;
        }
		return (
			<div className={this.state.menu_is_open ? 'app menu_is_open' : 'app'}>
                <NavDrawer
                    toggle_menu={this.toggle_menu}
                    social_menu={this.state.social_menu}
                />
                {header}
                <div className="app__wrapper">
    		        <ReactCSSTransitionGroup
                        component="React.DOM.div"
                        transitionName="page_transition"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
    				>
    					{
    						React.cloneElement(
    							this.props.children, 
    							{
                                    key: this.props.location.pathname,
                                    set_category_filter: this.set_category_filter,
                                    set_keyword_filter: this.set_keyword_filter,
                                    projects: this.state.projects,
                                    about: this.state.about,
                                    category_filter: this.state.category_filter,
                                    sort_key: this.state.sort_key,
                                    sort_projects: this.sort_projects,
                                    categories: this.state.categories,
                                    get_next_project_id: this.get_next_project_id,
                                    get_previous_project_id: this.get_previous_project_id,
                                    action: this.state.action,
                                    demo_reel: this.state.demo_reel,
                                    social_menu: this.state.social_menu,
                                    generate_placeholders: this.generate_placeholders,
                                    remove_placeholders: this.remove_placeholders
                                }
    						)
    					}
    				</ReactCSSTransitionGroup>
                    {footer}
                </div>
			</div>
		);
	}
}