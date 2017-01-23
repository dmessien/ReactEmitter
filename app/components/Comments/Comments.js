import React from 'react';

import {CommentsDispatcher} from './CommentsDispatcher';

import $ from 'jquery';


export default class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                comment: ""
            },
            comments: []
        };
        this.store = new CommentsDispatcher(this);

        this.submitComment = this.submitComment.bind(this);
        $.get("/api/comments").then(function(comments) {
            var state = this.state;
            state.comments = comments.reverse();
            this.setState(state);
        }.bind(this));
    }
    submitComment(event) {
        event.preventDefault();
        $.post("/api/comments", this.state.form).then(function(res) {
            $("#search form")[0].reset();
        });
    }
    render() {
        var Actions = this.store.actions || null;
        return (
            <section id="search">
                <h1>Comments</h1>
                <form onSubmit={this.submitComment}>
                    <div className="form-group">
                        <textarea rows="10" placeholder="Enter Comment" onChange={(event) => this.store.emit(Actions.COMMENT_INPUT_CHANGE, event)}></textarea>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit" />
                    </div>
                </form>
                {(this.state.newCommentsCount > 0) ? <div>{this.state.newCommentsCount} comments pending <button onClick={this.store.emit.bind(this, Actions.SHOW_NEW_COMMENTS)}>Show Comment(s)</button></div> : null}
                {this.state.comments.map(function(comment, index) {
                    return <div key={index}>{comment}</div>
                })}
            </section>
        )
    }
}
