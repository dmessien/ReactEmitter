import {Dispatcher} from '../../helpers/Dispatcher';
import Actions from './CommentsActions';

export class CommentsStore extends Dispatcher {
    constructor(Comments){
        super(Comments);

        let {componentWillUnmount} = Comments;

        this.pollApi("/api/comments", 1500, function(comments) {
            Comments.store.emit(Actions.NEW_COMMENTS_WAITING, comments)
        });

        this.subscribe(Actions.NEW_COMMENTS_WAITING, function(newComments) {
            var state = Comments.state;
            state.newCommentsCount = newComments.length - Comments.state.comments.length;
            state.pendingComments = newComments;
            Comments.setState(state);
        });

        this.subscribe(Actions.SHOW_NEW_COMMENTS, function() {
            var state = Comments.state;
            state.comments = Comments.state.pendingComments.reverse();
            state.newCommentsCount = 0;
            state.pendingComments = [];
            Comments.setState(state);
        });

        this.subscribe(Actions.COMMENT_INPUT_CHANGE, function(event) {
            var value = event.target.value;
            var state = Comments.state;
            state.form.comment = value;
            Comments.setState(state);
        });

        this.disposeAll.bind(componentWillUnmount);
    }
}