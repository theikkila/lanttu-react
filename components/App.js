var React = require('react');
var Hello = require('./Hello');
var Header = require('./header/Header');
var PageCalculator = require('./PageCalculator');
var PageStore = require('../stores/PageStore');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var cs = require('../dispatcher/constants');

function getPagesState () {
    return {
        allPages: PageStore.getAll()
    }
}

var App = React.createClass({
    getInitialState() {
        return getPagesState();
    },
	componentDidMount() {
        PageStore.addChangeListener(this.handleChange);
    },
    componentWillUnmount() {
        PageStore.removeChangeListener(this.handleChange);
	},
	handleChange(pages){
		this.setState(getPagesState());
	},
	createNewItem() {
		AppDispatcher.dispatch({
        	type: cs.CREATE,
        	data: { slug: "testi", name: 'Marco', content: "adasdasdadasdasd" } // example data
    	});
	},
  render: function(){
  	var rpages = this.state.allPages.map(function (page) {
  		return <li>{page.name} <pre>{page.slug}</pre></li>
  	});

    return(
      <body>
        <Header />
        <div>
        	<button onClick={ this.createNewItem } >Paina</button><PageCalculator />
            <Hello name="Matias" />
            { rpages }
        </div>
      </body>
    );
  }
});

module.exports = App;
