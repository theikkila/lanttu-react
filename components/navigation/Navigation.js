var React = require('react');
var MenuIcon = require('./MenuIcon');

var Navigation = React.createClass({

  render: function(){

    var menuItems = this.props.items.map(function(item){
      return(
        <li>
          <a href="/{item}">
            {item}
          </a>
        </li>
      );
    });

    return(
      <nav className="main-nav">
        <ul>
          <MenuIcon />
          {menuItems}
        </ul>
      </nav>
    );
  }
});

module.exports = Navigation;
