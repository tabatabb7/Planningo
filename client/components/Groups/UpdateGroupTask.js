import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { updateGroupTaskThunk, fetchTasksThunk } from "../../store/tasks";
import "../Tasks/taskmodal.css";
import { fetchSingleGroupTasks } from "../../store/singleGroup";
import KeyboardDatePickerTab from "../Calendar/DatePicker"


class UpdateGroupTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.task.name,
      selected: this.props.task.selected,
      description: this.props.task.description,
      points: this.props.task.points,
      categoryId: this.props.task.categoryId,
      selectedDate: this.props.task.selectedDate,
      taskId: this.props.task.id,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDate = this.handleDate.bind(this);
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
    console.log('SELECTED DATE INSIDE SUBMIT!', this.state.selectedDate)
    console.log('THIS.STATE!!!!!', this.state)
    await this.handleDate();
    try {
      if (this.state.name == "") {
        alert("Task name can't be empty!");
      } else {
        await this.props.updateGroupTask(this.state);
        alert(`Task was updated! Redirecting you to the tasks page.`);
        await this.props.fetchGroup(this.props.group.id);
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
    let categories = this.props.group.categories;

    if (!this.props.showTask || !this.props.selectedTask) {
      return null;
    }
    return (
      <div>
        <div>{this.props.children}</div>
        <div className="task-modal-content">
          <div id="top-taskmodal-div">
            <div id="modal-title">UPDATE TASK</div>
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
                Update
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
                            return category.isShopping === false;
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
  fetchGroup: (groupId) => dispatch(fetchSingleGroupTasks(groupId)),
  updateGroupTask: (task) => dispatch(updateGroupTaskThunk(task)),
});

export default connect(mapState, mapDispatch)(UpdateGroupTaskModal);
