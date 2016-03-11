import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, IndexRedirect } from 'react-router';

import App from './components/App.jsx';
import About from './components/About.jsx';
import DemoReel from './components/DemoReel.jsx';
import Portfolio from './components/Portfolio.jsx';
import Contact from './components/Contact.jsx';
import Landing from './components/Landing.jsx';
import Project from './components/Project.jsx';

ReactDOM.render(
	<Router onUpdate={() => window.scrollTo( 0, 0 )} history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRedirect to="/landing" />
			<Route path="portfolio" component={Portfolio} />
			<Route path="project/:id" component={Project} />
			<Route path="about" component={About} />
			<Route path="demo_reel" component={DemoReel} />
			<Route path="landing" component={Landing} />
			<Route path="contact" component={Contact} />
		</Route>
	</Router>,
	document.getElementById( 'app_container' )
);