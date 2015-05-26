var React = require('react');

var Hello = require('./Hello');
var Navigation = require('./navigation/Navigation');



var App = React.createClass({
  render(){
    var items=["Konpot", "Tissit"]
    return (

      <div>
          <Navigation items={items} />
          <Hello name="Matias" />
      </div>
    );
  }
});

module.exports = App;
