import Dispatcher from 'rxjs-cumulus';

var CommentsActions = require('./CommentsActions');

export class CommentsDispatcher extends Dispatcher {
    constructor(Comments){
        super(Comments);

        this.registerActions(CommentsActions);

        let Actions = this.actions;

        this.pollApi("/api/comments", 1500, function(response) {
            var newComments = JSON.parse(response.getBody());
            if(newComments.length - Comments.state.comments.length > 0) {
                Comments.store.emit(Actions.NEW_COMMENTS_WAITING, newComments);
            }
        });

        this.subscribe(this.actions.NEW_COMMENTS_WAITING, function(newComments) {
            var state = Comments.state;
            state.newCommentsCount = newComments.length - Comments.state.comments.length;
            state.pendingComments = newComments;
            Comments.setState(state);
        });

        this.subscribe(this.actions.SHOW_NEW_COMMENTS, function() {
            var state = Comments.state;
            state.comments = state.pendingComments.reverse();
            state.newCommentsCount = 0;
            state.pendingComments = [];
            Comments.setState(state);
        });

        this.subscribe(this.actions.COMMENT_INPUT_CHANGE, function(event) {
            var value = event.target.value;
            var state = Comments.state;
            state.form.comment = value;
            Comments.setState(state);
        });
    }
}
