var React = require('react');
var Header = require('./header/Header');
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
    return {posts: AppState.posts.toJSON()}; 
  },
  componentDidMount() {
    AppState.posts.on('add', this.handleChange);
  },
  handleChange(pages){
    this.setState({posts: AppState.posts.toJSON()});
  },
  createNewItem() {
    AppState.posts.add({ slug: "testi", name: 'Marco', content: "adasdasdadasdasd" });
  },
  render: function(){
  	var rpages = this.state.posts.map(function (page) {
  		return <div key={page.ID}>
      <h1>{page.name}</h1> <pre>{page.slug}</pre>
      <div dangerouslySetInnerHTML={{__html: page.content}}></div>
      </div>
    });

    return(
      <body>
      <Header />
      <div>
      <button onClick={ this.createNewItem } >Paina</button>
      { rpages }
      </div>
      </body>
      );
  }
});

module.exports = App;
