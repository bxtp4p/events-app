import React, { Component } from "react";
import { API } from 'aws-amplify';

import moment from 'moment';

import {subscribeToEventComments} from "../graphql/subscriptions";

import NewComment from "./NewComment";

class EventComments extends Component {
    state = {
        comments: this.props.comments
    }

    subscription;

    componentDidMount() {
        this.subscription = API.graphql({
            query: subscribeToEventComments, 
            variables: {eventId: this.props.eventId}
        }).subscribe({
            next: ({ provider, value }) => {
                console.log({ provider, value });

                const newComment = value.data.subscribeToEventComments;

                const comments = this.state.comments;
                comments.items.push(newComment);

                this.setState( {
                    comments: comments
                });

            }
        });
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    renderComment = (comment) => {
        return (
            <div className="comment" key={comment.commentId}>
                <div className="avatar"><i className="icon user circular"></i></div>
                <div className="content">
                    <div className="text">
                        {comment.content}
                    </div>
                    <div className="metadata">{moment(comment.createdAt).format('LL, LT')}</div>
                </div>
            </div>
        );
    }

    render() {
        const { comments: { items } } = this.state;
        const { eventId } = this.props;

        return (
            <div className="ui items">
                <div className="item">
                    <div className="ui comments">
                        <h4 className="ui dividing header">Comments</h4>
                        { items && [].concat(items).sort((a, b) => a.createdAt.localeCompare(b.createdAt)).map(this.renderComment)}
                        <NewComment eventId={eventId} />
                    </div>
                </div>
            </div>
        );
    }

}

export default EventComments;