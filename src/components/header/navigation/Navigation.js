var React = require('react');
var superagent = require('superagent');
var AppState = require('../../../stores/AppState');
var cs = require('../../../dispatcher/constants');


var stateGet = function () {
  return {
            nav: AppState.navigation.toJSON(),
            router: AppState.router.toJSON()
           };
}

var Navigation = React.createClass({

  getInitialState: function() {
    return stateGet();
  },
  componentDidMount() {
    AppState.navigation.on('change', this.handleChange);
    AppState.router.on('change', this.handleChange);
  },
  handleChange() {
    this.setState(stateGet());
  },
  render: function(){
    var self = this;
    var menuItems = this.state.nav.items.map(function(item){
      var selected_class = item.ID == self.state.router.navid ? 'selected' : 'unselected';
      return(
        <li key={item.ID} className={selected_class}>
          <a href={"#/page/" + item.ID} key={item.ID}>
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
