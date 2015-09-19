var React = require('react');
var superagent = require('superagent');
var AppState = require('../../stores/AppState');
var cs = require('../../dispatcher/constants');
var Carousel = require('../../../node_modules/react-responsive-carousel/components/Carousel');

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

    var images = [
      {'url': 'http://s15.joke-lan.net/wp-content/uploads/2015/07/Teho_logos_CMYK-01.jpg' },
      {'url': 'http://s15.joke-lan.net/wp-content/uploads/2013/07/estrella.png'}
    ];

    var divStyle = { width: '400px'};

    var sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      SlidesToShow: 1,
      SlidesToScroll: 1
    };

    return(
      <div>
        <nav className={nav_classes}>
          <ul>
            {menuItems}
          </ul>
          <button className="menu-btn" onClick={this.handleNavToggle}>
            <span className="img-vertical-center-helper">
              <img src={require("../../style/images/joke-lan-logo-small.png")} className="nav-logo"/>
              <span id="site-header-date">16.10.2015 - 18.10.2015</span>
              <div className="right">
                <div className="mask-icon-white right"></div>
              </div>
            </span>
          </button>
        </nav>

        <div style={divStyle}>
          <h2>Karuselli!</h2>
          <Carousel
              type="slider"
              items={ images }
              showControls={true}
              showStatus={true} />
        </div>
      </div>
    );
  }
});

module.exports = Navigation;
