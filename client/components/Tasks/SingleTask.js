import React, { Component } from 'react'
import { connect } from "react-redux";
import { fetchTaskThunk } from "../../store/singletask"

class SingleTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    };
  }

  componentDidMount() {
    try {
      this.props.getTask(this.props.match.params.taskId)
    } catch (err) {
      next(err)
    }
  }

  render() {
    let { task } = this.props
    console.log(task)

    return (
      <div id='single-task'>
        <h3>{task.name}</h3>
        <h3>Description</h3>
         </div>
    )
  }
}

const mapState = state => ({
  task: state.task
})

const mapDispatch = dispatch => ({
  getTask: (taskId) => dispatch(fetchTaskThunk(taskId))
})

export default connect(mapState, mapDispatch)(SingleTask)
