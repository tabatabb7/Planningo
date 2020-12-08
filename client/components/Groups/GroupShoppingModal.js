import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchSingleGroupShopping,
  addGroupItemThunk,
} from "../../store/singleGroup";
import "./grouptaskmodal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class GroupShoppingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      selected: "",
      description: "",
      groupId: this.props.groupId,
      error: null
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
        <div className="group-task-modal-content">
          <div id="group-top-taskmodal-div">
            <div id="group-modal-title">NEW ITEM</div>
            <button
              onClick={(e) => this.onClose(e)}
              className="group-close-modal-btn"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div id="group-lower-taskmodal-div">
            <form id="group-add-task-form" onSubmit={this.handleSubmit}>
              <label htmlFor="name">Name:</label>
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
              <button id="group-modal-submit-button" type="submit">Add</button>
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
  fetchGroup: (groupId) => dispatch(fetchSingleGroupShopping(groupId)),
  addGroupTask: (groupId, task) => dispatch(addGroupItemThunk(groupId, task)),
  updateTask: (task) => dispatch(updateSingleTask(task)),
});

export default connect(mapState, mapDispatch)(GroupShoppingModal);
