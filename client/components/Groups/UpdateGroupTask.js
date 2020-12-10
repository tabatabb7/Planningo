import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { updateGroupTaskThunk } from "../../store/tasks";

class UpdateGroupTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.task.name,
      selected: this.props.task.selected,
      description: this.props.task.description,
      points: this.props.task.points,
      taskId: this.props.task.id,
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
      if (this.state.name == "") {
        alert("Task name can't be empty!")
      } else {
        await this.props.updateGroupTask(this.state);
        this.setState({
          name: "",
          selected: "",
          description: "",
        });
        alert(`Task was updated! Redirecting you to the tasks page.`)
        // await this.props.fetchTasks();
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
    let group = this.props.group;

    if (!this.props.showTask || !this.props.selectedTask) {
      return null;
    }
    return (
      <div>
        <div>{this.props.children}</div>
        <div className="group-task-modal-content">
          <div id="group-top-taskmodal-div">
            <div id="group-modal-title">UPDATE TASK</div>
            <button
              onClick={(e) => this.onClose(e)}
              className="group-close-modal-btn"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div id="group-lower-taskmodal-div">
            <form id="group-add-task-form" onSubmit={this.handleSubmit}>
              <label htmlFor="name">Task:</label>
              <input
                name="name"
                type="text"
                className="group-modal-input"
                onChange={this.handleChange}
                value={this.state.name}
              />

              <label htmlFor="description">Description:</label>
              <textarea
                name="description"
                type="text"
                rows="4"
                className="group-modal-input"
                onChange={this.handleChange}
                value={this.state.description}
              />
              <label htmlFor="points">Points:</label>
              <textarea
                name="points"
                type="text"
                className="modal-input"
                onChange={this.handleChange}
                value={this.state.points}
              />
            </form>

          <form id="user-form" onSubmit={this.handleSubmit}>
            <label htmlFor="selected"></label>
            <select
              value={this.state.selected}
              onChange={this.handleChange}
              name="selected"
            >
              <option value="" disabled>
                Select User
              </option>
              {group && group.users
                ? group.users.map((user) => (
                    <option key={user.id}>{user.firstName} {user.lastName}</option>
                  ))
                : "There are no users"}
              </select>
              <button id="group-modal-submit-button" type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  userId: state.user.id,
  group: state.singleGroup
});

const mapDispatch = (dispatch) => ({
  // fetchTasks: (userId) => dispatch(fetchTasksThunk(userId)),
  updateGroupTask: (task) => dispatch(updateGroupTaskThunk(task)),
});

export default connect(mapState, mapDispatch)(UpdateGroupTaskModal);
