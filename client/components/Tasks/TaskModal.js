import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchTasksThunk,
  addTaskThunk,
  removeTaskThunk,
} from "../../store/tasks";
import "./Tasks.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes
} from "@fortawesome/free-solid-svg-icons";


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
      await this.props.fetchTasks();
      this.setState({
        name: "",
        selected: "",
      })
      this.props.onClose()
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

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    let { groups } = this.props.tasks;
    if (!this.props.show) {
      return null;
    }
    return (
      <div>
        <div>{this.props.children}</div>
        <div className="task-modal-content">

      <div id="top-taskmodal-div">
      <button onClick={(e) => this.onClose(e)} className="close-modal-btn">      <FontAwesomeIcon icon={faTimes} />
</button></div>

        <div id="lower-taskmodal-div">

          <h3>Add Task</h3>
          <form id="add-task-form" onSubmit={this.handleSubmit}>
            <label htmlFor="name"></label>
            <input
              name="name"
              type="text"
              placeholder="Task name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </form>
          <form id="group-form" onSubmit={this.handleSubmit}>
            <label htmlFor="selected"></label>
            <select
              value={this.state.selected}
              onChange={this.handleChange}
              name="selected"
            >
              <option value="" disabled>
                Select Group
              </option>
              {groups && groups.length
                ? groups.map((group) => (
                    <option key={group.id}>{group.name} </option>
                  ))
                : "There are no groups"}
            </select>
            <button type="submit">
              Add
            </button>
          </form>
        </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  tasks: state.tasks,
});

const mapDispatch = (dispatch) => ({
  fetchTasks: (userId) => dispatch(fetchTasksThunk(userId)),
  deleteTask: (taskId) => dispatch(removeTaskThunk(taskId)),
  addTask: (task) => dispatch(addTaskThunk(task)),
  updateTask: (task) => dispatch(updateSingleTask(task)),
});

export default connect(mapState, mapDispatch)(TaskModal);
