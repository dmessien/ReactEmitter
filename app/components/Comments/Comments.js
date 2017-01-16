import React from 'react';

import {CommentsStore} from './CommentsStore';

import Actions from './CommentsActions';

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
        this.store = new CommentsStore(this);
        this.submitComment = this.submitComment.bind(this);
        $.get("/api/comments", this.state.form).then(function(comments) {
            this.state.comments = comments.reverse();
        }.bind(this));
    }
    submitComment(event) {
        event.preventDefault();
        $.post("/api/comments", this.state.form).then(function(res) {
            console.log(res);
            $("#search form")[0].reset();
        });
    }
    render() {
        return (
            <section id="search">
                <h1>Comments</h1>
                {(this.state.newCommentsCount > 0) ? <div>{this.state.newCommentsCount} comments pending <button onClick={this.store.emit.bind(this, Actions.SHOW_NEW_COMMENTS)}>Show Comment(s)</button></div> : null}
                {this.state.comments.map(function(comment, index) {
                    return <div key={index}>{comment}</div>
                })}
                <form onSubmit={this.submitComment}>
                    <textarea rows="10" placeholder="Enter Comment" onChange={(event) => this.store.emit(Actions.COMMENT_INPUT_CHANGE, event)}></textarea>
                    <input type="submit" value="Submit" />
                </form>
            </section>
        )
    }
}
