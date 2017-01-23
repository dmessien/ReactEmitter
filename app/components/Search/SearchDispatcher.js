import {Dispatcher} from 'rxjs-cumulus';
var Actions = require('./SearchActions.js');

export class SearchDispatcher extends Dispatcher {
    constructor(Search){
        super(Search);

       /***let {componentWillUnmount} = Search;**/

        this.subscribe(Actions.SEARCH_INPUT_CHANGE, function(e) {
            Search.setState({inputValue: e.target.value});
        });
    }
}