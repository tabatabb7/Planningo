import React from "react";
import { render } from "react-dom";
import moment from "moment";
import BigCalendar from "react-big-calendar";
import { getEvents } from '../gcal'
BigCalendar.momentLocalizer(moment);

require('style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css')

export default class Calendar extends React.Component {
  constructor() {
    super();
    this.state = {
        events: []
    }
  }
  componentDidMount(){
      getEvents((events) => {
          this.setState({events})
      })
  }
  render() {
    return (<BigCalendar style={{height: '420px'}} events={[]} />);
  }
}
