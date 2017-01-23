import Dispatcher from 'rxjs-cumulus';

import Actions from './LiveStatsActions';

export class LiveStatsDispatcher extends Dispatcher {
    constructor(LiveStats){
        super(LiveStats);

        this.subscribe(Actions.ADD_TEAM_PASS_YDS, function(yards) {
            var state = LiveStats.state;
            state.passYds = state.passYds + yards;
            state.passAtt = state.passAtt++;
            LiveStats.setState(state);
        });

        this.subscribe(Actions.ADD_TEAM_RUSH_YDS, function(yards) {
            var state = LiveStats.state;
            state.rushYds = state.rushYds + yards;
            state.rushAtt = state.rushAtt++;
            LiveStats.setState(state);
        });

        this.subscribe(Actions.ADD_PLAYER_PASS_YDS, function(player, yards) {
            var state = LiveStats.state;
        })
    }
}