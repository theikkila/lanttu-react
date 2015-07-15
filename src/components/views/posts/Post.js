var React  = require('react');

var Post = React.createClass({
	render: function(){
		var post = this.props.post;
		return  <div key={post.ID}>
				 <h1>{post.name}</h1>
				 <div dangerouslySetInnerHTML={{__html: post.content}}></div>
			    </div>
	}
});

module.exports = Post;
