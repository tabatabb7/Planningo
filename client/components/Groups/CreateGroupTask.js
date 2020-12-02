import React from "react";
import { connect } from "react-redux";
import { fetchGroupUsersThunk } from "../../store/allGroups";

import {
  addGroupTaskThunk,
  removeTaskThunk,
} from "../../store/tasks";

class CreateGroupTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      showModal: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
  }
  componentDidMount() {
    this.props.fetchGroups(this.props.match.params.groupId)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      await this.props.addGroupTask(this.props.match.params.groupId, this.state);
      console.log(this.state)
      this.setState({
        name: "",
        selected: ""
      });
    } catch (err) {
      console.log("error creating task", err);
    }
  }

  async handleDelete(id) {
    try {
      await this.props.deleteTask(id);
      await this.props.fetchTasks(this.props.match.params.groupId);
    } catch (err) {
      console.error(err);
    }
  }

  showModal(e) {
    this.setState({ showModal: true });
  }


  render() {
    let { groups } = this.props

    return (
      <div className="create-group-task-wrapper">
        <h1 className="tool-title">Add Tasks</h1>
        <form id="add-task-form" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Add Task:</label>
          <input
            name="name"
            type="text"
            onChange={this.handleChange}
            value={this.state.name}
          />
         
        </form>
        <form id="assignee-form" onSubmit={this.handleSubmit}>
          <label htmlFor="selected">Assigned to:</label>
          <select value={this.state.selected} onChange={this.handleChange} name="selected">
            {groups ? groups.map((group) => group.users.map((user) => (
              <option key={user.id} value={user}>{user.firstName} {user.lastName}</option>
            ))) : "There are no users"}
          </select>
          <button type="submit">Add</button>
        </form>

      </div>
    );
  }
}

const mapState = (state) => ({
  tasks: state.tasks,
  userId: state.user.id,
  group: state.singleGroup,
  groups: state.groups
});

const mapDispatch = (dispatch) => ({
  fetchGroups: (groupId) => dispatch(fetchGroupUsersThunk(groupId)),
  deleteTask: (taskId) => dispatch(removeTaskThunk(taskId)),
  addGroupTask: (groupId, task) => dispatch(addGroupTaskThunk(groupId, task)),
  updateTask: (task) => dispatch(updateSingleTask(task))
});

export default connect(mapState, mapDispatch)(CreateGroupTask);
