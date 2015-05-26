var React = require('react')

var Hello = React.createClass({
    render(){
        return (
            <div>Hello, {this.props.name}!</div>
        );
    }
});

module.exports = Hello;