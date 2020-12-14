import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleGroup, addGroupTaskThunk } from "../../store/singleGroup";
import "../Tasks/taskmodal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import DatePicker from '../Calendar/Datepicker'


class GroupTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      selected: "",
      description: "",
      points: 0,
      groupId: this.props.groupId,
      error: null,
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
        selected: "",
        description: "",
        points: 0,
      });
      await this.props.fetchGroup(this.props.groupId);
      this.props.onClose();
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
    let group = this.props.group;

    if (!this.props.show) {
      return null;
    }
    return (
      <div>
        <div>{this.props.children}</div>
        <div className="task-modal-content">
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
                className="modal-input"
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
                      <option key={user.id}>
                        {user.firstName} {user.lastName}
                      </option>
                    ))
                  : "There are no users"}
              </select>
              <DatePicker/>
              <button id="modal-submit-button" type="submit">
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
  userId: state.user.id,
  group: state.singleGroup,
});

const mapDispatch = (dispatch) => ({
  fetchGroup: (groupId) => dispatch(fetchSingleGroup(groupId)),
  addGroupTask: (groupId, task) => dispatch(addGroupTaskThunk(groupId, task)),
  updateTask: (task) => dispatch(updateSingleTask(task)),
});

export default connect(mapState, mapDispatch)(GroupTaskModal);
