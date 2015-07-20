var React  = require('react');
var Post = require('./Post');
var AppState = require('../../../stores/AppState');


var Posts = React.createClass({
	getInitialState() {
		return {posts: AppState.posts.toJSON()}; 
	},
	componentDidMount() {
		AppState.posts.on('add', this.handleChange);
	},
	handleChange(pages){
		this.setState({posts: AppState.posts.toJSON()});
	},
	render: function(){

		var rposts = this.state.posts.map(function (post) {
			return <Post post={post} />
		});

		return <div className="posts content-container col-md-9 col-xs-12">{rposts}</div>
	}
});

module.exports = Posts;
