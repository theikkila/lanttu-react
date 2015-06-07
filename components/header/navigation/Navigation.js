var React = require('react');
var PageStore = require('../../../stores/PageStore');


var Navigation = React.createClass({

  getPagesState: function(){
    return PageStore.getAll();
  },

  getInitialState: function(){
    return {
      pages: []
    };
  },

  componentDidMount: function(){
    PageStore.addChangeListener(this.handleChange);
    this.state.pages = this.getPagesState();
  },

  componentWillUnmount(){
    PageStore.removeChangeListener(this.handleChange);
  },

  handleChange(pages){
    this.setState(this.getPagesState());
  },

  render: function(){

    var menuItems = this.state.pages.map(function(page){
      return(
        <li key={page.id}>
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
