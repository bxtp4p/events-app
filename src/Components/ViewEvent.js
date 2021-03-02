import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import moment from 'moment';

import { API } from 'aws-amplify';

import { getEvent } from "../graphql/queries";
import EventComments from "./EventComments";

class ViewEvent extends Component {
    
    state = {
        event: this.props.event,
        loading: this.props.loading
    }

    loadEvent = async () => {
        this.setState({ busy: true });
        const eventId = this.props.match.params.id;

        const event = await API.graphql({ query: getEvent, variables: {id: eventId } });
        this.setState({ busy: false, event: event.data.getEvent });

    }

    componentDidMount = () => {
        this.loadEvent();
    }

    render = () => {
        const { event, loading } = this.state;

        return (
            <div className={`ui container raised very padded segment ${loading ? 'loading' : ''}`}>
                <Link to="/" className="ui button">Back to events</Link>
                <div className="ui items">
                    <div className="item">
                        {event && <div className="content">
                            <div className="header">{event.name}</div>
                            <div className="extra"><i className="icon calendar"></i>{moment(event.when).format('LL')}</div>
                            <div className="extra"><i className="icon clock"></i>{moment(event.when).format('LT')}</div>
                            <div className="extra"><i className="icon marker"></i>{event.where}</div>
                            <div className="description">{event.description}</div>
                            <div className="extra">
                                { <EventComments eventId={event.id} comments={event.comments} /> }
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(ViewEvent);