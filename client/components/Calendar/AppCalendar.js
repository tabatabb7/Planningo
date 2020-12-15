import React from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { connect } from "react-redux";

import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import toDate from 'date-fns/toDate'
import { fetchTasksThunk, removeTaskThunk } from "../../store/tasks";
// // import { set } from 'react-big-calendar/lib/formats'
// // import { set as setLocalizer } from 'react-big-calendar/lib/localizer'
// // import dates from 'react-big-calendar/lib/utils/dates'
// import globalize from 'globalize'

// const localizer = globalizeLocalizer(globalize)

import { DateTime } from 'luxon';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

  class AppCalendar extends React.Component {
    constructor() {
      super();
      const now = new Date();
      const events = [
        {
            id: 0,
            title: 'All Day Event very long title',
            allDay: true,
            start: new Date(2020, 12, 15),
            end: new Date(2020, 12, 15),
        },
        {
            id: 1,
            title: 'Long Event',
            start: new Date(2015, 3, 7),
            end: new Date(2015, 3, 10),
        },

        {
            id: 2,
            title: 'DTS STARTS',
            start: new Date(2016, 2, 13, 0, 0, 0),
            end: new Date(2016, 2, 20, 0, 0, 0),
        },

        {
            id: 3,
            title: 'DTS ENDS',
            start: new Date(2016, 10, 6, 0, 0, 0),
            end: new Date(2016, 10, 13, 0, 0, 0),
        },

        {
            id: 4,
            title: 'Some Event',
            start: new Date(2015, 3, 9, 0, 0, 0),
            end: new Date(2015, 3, 10, 0, 0, 0),
        },
        {
            id: 5,
            title: 'Conference',
            start: new Date(2015, 3, 11),
            end: new Date(2015, 3, 13),
            desc: 'Big conference for important people',
        },
        {
            id: 6,
            title: 'Meeting',
            start: new Date(2015, 3, 12, 10, 30, 0, 0),
            end: new Date(2015, 3, 12, 12, 30, 0, 0),
            desc: 'Pre-meeting meeting, to prepare for the meeting',
        },
        {
            id: 7,
            title: 'Lunch',
            start: new Date(2015, 3, 12, 12, 0, 0, 0),
            end: new Date(2015, 3, 12, 13, 0, 0, 0),
            desc: 'Power lunch',
        },
        {
            id: 8,
            title: 'Meeting',
            start: new Date(2015, 3, 12, 14, 0, 0, 0),
            end: new Date(2015, 3, 12, 15, 0, 0, 0),
        },
        {
            id: 9,
            title: 'Happy Hour',
            start: new Date(2015, 3, 12, 17, 0, 0, 0),
            end: new Date(2015, 3, 12, 17, 30, 0, 0),
            desc: 'Most important meal of the day',
        },
        {
            id: 10,
            title: 'Dinner',
            start: new Date(2015, 3, 12, 20, 0, 0, 0),
            end: new Date(2015, 3, 12, 21, 0, 0, 0),
        },
        {
            id: 11,
            title: 'Birthday Party',
            start: new Date(2015, 3, 13, 7, 0, 0),
            end: new Date(2015, 3, 13, 10, 30, 0),
        },
        {
            id: 12,
            title: 'Late Night Event',
            start: new Date(2015, 3, 17, 19, 30, 0),
            end: new Date(2015, 3, 18, 2, 0, 0),
        },
        {
            id: 12.5,
            title: 'Late Same Night Event',
            start: new Date(2015, 3, 17, 19, 30, 0),
            end: new Date(2015, 3, 17, 23, 30, 0),
        },
        {
            id: 13,
            title: 'Multi-day Event',
            start: new Date(2015, 3, 20, 19, 30, 0),
            end: new Date(2015, 3, 22, 2, 0, 0),
        },
        {
            id: 14,
            title: 'Today',
            start: new Date(new Date().setHours(new Date().getHours() - 3)),
            end: new Date(new Date().setHours(new Date().getHours() + 3)),
        },
        {
            id: 15,
            title: 'Point in Time Event',
            start: now,
            end: now,
        },
      ]
      this.state = {
        name: 'React',
        events
      };
    }

    componentDidMount() {
      this.props.fetchTasks();
    }

    render() {

      const date = toDate((new Date()))
      console.log('DATE--->', date)
      console.log("USERTASKS!!!! --->", this.props.userTasks)
      const tasks = this.props.userTasks.tasks

      return (
        <div>
          <div style={{ height: '400pt'}}>
            <Calendar
              events={tasks && tasks.length > 0 ? tasks : []}
              titleAccessor="name"
              startAccessor="start"
              endAccessor="end"
              defaultDate={date}
              localizer={localizer}
            />

          </div>
        </div>
      );
    }
  }

  const mapState = (state) => ({
    userTasks: state.tasks,
    userId: state.user.id,
  });
  
  const mapDispatch = (dispatch) => ({
    fetchTasks: () => dispatch(fetchTasksThunk()),
    deleteTask: (taskId) => dispatch(removeTaskThunk(taskId)),
  });

  export default connect(mapState, mapDispatch)(AppCalendar);


  