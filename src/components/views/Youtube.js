var React  = require('react');

var YouTube = React.createClass({
	render: function(){
		var url = "https://www.youtube.com/embed/" + this.props.url;
		return  <div className="video-container">
					<iframe src={url} frameBorder="0" width="560" height="315"></iframe>
				</div>
	}
});

module.exports = YouTube;


