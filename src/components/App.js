var React = require('react');
var Header = require('./header/Header');
var Navigation = require('./navigation/Navigation');
var View = require('./views/View');
var AppState = require('../stores/AppState');
var AppDispatcher = require('../dispatcher/AppDispatcher');


var Router = require('director').Router;

var index = function(){
  AppState.router.set('view', 'posts');
  AppState.router.set('navid', 24);
};

var typeroute = function (path) {
  var parts = path.split('/');
  console.log(parts);
  AppState.router.set({view: parts[0]});
  AppState.router.set({navid: parts[1]});
};

var routes = {
  '/': index,
  '/(.*)': typeroute,
};

var router = Router(routes);
router.init();


var App = React.createClass({
  getInitialState() {
    return AppState.router.toJSON(); 
  },
  componentDidMount() {
    AppState.router.on('change', this.handleChange);
  },
  handleChange(pages){
    this.setState(AppState.router.toJSON());
  },
  render: function(){

    return(
        <div className="container-fluid">
        <div id="grain"></div>
          <div className="row-fluid">
            <Header />
          </div>
          <div className="row-fluid">
            <Navigation />
            <View vmode={this.state.view} objectid={this.state.navid} />
          </div>
        </div>
      );
  }
});

module.exports = App;
