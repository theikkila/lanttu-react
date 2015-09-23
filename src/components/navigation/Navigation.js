var React = require('react');
var superagent = require('superagent');
var AppState = require('../../stores/AppState');
var cs = require('../../dispatcher/constants');
var Slider = require('react-slick');
var Carousel = require('react-responsive-carousel').Carousel;


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

    var nav_classes = "main-nav";
    if (!this.state.navshow) {
      nav_classes += " menu-hidden";
    }

    var images = [
      {'url': 'http://s15.joke-lan.net/wp-content/uploads/2015/07/Teho_logos_CMYK-01.jpg' },
      {'url': 'http://s15.joke-lan.net/wp-content/uploads/2013/07/estrella.png'}
    ];

    var sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      SlidesToShow: 1,
      SlidesToScroll: 1
    };

    // <Slider {...sliderSettings}>
    //     <div><h3>1</h3></div>
    //     <div><h3>2</h3></div>
    //     <div><h3>3</h3></div>
    //     <div><h3>4</h3></div>
    //     <div><h3>5</h3></div>
    //     <div><h3>6</h3></div>
    // </Slider>

    return(
      <div className="col-xs-12 col-md-3">
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

        <Carousel
            className="carousel"
            type="slider"
            items={ images }
            showControls={true}
            showStatus={true} />

      </div>
    );
  }
});

module.exports = Navigation;
