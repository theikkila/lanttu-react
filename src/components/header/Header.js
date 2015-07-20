var React  = require('react');
var AppState = require('../../stores/AppState');


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
        <h1>{this.state.name} <small>{this.state.description}</small></h1>
      </div>
    );
  }
});

module.exports = Header;
