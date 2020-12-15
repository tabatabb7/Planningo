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
    }

    componentDidMount() {
      this.props.fetchTasks();
    }

    render() {

      const date = toDate((new Date()))
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


