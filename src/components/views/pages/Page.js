var React  = require('react');
var AppState = require('../../../stores/AppState');
var Youtube = require('../Youtube');


var Page = React.createClass({
	componentDidMount() {
		var self = this;
		AppState.pages.on('add', function () {
			self.forceUpdate();	
		});
	},
	render: function(){
		var obj = AppState.pages.findWhere({name: this.props.objectid});

		var page = obj ? obj.toJSON() : {title: "Loading...", content:"loading..."};
		console.log(page.content);
		var content = page.content.replace(/(http(s?):\/\/)?(www.)?youtube.com\/watch\?v=(.*)/g, function (match, prot, ssl, www, video){
			return React.renderToStaticMarkup(<Youtube url={video} />);
		});
		var content_with_br = content.split(/\r\n|\n|\r/).map(function (row) {
			var trimmed = row.trim();
			if (trimmed[trimmed.length-1] != '>') { row = row + "<br>";}
			return row;
		}).join('');

		return <div className="page content-container animated fadeIn col-md-9 col-xs-12">
					<h1>{page.title}</h1>
					<div dangerouslySetInnerHTML={{__html: content_with_br}}></div>
				</div>
	}
});

module.exports = Page;



