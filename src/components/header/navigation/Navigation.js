var React = require('react');
var AppState = require('../../../stores/AppState');


var Navigation = React.createClass({

  getPagesState: function(){
    return AppState.getAllPosts();
  },

  getInitialState: function(){
    return {
      pages: []
    };
  },

  componentDidMount: function(){
    AppState.addChangeListener(this.handleChange);
    this.setState({
      pages: this.getPagesState()
    });
  },

  componentWillUnmount(){
    AppState.removeChangeListener(this.handleChange);
  },

  handleChange(pages){
    this.setState(this.getPagesState());
  },

  render: function(){

    var menuItems = this.state.pages.map(function(page){
      return(
        <li key={page.ID}>
          <a href="/{item}">
            {page.name}
          </a>
        </li>
      );
    });

    return(
      <nav className="main-nav">
        <ul>
          {menuItems}
        </ul>
      </nav>
    );
  }
});

module.exports = Navigation;
