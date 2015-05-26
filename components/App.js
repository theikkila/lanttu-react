var React = require('react');

var Hello = require('./Hello');

var App = React.createClass({
    render(){

        return (

            <div>
                <Hello name="Matias" />
            </div>
            )
    }
});

module.exports = App;