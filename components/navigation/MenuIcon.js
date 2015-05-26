var React = require('react');

var MenuIcon = React.createClass({

  render: function(){
    return(
      <li>
        <a href="/">
          <img src="/assets/menuIcon.png" >
        </a>
      </li>
    );
  }
});

module.exports = MenuIcon;
