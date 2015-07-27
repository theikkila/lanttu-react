var React = require('react');
var superagent = require('superagent');
var AppState = require('../../stores/AppState');
var cs = require('../../dispatcher/constants');


var stateGet = function () {
  return {
            nav: AppState.navigation.toJSON(),
            router: AppState.router.toJSON(),
            app: AppState.app.toJSON()
           };
}

var Navigation = React.createClass({

  getInitialState: function() {
    return stateGet();
  },
  componentDidMount() {
    AppState.navigation.on('change', this.handleChange);
    AppState.router.on('change', this.handleChange);
    AppState.app.on('change', this.handleChange);
  },
  handleChange() {
    this.setState(stateGet());
  },
  render: function(){
    var self = this;
    var menuItems = this.state.nav.items.map(function(item){
      var slug = item.url.replace(self.state.app.URL, '').replace(/\//g, '');
      var selected_class = slug == self.state.router.navid ? 'selected' : 'unselected';
      return(
        <li key={item.ID} className={selected_class}>
          <a href={"#/" + item.object + "/" + slug} key={item.ID}>
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
