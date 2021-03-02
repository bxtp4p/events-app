import React, { Component } from "react";
import {commentOnEvent} from "../graphql/mutations";
import moment from "moment";
import { API } from 'aws-amplify';


class NewComment extends Component {
    static defaultState = {
        comment: {
            content: '',
        },
        loading: false,
    };

    state = NewComment.defaultState;

    handleSubmit = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        const { comment } = this.state;
        const { eventId } = this.props;

        this.setState({ loading: true });

        await API.graphql({ query: commentOnEvent, 
            variables: {
                eventId: eventId,
                content: `${comment.content.trim()}`,
                createdAt: moment.utc().format()
            }
        });


        this.setState(NewComment.defaultState);
    }

    handleChange = ({ target: { value: content } }) => {
        this.setState({ comment: { content } });
    }

    render() {
        const { comment, loading } = this.state;
        return (
            <form className="ui reply form">
                <div className="field">
                    <textarea value={comment.content} onChange={this.handleChange} disabled={loading}></textarea>
                </div>
                <button className={`ui blue labeled submit icon button ${loading ? 'loading' : ''}`}
                    disabled={loading} onClick={this.handleSubmit}>
                    <i className="icon edit"></i>
                    Add Comment
                </button>
            </form>
        );
    }
}

export default NewComment;