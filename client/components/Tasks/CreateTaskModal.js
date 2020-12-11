import React, { Component } from "react";
import { connect } from "react-redux";
import Categories from "./Categories";
import {
  fetchTasksThunk,
  removeTaskThunk,
  addTaskThunk,
} from "../../store/tasks";
import "./taskmodal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class CreateTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      selected: "",
      description: "",
      points: 0,
      error: null,
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
      if (this.state.name == "" || this.state.selected == "") {
        alert("task name OR group can't be empty!");
      } else {
        await this.props.addTask(this.state);
        await this.props.fetchTasks();
        this.setState({
          name: "",
          selected: "",
          description: "",
          points: 0,
        });
        this.props.onClose();
      }
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
    const { groups } = this.props.tasks;
    if (!this.props.show) {
      return null;
    }
    return (
      <div>
        <div>{this.props.children}</div>
        <div className="create-task-modal-content">
          <div id="top-taskmodal-div">
            <div id="modal-title">NEW TASK</div>
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
                className="modal-input desc"
                onChange={this.handleChange}
                value={this.state.description}
              />
              <label htmlFor="points">Points:</label>
              <input
                name="points"
                type="text"
                className="modal-input"
                onChange={this.handleChange}
                value={this.state.points}
              />

              <label htmlFor="group">Group:</label>
              {!groups.length ? (
                "You are not a part of any groups."
              ) : (
                <div id="select-group">
                  {groups.map((group) => (
                    <div key={group.id} className="each-select-group" onClick={() => {
                      this.setState({ selected: group.id });
                    }}>
                        <img src={group.imageUrl} className="choose-group-image"></img>
                        {group.name}
                    </div>
                  ))}
                </div>
              )}

              <button type="submit" id="modal-submit-button">
                Update
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
  groups: state.groups,
});

const mapDispatch = (dispatch) => ({
  addTask: (task) => dispatch(addTaskThunk(task)),
  fetchTasks: (userId) => dispatch(fetchTasksThunk(userId)),
  deleteTask: (taskId) => dispatch(removeTaskThunk(taskId)),
});

export default connect(mapState, mapDispatch)(CreateTaskModal);
