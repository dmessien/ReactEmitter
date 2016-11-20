import {Dispatcher} from '../../helpers/Dispatcher';
var Actions = require('./CommentsActions');

export class CommentsStore extends Dispatcher {
    constructor(Comments){
        super(Comments);

        let {componentWillUnmount} = Comments;

        this.subscribe(Actions.NEW_POSTS_WAITING, function(newPosts) {
            Comments.setState({
                newPostsCount: newPosts.length,
                posts: newPosts
            });
        });

        this.disposeAll.bind(componentWillUnmount);
    }
}