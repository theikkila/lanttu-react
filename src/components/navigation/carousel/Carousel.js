var React = require('react');

var Carousel = React.createClass({
      getInitialState: function() {
        return {
            images: [
                {
                    src         : 'http://s15.joke-lan.net/wp-content/uploads/2015/09/Jimms_text_black-300x200.png',
                    name        : 'Jimm&apos;s',
                    websiteUrl  : 'http://www.jimms.fi/'
                },
                {
                    src         : 'http://s15.joke-lan.net/wp-content/uploads/2015/07/Teho_logos_CMYK-01-239x300.jpg',
                    name        : 'Teho',
                    websiteUrl  : 'https://www.facebook.com/LisaaTEHOa/timeline/'
                }
            ],
            imgNo: 0
        };
    },
    componentDidMount: function() {
        this.timer = setInterval(this.tick, 8000);
    },
    componentWillUnmount: function() {
        clearInterval(this.timer);
    },
    render: function(){

        var image = this.state.images[this.state.imgNo];

        return(
            <div id="carousel">
                <h3>Joke-Laneja tukemassa</h3>
                <a href={image.websiteUrl}>
                    <img src={image.src} alt={image.name} />
                </a>
            </div>
        );
    },
    tick: function() {
        var nextNo = this.state.imgNo + 1;
        if (nextNo >= this.state.images.length) {
            nextNo = 0;
        }
        this.setState({imgNo: nextNo});
    }
});

module.exports = Carousel;
