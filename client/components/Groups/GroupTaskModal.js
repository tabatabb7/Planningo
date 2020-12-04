import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchSingleGroup,
  addGroupTaskThunk,
} from "../../store/singleGroup";

class GroupTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      selected: "",
      groupId: this.props.groupId
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchGroup(this.props.groupId);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      await this.props.addGroupTask(this.props.groupId, this.state);
      this.setState({
        name: "",
        selected: ""
      });
      await this.props.fetchGroup(this.props.groupId)
      this.props.onClose()
    } catch (err) {
      console.log("error creating task", err);
    }
  }

  async handleDelete(id) {
    try {
      await this.props.deleteTask(id);
    } catch (err) {
      console.error(err);
    }
  }

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    let group = this.props.group

    if (!this.props.show) {
      return null;
    }
    return (
      <div>
        <div>{this.props.children}</div>
        <div className="group-task-modal-content">
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
                Select User
              </option>
              {group && group.users ? group.users.map((user) => (
              <option key={user.id}>{user.firstName} {user.lastName}</option>
            )) : "There are no users"}
            </select>
            <button className="add-group-task-btn" type="submit">
              Add
            </button>
          </form>
          <button onClick={(e) => this.onClose(e)}>X</button>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  // tasks: state.tasks,
  userId: state.user.id,
  group: state.singleGroup
});

const mapDispatch = (dispatch) => ({
  fetchGroup: (groupId) => dispatch(fetchSingleGroup(groupId)),
  // fetchTasks: (userId) => dispatch(fetchTasksThunk(userId)),
  // deleteTask: (taskId) => dispatch(removeTaskThunk(taskId)),
  addGroupTask: (groupId, task) => dispatch(addGroupTaskThunk(groupId, task)),
  updateTask: (task) => dispatch(updateSingleTask(task)),
});

export default connect(mapState, mapDispatch)(GroupTaskModal);
