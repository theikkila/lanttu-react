var React = require('react');
var superagent = require('superagent');
var AppState = require('../../stores/AppState');
var cs = require('../../dispatcher/constants');


var stateGet = function () {
  return {
            nav: AppState.navigation.toJSON(),
            navshow: false,
            router: AppState.router.toJSON()
           };
}

var Navigation = React.createClass({

  getInitialState: function() {
    return stateGet();
  },
  componentDidMount() {
    AppState.navigation.on('add', this.handleChange);
    AppState.router.on('change', this.handleChange);
  },
  handleChange() {
    this.setState(stateGet());
  },
  handleNavToggle() {
    var state = this.state;
    state.navshow = !state.navshow;
    this.setState(state);
  },
  render: function(){
    var self = this;
    var menuItems = this.state.nav.map(function(item){
      var selected_class = item.name == self.state.router.navid ? 'selected' : 'unselected';
      return(
        <li key={item.ID} className={selected_class}>
          <a href={"#/" + item.type + "/" + item.name} key={item.id}>
            {item.title}
          </a>
        </li>
      );
    });

    var nav_classes = "main-nav col-xs-12 col-md-3";
    if (!this.state.navshow) {
      nav_classes += " menu-hidden";
    }

    return(
      <nav className={nav_classes}>
        <ul>
          {menuItems}
        </ul>
        <button className="menu-btn" onClick={this.handleNavToggle}>
          <img src={require("../../style/images/joke-lan-logo-small.png")} className="nav-logo"/>
          <div className="right">
          <div className="mask-icon-white"></div>
          </div>
        </button>
      </nav>
    );
  }
});

module.exports = Navigation;
