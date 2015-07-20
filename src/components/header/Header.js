var React  = require('react');
var Navigation = require('./navigation/Navigation');

var Header = React.createClass({

  render: function(){
    return(
      <div id="header">
      <h1>Header</h1>
        <Navigation />
      </div>
    );
  }
});

module.exports = Header;
