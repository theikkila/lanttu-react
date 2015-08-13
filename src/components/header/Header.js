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
        <img src={require("../../style/images/joke-lan-logo.png")} id="top-banner"/>
        <h1>16.10.2015 - 18.10.2015</h1>
      </div>
    );
  }
});

module.exports = Header;
