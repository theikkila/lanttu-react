var React  = require('react');

var Post = React.createClass({
	render: function(){
		var post = this.props.post;
		var content = post.content.replace(/(http(s?):\/\/)?(www.)?youtube.com\/watch\?v=(.*)/g, function (match, prot, ssl, www, video){
			return React.renderToStaticMarkup(<Youtube url={video} />);
		});
		var content_with_br = content.split(/\r\n|\n|\r/).map(function (row) {
			var trimmed = row.trim();
			if (trimmed[trimmed.length-1] != '>') { row = row + "<br>";}
			return row;
		}).join('');

		return  <div className="post" key={post.ID}>
		<h1>{post.title}</h1>
		<div dangerouslySetInnerHTML={{__html: content_with_br}}></div>
		</div>
	}
});

module.exports = Post;
