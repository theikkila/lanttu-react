var React = require('react');
var superagent = require('superagent');
var AppState = require('../../stores/AppState');
var cs = require('../../dispatcher/constants');


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
    AppState.navigation.on('add', this.handleChange);
    AppState.router.on('change', this.handleChange);
  },
  handleChange() {
    this.setState(stateGet());
  },
  render: function(){
    var self = this;
    console.log(self.state);
    var menuItems = this.state.nav.map(function(item){
      var selected_class = item.object_id == self.state.router.navid ? 'selected' : 'unselected';
      return(
        <li key={item.ID} className={selected_class}>
          <a href={"#/" + item.type + "/" + item.name} key={item.id}>
            {item.title}
          </a>
        </li>
      );
    });

    return(
      <nav className="main-nav col-xs-12 col-md-3">
        <ul>
          {menuItems}
        </ul>
      </nav>
    );
  }
});

module.exports = Navigation;
