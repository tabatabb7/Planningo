import React, { Component } from 'react'
import { addTaskThunk } from "../../store/tasks"
import { connect } from "react-redux";


class CreateTask extends Component {
  constructor() {
    super()
    this.state = {
      taskName: '',
      errorMessage: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    console.log(this.state)
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    try {
      const task = this.state.taskName
      this.props.addTask({
        taskName: task,
      })
      this.setState({
        taskName: '',
        errorMessage: ''
      })
    } catch (err) {
      this.setState({
        errorMessage: `There was a problem creating the task: ${err.message}`
      })
    }
  }

  render() {
    return (
      <form id='create-task-form' onSubmit={this.handleSubmit}>
        <label htmlFor="taskName">Task:</label>
        <input
          name="taskName"
          type="text"
          value={this.state.taskName}
          onChange={this.handleChange}
        />
        <button type='submit'>submit</button>
      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  addTask: (taskName) => dispatch(addTaskThunk(taskName))
})

export default connect(null, mapDispatch)(CreateTask)

