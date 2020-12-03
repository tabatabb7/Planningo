import React, { Component } from 'react'
import { connect } from "react-redux";
import {
  fetchTasksThunk,
  addTaskThunk,
  removeTaskThunk,
} from "../../store/tasks";


class TaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      selected: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      await this.props.addTask(this.state);
      this.setState({
        name: "",
        selected: "",
      });
      await this.props.fetchTasks();
    } catch (err) {
      console.log("error creating task", err);
    }
  }

  async handleDelete(id) {
    try {
      await this.props.deleteTask(id);
      this.props.fetchTasks();
    } catch (err) {
      console.error(err);
    }
  }

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    let { groups } = this.props.tasks

    if (!this.props.show) { 
      return null 
    }
    return (
      <div>
        <div>{this.props.children}</div>
          <div className='task-modal-content'>
          <h3>Add Task</h3>
          <form id="add-task-form" onSubmit={this.handleSubmit}>
          <label htmlFor="name"></label>
          <input
            name="name"
            type="text"
            placeholder='Task name'
            onChange={this.handleChange}
            value={this.state.name}
          />
          </form>
        <form id="group-form" onSubmit={this.handleSubmit}>
          <label htmlFor="selected"></label>
          <select value={this.state.selected} onChange={this.handleChange} name="selected">
            <option value="" disabled>Select Group</option>
            {groups && groups.length ? groups.map((group) => (
              <option key={group.id}>{group.name} </option>
            )) : "There are no groups"}
          </select>
          <button className="close-modal-btn" type="submit">Add</button>
        </form>
          <button onClick={e => this.onClose(e)}>X</button>
          </div>
      </div>
    )
  }
}

const mapState = state => ({
  tasks: state.tasks,
})

const mapDispatch = dispatch => ({
  fetchTasks: (userId) => dispatch(fetchTasksThunk(userId)),
  deleteTask: (taskId) => dispatch(removeTaskThunk(taskId)),
  addTask: (task) => dispatch(addTaskThunk(task)),
  updateTask: (task) => dispatch(updateSingleTask(task))
})

export default connect(mapState, mapDispatch)(TaskModal)
