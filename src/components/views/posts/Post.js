var React  = require('react');

var Post = React.createClass({
	render: function(){
		var post = this.props.post;
		return  <div className="post" key={post.ID}>
				 <h1>{post.title}</h1>
				 <div dangerouslySetInnerHTML={{__html: post.content}}></div>
			    </div>
	}
});

module.exports = Post;
