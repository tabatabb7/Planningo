import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTasksThunk, removeTask } from "../store/tasks"

class TaskList extends Component {

  componentDidMount() {
    try {
      this.props.getTasks()
    } catch (err) {
      next(err)
    }
  }

  render() {
    let { tasks } = this.props

    return (
      <div id='tasks'>
        <Link to={'/add'}><button>Add a task</button></Link>
        <h3>YOUR TASKS</h3>
        { tasks.map(task =>
          <p key={task.id}>
            <Link to={`tasks/${task.id}`}> {task.taskName} </Link>
            <button onClick={() => this.props.deleteTask(task.id)} className='deleteTask'>X</button>
          </p>)
        }
      </div>
    )
  }
}

const mapState = state => ({
  tasks: state.tasks
})

const mapDispatch = dispatch => ({
  getTasks: () => dispatch(fetchTasksThunk()),
  deleteTask: taskId => dispatch(removeTask(taskId))
})

export default connect(mapState, mapDispatch)(TaskList)
