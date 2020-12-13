import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTasksThunk, addTaskThunk } from "../../store/tasks";
import "./taskmodal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { fetchGroupsThunk } from "../../store/allGroups";
import  Select  from 'react-select';

class CreateTaskModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      group: "",
      groupId: "",
      description: "",
      categoryId: null,
      points: 0,
      error: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchGroups();
    this.setState({
      groupId: this.props.groups.length ? this.props.groups[0].id : "",
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.name == "" || this.state.groupId == "") {
      alert("task name OR group can't be empty!");
    } else {
      await this.props.addTask(this.state);
      await this.props.fetchTasks();
      this.setState({
        name: "",
        categoryId: null,
        description: "",
        points: 0,
        error: null,
      });
      this.props.onClose();
    }
  }

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };


  render() {
    let categories = this.state.group.categories;
    // let mapcats;
    // {
    //   categories
    //     ? (mapcats = categories.map((category) => {
    //         return {
    //           key: category.id,
    //           label: <div style={{backgroundColor: category.color}}><img src={category.imageUrl}  className="select-cat-icon"/>  {category.name} </div>,
    //           value: category.id,
    //         };
    //       }))
    //     : (mapcats = null);
    // }


    // const taskStyles = {
    //   option: (provided, state) => ({
    //     ...provided,
    //     padding: 0,
    //   })
    // }

    if (!this.props.show) {
      return null;
    }
    return (
      <div>
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
              <label htmlFor="name">Name:</label>
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
              <input
                name="points"
                type="text"
                className="modal-input points"
                onChange={this.handleChange}
                value={this.state.points}
              />

              <div id="group-category-wrap">
                <div id="modal-group-wrap">
                  <label htmlFor="groupId">Group:</label>
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
                            this.setState({ group: group, groupId: group.id });
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

                  {/* <Select
                    onChange={(e) =>
                      this.setState({ categoryId: e.target.value || null })
                    }
                    options={mapcats}
                    styles={taskStyles}
                  /> */}
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
                      ? categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
              </div>

              <button type="submit" id="modal-submit-button">
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
  tasks: state.tasks,
  groups: state.groups,
});

const mapDispatch = (dispatch) => ({
  addTask: (task) => dispatch(addTaskThunk(task)),
  fetchTasks: (userId) => dispatch(fetchTasksThunk(userId)),
  fetchGroups: () => dispatch(fetchGroupsThunk()),
});

export default connect(mapState, mapDispatch)(CreateTaskModal);
