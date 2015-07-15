var React = require('react');
var superagent = require('superagent');
var cs = require('../../../dispatcher/constants');


var Navigation = React.createClass({

  getPagesState: function(){
    console.log(cs);
    console.log(cs.JOKELAN_JSON_API + '/menus/2');

    superagent.get(cs.JOKELAN_JSON_API + '/menus/2').end(function(err, res){
      if(err){
        console.log('ERROR: ' + err);
      }
      console.log(res);
      return res;
    });
  },

  getInitialState: function(){
    return {
      pages: []
    };
  },

  componentDidMount: function(){
    this.setState({
      pages: this.getPagesState()
    });
    console.log(this.state.pages);
  },

  componentWillUnmount(){
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
