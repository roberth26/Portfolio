import React from 'react';
import { Link } from 'react-router';
import 'whatwg-fetch';

import Header from './Header.jsx';
import Slider from './Slider.jsx';

export default class Project extends React.Component {
	constructor( props, context ) {
		super( props, context );
		this.get_project_by_id = this.get_project_by_id.bind( this );
		this.render_meta = this.render_meta.bind( this );
	}
    get_project_by_id( id ) {
        if ( this.props.projects ) {
            for ( var i = 0; i < this.props.projects.length; i++ ) {
                var project = this.props.projects[ i ];
                if ( project.id == id ) {
                    return project;
                }
            }
        }
        return null;
    }
    componentDidUpdate() {
    	if ( this.props.params.id >= 1000 ) {
    		//console.log( this.props );
    		//this.props.history.push( '/portfolio' );
    	} else {
			fetch( 'count_project_views.php', {
				method: 'post',
				body: JSON.stringify( { id: this.props.params.id } )
			}).then( function( response ) {
				return response.text();
			}).then( function( text ) {
				if ( text != '' ) {
					console.log( text );
				}
			}.bind ( this ));
		}
	}
	render_meta( project, className ) {
		return (
			<div className={className ? 'project_full__meta ' + className : 'project_full__meta' }>
				<div className="meta">
					<h3 className="meta__title">Tools</h3>
					<ul className="meta__list">
						{project.tools.map( function( tool, index ) {
							return (
								<li key={index} className="meta__list__item">
									<Link to={'/portfolio'} query={{search: tool}}>{tool}</Link>
								</li>
							);
						}.bind( this ))}
					</ul>
				</div>
				<div className="meta meta--last">
					<h3 className="meta__title">Categories</h3>
					<ul className="meta__list">
						{project.categories.map( function( category, index ) {
							return (
								<li key={index} className="meta__list__item">
									<Link to={'/portfolio'} query={{cat: category }}>{category}</Link>
								</li>
							);
						}.bind( this ))}
					</ul>
				</div>
			</div>
		);
	}
	render() {
		var project = this.get_project_by_id( this.props.params.id );
		var previous_project_id = this.props.get_previous_project_id( this.props.params.id );
		var next_project_id = this.props.get_next_project_id( this.props.params.id );
		var views = null;
		if ( project ) {
			var views = project.view_count + ' Views';
			if ( project.view_count == 0 ) { views = 'No Views Yet' }
			if ( project.view_count == 1 ) { views = '1 View' }
			return (
				<div className="page project">
					<div className="project_full">
						<Slider className="project_full__slider" images={project.images} />
						<div className="project_full__container">
							<div className="project_full__nav">
								<div className="row">
									<div className="col_6_mobile">
										<Link to={'/project/' + previous_project_id}
											className="project_full__nav__item project_full__nav__item--prev">
											<svg className="project_full__nav__item__icon" viewBox="0 0 20 32">
												<path d="M3.2,32c-0.8,0-1.6-0.3-2.2-0.9c-1.2-1.2-1.2-3.3,0-4.5L11.2,16L0.9,5.4C0.3,4.8,0,4,0,3.2s0.3-1.7,0.9-2.3
													C1.5,0.3,2.3,0,3.1,0s1.6,0.3,2.2,0.9L20,16l-14.6,15C4.8,31.7,4,32,3.2,32z" />
											</svg>
											<span className="project_full__nav__item__text">Prev Project</span>
										</Link>
									</div>
									<div className="col_6_mobile">
										<Link to={'/project/' + next_project_id}
											className="project_full__nav__item project_full__nav__item--next">
											<span className="project_full__nav__item__text">Next Project</span>
											<svg className="project_full__nav__item__icon" viewBox="0 0 20 32">
												<path d="M3.2,32c-0.8,0-1.6-0.3-2.2-0.9c-1.2-1.2-1.2-3.3,0-4.5L11.2,16L0.9,5.4C0.3,4.8,0,4,0,3.2s0.3-1.7,0.9-2.3
													C1.5,0.3,2.3,0,3.1,0s1.6,0.3,2.2,0.9L20,16l-14.6,15C4.8,31.7,4,32,3.2,32z" />
											</svg>
										</Link>
									</div>
								</div>
							</div>
							{this.render_meta( project )}
							<div className="project_full__content">
								<h2 className="project_full__title">{project.title}</h2>
								<h3 className="project_full__date">{project.date.formatted}</h3>
								<h3 className="project_full__views">{views}</h3>								
								{this.render_meta( project, 'mobile' )}
								<div className="project_full__description" dangerouslySetInnerHTML={{__html: project.description}} />
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return <h2>Loading...</h2>;
		}
	}
}