var React = require('react');
var Header = require('./header/Header');
var Navigation = require('./navigation/Navigation');
var View = require('./views/View');
var AppState = require('../stores/AppState');


var Router = require('director').Router;

var index = function(){
  AppState.router.set('view', 'posts');
  AppState.router.set('navid', 24);
  ga('send', 'pageview', '/etusivu');
};

var typeroute = function (view, id) {
  AppState.router.set({view: view});
  AppState.router.set({navid: id});
  ga('send', 'pageview', id);
};

var routes = {
  '/': index,
  '/:view/:id': typeroute
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
