var React = require('react');
var superagent = require('superagent');
var cs = require('../../../dispatcher/constants');


var Navigation = React.createClass({

  getInitialState: function(){
    return {
      items: []
    };
  },

  componentWillMount: function(){
    var self = this;

    superagent.get(cs.JOKELAN_JSON_API + '/menus/2').end(function(err, res){
      if(err){
        console.log('ERROR: ' + err);
      }
      self.setState(res.body);
    });
  },

  render: function(){
    var menuItems = this.state.items.map(function(item){
      return(
        <li key={item.ID}>
          <a href={"/#/page/" + item.title} key={item.ID}>
            {item.title}
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
