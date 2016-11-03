import {Dispatcher} from '../../helpers/Dispatcher';
var Actions = require('./SearchActions.js');

export class SearchStore extends Dispatcher {
    constructor(Search){
        super(Search);

        let {componentWillUnmount} = Search;

        this.subscriptions = {
            searchInputChange: this.emitter.listen(Actions.SEARCH_INPUT_CHANGE, function(e) {
                console.log(e.target.value);
                Search.setState({inputValue: e.target.value});
            })
        };

        this.dispose.bind(componentWillUnmount);
    }

}