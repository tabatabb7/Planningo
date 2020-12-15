import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleGroup, addGroupTaskThunk } from "../../store/singleGroup";
import "../Tasks/taskmodal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import KeyboardDatePickerTab from "../Calendar/DatePicker"


class GroupTaskModal extends Component {
  constructor(props) {
    super(props);
    let path = window.location.pathname;
    let part = path.split("/").pop();
    this.state = {
      name: "",
      selected: "",
      description: "",
      points: 0,
      groupId: this.props.groupId,
      error: null,
      categoryId: null,
      selectedDate: null,
      modaltype: part,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  componentDidMount() {
    this.props.fetchGroup(this.props.groupId);
  }

  handleDate() {
    let date = document.getElementById("key-datepicker").value
    console.log('DATE!!!--->', date)
    this.setState({
      selectedDate: date
    })
    console.log('SELECTED DATE!', this.state.selectedDate)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.handleDate();
    (console.log(this.state, "THIS STATE SUBMIT"))
    try {
      await this.props.addGroupTask(this.props.groupId, this.state);
      this.setState({
        name: "",
        selected: "",
        description: "",
        points: 0,
        categoryId: null,
        selectedDate: null,
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
    let categories = this.props.group.categories;

    if (!this.props.show) {
      return null;
    }
    return (
      <div>
        <div>{this.props.children}</div>
        <div className="task-modal-content">
          <div id="top-taskmodal-div">
            <div id="modal-title">
              NEW {this.state.modaltype === "tasks" ? "TASK" : "ITEM"}
            </div>
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
              <KeyboardDatePickerTab selectedDates={this.state.selectedDate}/>
              <button id="modal-submit-button" type="submit">
                Add
              </button>

              <div id="modal-category-wrap">
                <label htmlFor="categoryId">Category:</label>

                <select
                  onChange={(e) =>
                    this.setState({ categoryId: e.target.value || null })
                  }
                  value={this.state.categoryId || ""}
                  name="categoryId"
                  className="choose-category"
                >
                  <option value="">None</option>
                  {categories
                    ? categories
                        .filter((category) => {
                          if (this.state.modaltype === "tasks") {
                            return category.isShopping === false;
                          } else {
                            return category.isShopping === true;
                          }
                        })
                        .map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))
                    : null}
                </select>
              </div>
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
