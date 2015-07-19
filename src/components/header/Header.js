var React  = require('react');
var Navigation = require('./navigation/Navigation');

var Header = React.createClass({

  render: function(){
    return(
      <div id="header" className="col-xs-12 col-md-3">
        <h1>Header</h1>
        <Navigation />
      </div>
    );
  }
});

module.exports = Header;
