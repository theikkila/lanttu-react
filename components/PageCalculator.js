var React = require('react');
var PageStore = require('../stores/PageStore');

function getPagesState () {
    return {
        allPages: PageStore.getAll()
    }    
}

var PageCalculator = React.createClass({
	getInitialState() {
        return getPagesState();
    },
	componentDidMount() {
        PageStore.addChangeListener(this.handleChange);
    },
    componentWillUnmount() {  
        PageStore.removeChangeListener(this.handleChange);
	},
	handleChange(pages){
		this.setState(getPagesState());
	},
    render(){
    	var len = this.state.allPages ? this.state.allPages.length : 0; 
        return (
            <strong>Yhteensä {len} sivua</strong>
        );
    }
});

module.exports = PageCalculator;