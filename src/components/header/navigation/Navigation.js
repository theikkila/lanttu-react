var React = require('react');
var superagent = require('superagent');
var AppState = require('../../../stores/AppState');
var cs = require('../../../dispatcher/constants');


var Navigation = React.createClass({

  getInitialState: AppState.getNavigation,
  componentDidMount() {
    AppState.addChangeListener(this.handleChange);
  },
  componentWillUnmount() {
    AppState.removeChangeListener(this.handleChange);
  },
  handleChange() {
    this.setState(AppState.getNavigation());
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
