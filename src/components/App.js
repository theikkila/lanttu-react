var React = require('react');
var Header = require('./header/Header');
var View = require('./views/View');
var AppState = require('../stores/AppState');
var AppDispatcher = require('../dispatcher/AppDispatcher');


var Router = require('director').Router;

var index = function(){
  AppState.router.set('view', 'posts');
  AppState.router.set('navid', 24);
};

var typeroute = function (view, id) {
  AppState.router.set({view: view});
  AppState.router.set({navid: id});
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
      <body>
      <Header />
      <View mode={this.state.view} objectid={this.state.navid} />
      <div>
      <button onClick={ this.createNewItem } >Paina</button>
      </div>
      </body>
      );
  }
});

module.exports = App;
