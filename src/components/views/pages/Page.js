var React  = require('react');
var AppState = require('../../../stores/AppState');


var Page = React.createClass({
	componentDidMount() {
		var self = this;
		AppState.pages.on('add', function () {
			self.forceUpdate();	
		});
	},
	render: function(){
		var obj = AppState.pages.findWhere({ID: parseInt(this.props.objectid)})
		var page = obj ? obj.toJSON() : {title: "Loading...", content:"loading..."};
		return <div className="page content-container animated fadeIn col-md-9 col-xs-12">
					<h1>{page.title}</h1>
					<div dangerouslySetInnerHTML={{__html: page.content}}></div>
				</div>
	}
});

module.exports = Page;



