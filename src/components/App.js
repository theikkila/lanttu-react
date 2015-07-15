var React = require('react');
var Header = require('./header/Header');
var AppState = require('../stores/AppState');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var cs = require('../dispatcher/constants');

function getPagesState () {
  return {
    allPosts: AppState.getAllPosts()
  }
}

var App = React.createClass({
  getInitialState() {
    return getPagesState();
  },
  componentDidMount() {
    AppState.addChangeListener(this.handleChange);
  },
  componentWillUnmount() {
    AppState.removeChangeListener(this.handleChange);
  },
  handleChange(pages){
    this.setState(getPagesState());
  },
  createNewItem() {
    AppDispatcher.dispatch({
     type: cs.CREATEPOST,
        	data: { slug: "testi", name: 'Marco', content: "adasdasdadasdasd" } // example data
        });
  },
  render: function(){
  	var rpages = this.state.allPosts.map(function (page) {
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
