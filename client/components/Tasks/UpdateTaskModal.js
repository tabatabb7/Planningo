import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTaskThunk } from "../../store/tasks";
import { fetchTasksThunk } from "../../store/tasks";
import { fetchGroupsThunk } from "../../store/allGroups";
import "./taskmodal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class UpdateTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.task.name,
      group: "",
      groupId: "",
      description: this.props.task.description,
      points: this.props.task.points,
      taskId: this.props.task.id,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchGroups();
    this.setState({
      groupId: this.props.groups.length ? this.props.groups[0].id : "",
      group: this.props.groups.length ? this.props.groups[0] : "",
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
      if (this.state.name == "") {
        this.setState({
          error: "Name can't be empty!",
        });
        return false;
      } else if (this.state.groupId == "") {
        this.setState({
          error: "Please select a group!",
        });
        return false;
      }
      await this.props.updateTask(this.state);
      this.props.onClose();
  }


  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    let categories = this.state.group.categories;
    let { groups } = this.props.tasks;

    if (!this.props.showTask || !this.props.selectedTask) {
      return null;
    }
    return (
      <div>
        <div className="task-modal-content">
          <div id="top-taskmodal-div">
            <div id="modal-title">{this.props.task.name}</div>
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
                className="modal-input name"
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
              <textarea
                name="points"
                type="text"
                className="modal-input points"
                onChange={this.handleChange}
                value={this.state.points}
              />


            <div id="group-category-wrap">
                <div id="modal-group-wrap">
                  <label htmlFor="groupId">Select Group:</label>
                  {!this.props.groups.length ? (
                    "You are not a part of any groups."
                  ) : (
                    <div id="select-group">
                      {this.props.groups.map((group) => (
                        <div
                          key={group.id}
                          className={
                            this.state.groupId === group.id
                              ? "each-select-group selected"
                              : "each-select-group"
                          }
                          onClick={() => {
                            this.setState({
                              group: group,
                              groupId: group.id,
                              categoryId: null,
                            });
                          }}
                        >
                          <img
                            src={group.imageUrl}
                            className="choose-group-image"
                          ></img>
                          {group.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
              </div>
              {<div> {this.state.error} </div>}
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
  fetchTasks: (userId) => dispatch(fetchTasksThunk(userId)),
  updateTask: (task) => dispatch(updateTaskThunk(task)),
  fetchGroups: () => dispatch(fetchGroupsThunk()),
});

export default connect(mapState, mapDispatch)(UpdateTaskModal);
