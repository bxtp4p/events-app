import React, { Component } from "react";
import { Link } from "react-router-dom";
import { API } from 'aws-amplify';
import {listEvents} from "../graphql/queries";
import {deleteEvent} from "../graphql/mutations";
import moment from "moment";
import { logMetricsAndEvents } from "../Utils";

class AllEvents extends Component {

    state = {
        busy: false,
        events: this.props.events
    }

    static defaultProps = {
        events: []
    }

    async handleDeleteClick(event, e) {
        e.preventDefault();

        if (window.confirm(`Are you sure you want to delete event '${event.name}'`)) {
            API.graphql( { query: deleteEvent, variables: { id: event.id } })
            .then( data => {
                console.log(data);
                logMetricsAndEvents(data);
                this.handleSync();
            });
        }
    }

    handleSync = async () => {
        this.setState({ busy: true });

        const events = await API.graphql({ query: listEvents });
        this.setState({ busy: false, events: events.data.listEvents.items });
    }

    componentDidMount = () => {
        this.handleSync();
    }

    renderEvent = (event) => (
        <Link to={`/event/${event.id}`} className="card" key={event.id}>
            <div className="content">
                <div className="header">{event.name}</div>
            </div>
            <div className="content">
                <p><i className="icon calendar"></i>{moment(event.when).format('LL')}</p>
                <p><i className="icon clock"></i>{moment(event.when).format('LT')}</p>
                <p><i className="icon marker"></i>{event.where}</p>
            </div>
            <div className="content">
                <div className="description"><i className="icon info circle"></i>{event.description}</div>
            </div>
            <div className="extra content">
                <i className="icon comment"></i> {event.comments ? event.comments.items.length : 0} comments
            </div>
            <button className="ui bottom attached button" onClick={this.handleDeleteClick.bind(this, event)}>
                <i className="trash icon"></i>
                Delete
            </button>
        </Link>
    );

    render() {
        const { busy, events } = this.state;

        return (
            <div>
                <div className="ui clearing basic segment">
                    <h1 className="ui header left floated">All Events</h1>
                    <button className="ui icon left basic button" onClick={this.handleSync} disabled={busy}>
                        <i aria-hidden="true" className={`refresh icon ${busy && "loading"}`}></i>
                        Sync with Server
                    </button>
                </div>
                <div className="ui link cards">
                    <div className="card blue">
                        <Link to="/newEvent" className="new-event content center aligned">
                            <i className="icon add massive"></i>
                            <p>Create new event</p>
                        </Link>
                    </div>
                    {[].concat(events).sort((a, b) => a.when.localeCompare(b.when)).map(this.renderEvent)}
                </div>
            </div>
        );
    }
}

export default AllEvents;
