var React = require('react');
var emitter = require('../helpers/emitter');

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <main>
                {this.props.children && React.cloneElement(this.props.children, {
                    emitter: emitter
                })}
            </main>
        )
    }
}