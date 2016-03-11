import React from 'react';
import { Link } from 'react-router';
import FlipMove from 'react-flip-move';

import Dropdown from './Dropdown.jsx';

export default class Portfolio extends React.Component {
	constructor( props, context ) {
		super( props, context );
		this.handle_keypress = this.handle_keypress.bind( this );
		this.handle_change = this.handle_change.bind( this );
		this.get_controls = this.get_controls.bind( this );
		this.state = {
			category_filter: null,
            sort_options: [
                'Newest',
                'Oldest',
                'Most Viewed',
                'Least Viewed',
                'Title A-Z',
                'Title Z-A'
            ]
		};
	}
	handle_keypress( e ) {
		if ( e.charCode == 13 ) {
			e.target.blur();
		}		
	}
	handle_change( e ) {
		this.props.set_keyword_filter( e.target.value );
	}
	componentDidMount() {
		let { query } = this.props.location;
		if ( query.cat ) {
			this.props.set_category_filter( query.cat );
		}
		if ( query.search ) {
			this.props.set_keyword_filter( query.search );
		}
	}
	get_controls() {
		let { query } = this.props.location;
		return (
			<div className="portfolio_controls">
				<div className="row">
					<div className="col_4_desktop col_6_mobile">
						<Dropdown id="filter"
							options={this.props.categories}
							selected_option={query.cat ? query.cat : this.props.category_filter }
							on_change={this.props.set_category_filter}
							label="Filter By: "
						/>
					</div>
					<div className="col_4_desktop col_6_mobile">
						<Dropdown id="sort"
							options={this.state.sort_options}
							selected_option={this.props.sort_key}
							on_change={this.props.sort_projects}
							label="Sort By: "
						/>
					</div>
					<div className="col_4_desktop col_12_mobile">
						<input id="search"
							placeholder="Search"
							onKeyPress={this.handle_keypress}
							onChange={this.handle_change}
							defaultValue={query.search ? query.search : this.props.keyword_filter }
						/>
					</div>
				</div>
			</div>
		);
	}
	shouldComponentUpdate( next_props, next_state ) {
		return next_props.action != 'menu';
	}
	render() {
		if ( this.props.projects ) {
			var project_count = 0;
			var projects = this.props.projects.map( function( project, index ) {
				if ( !project.is_hidden ) project_count++;
				var views_text = 'No Views';
				if ( project.view_count == 1 ) {
					views_text = '1 View';
				} else if ( project.view_count > 1 ) {
					views_text = project.view_count + ' Views';
				}
				return (
					<div key={project.id} className={project.is_hidden ? 'grid__cell is_hidden' : 'grid__cell'}>
						<Link to={'/project/' + project.id}>
							<div className="project_small">
								<img className="project_small__image" src={project.images[ 0 ].small} />
								<div className="project_small__image__overlay">
									<h4 className="project_small__title">{project.title}</h4>
									<h4 className="project_small__view_count">{views_text}</h4>
									<h4 className="project_small__date">{project.date.formatted}</h4>
									<div className="project_small__button">Explore</div>
								</div>
							</div>
						</Link>
					</div>
				);
			});
			if ( project_count > 0 ) {
				return (
					<div className="page" id="portfolio">
						<h2 className="page__title">Portfolio</h2>
						{this.get_controls()}
						<div className="grid">
							<FlipMove easing="ease" staggerDurationBy="10" staggerDelayBy="2" className="projects_wrapper">
								{projects}
								<div className="grid__cell">
									<a href="#" onClick={this.props.generate_placeholders.bind( this )}>
										<div className="generate_placeholders">
											<div className="generate_placeholders__content">
												<h2 className="generate_placeholders__title">Generate<br />Placeholders</h2>
											</div>
										</div>
									</a>
								</div>
								<div className="grid__cell">
									<a href="#" onClick={this.props.remove_placeholders.bind( this )}>
										<div className="generate_placeholders generate_placeholders--remove">
											<div className="generate_placeholders__content">
												<h2 className="generate_placeholders__title">Remove<br />Placeholders</h2>
											</div>
										</div>
									</a>
								</div>
							</FlipMove>
						</div>
					</div>
				);
			} else {
				return (
					<div className="page" id="portfolio">
						<h2 className="page__title">Portfolio</h2>
						{this.get_controls()}
						<h3 className="no_projects_found">No projects found.</h3>
					</div>
				);
			}
		} else {
			return (
				<div className="page" id="portfolio">
					<h3 className="no_projects_found">Loading...</h3>
				</div>
			);
		}
	}
}