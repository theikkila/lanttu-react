var React  = require('react');
var AppState = require('../../stores/AppState');
var CONSTANTS = require('../../dispatcher/constants');


var Header = React.createClass({
  getInitialState () {
    return AppState.app.toJSON();
  },
  componentDidMount () {
    AppState.app.on('change', this.handleChange);
  },
  handleChange () {
    this.setState(AppState.app.toJSON());
  },
  render (){
    return(
      <div id="header" className="col-xs-12">
        <img src="../src/style/images/joke-lan-logo.png" id="top-banner"/>
        <h1><small>{this.state.description}</small></h1>
      </div>
    );
  }
});

module.exports = Header;
