var React  = require('react');

var Post = React.createClass({
	render: function(){
		var post = this.props.post;
		var content_with_br = post.content.replace(/(?:\r\n|\r|\n)/g, '<br />');
		return  <div className="post" key={post.ID}>
				 <h1>{post.title}</h1>
				 <div dangerouslySetInnerHTML={{__html: content_with_br}}></div>
			    </div>
	}
});

module.exports = Post;
