var React = require('react');
var Actions = require('./SearchActions.js');
import {Filters} from '../../helpers/Filters';
import {SearchStore} from './SearchDispatcher';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ""
        };
        this.store = new SearchStore(this);
        var SearchFilter = new Filters();
        this.basicFilter = SearchFilter.basicFilter.bind(this, "inputValue");
    }
    render() {
        var array = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        var emitter = this.props.emitter;
        return (
            <section id="search">
                <h1>Search</h1>
                <input type="text" onKeyUp={this.store.emit.bind(this, Actions.SEARCH_INPUT_CHANGE)} placeholder="Enter Country Name" />
                {array.filter(this.basicFilter).map(function(day, index){
                   return <p key={index}>{day}</p>
                })}
            </section>
        )
    }
}