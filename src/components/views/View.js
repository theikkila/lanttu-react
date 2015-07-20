var React  = require('react');
var Page = require('./pages/Page');
var Posts = require('./posts/Posts');

var View = React.createClass({
  render: function(){
  		
  		if (this.props.vmode == 'page') {
  			return <Page objectid={this.props.objectid} />
  		} else {
  			return <Posts />
  		}
  }
});

module.exports = View;