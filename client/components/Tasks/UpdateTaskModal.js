import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTaskThunk } from "../../store/tasks"
import {
  fetchTasksThunk,
} from "../../store/tasks";
import "./taskmodal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class UpdateTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.task.name,
      selected: this.props.task.selected,
      description: this.props.task.description,
      taskId: this.props.task.id
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
      console.log(this.props)
      if (this.state.name == "") {
        alert("task name can't be empty!")
      } else {
        await this.props.updateTask(this.state);
        this.setState({
          name: "",
          selected: "",
          description: "",
        });
        alert(`Your task was updated! Redirecting you to your tasks page..`)
        this.props.onClose();
      }
    } catch (err) {
      console.log("error creating task", err);
    }
  }

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    let { groups } = this.props.tasks;

    if (!this.props.showTask || !this.props.selectedTask) {
        return null;
    }
    return (
      <div>
        <div>{this.props.children}</div>
        <div className="task-modal-content">
          <div id="top-taskmodal-div">
            <div id="modal-title">YOUR TASK</div>
            <button
              onClick={(e) => this.onClose(e)}
              className="close-modal-btn"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div id="lower-taskmodal-div">
            <form id="add-task-form" onSubmit={this.handleSubmit}>
              <label htmlFor="name">Task:</label>
              <input
                name="name"
                type="text"
                className="modal-input"
                onChange={this.handleChange}
                value={this.state.name}
              />

              <label htmlFor="description">Description:</label>
              <textarea
                name="description"
                type="text"
                rows="4"
                className="modal-input"
                onChange={this.handleChange}
                value={this.state.description}
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
              <button type="submit" id="modal-submit-button">Update</button>
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
  updateTask: (task) => dispatch(updateTaskThunk(task)),
});

export default connect(mapState, mapDispatch)(UpdateTaskModal);
