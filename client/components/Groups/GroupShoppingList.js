import React from "react";
import { connect } from "react-redux";
import GroupTaskModal from "./GroupTaskModal";
import { removeTaskThunk } from "../../store/tasks";
import { updateTaskCompletion } from "../../store/singletask";
import UpdateGroupTaskModal from "./UpdateGroupTask";
import { Link } from "react-router-dom";

import { fetchSingleGroupShopping } from "../../store/singleGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faSort } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { format } from "date-fns";
import "./grouptasks.css";
import "../Tasks/Tasks.css";

class GroupShoppingList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.showTaskModal = this.showTaskModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchGroup(this.props.match.params.groupId);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleDelete(id) {
    try {
      await this.props.deleteTask(id);
      this.props.fetchGroup(this.props.match.params.groupId);
    } catch (err) {
      console.error(err);
    }
  }

  async toggleCompleted(taskId, isCompleted) {
    try {
      await this.props.updateTaskCompletion(taskId, !isCompleted);

      this.props.fetchGroup(this.props.match.params.groupId);
    } catch (err) {
      console.error(err);
    }
  }

  showModal(e) {
    this.setState({ show: !this.state.show });
  }

  showTaskModal(e, taskId) {
    this.setState({ taskId, showTask: !this.state.showTask });
  }

  render() {
    let tasks = this.props.group.tasks;
    let group = this.props.group;
    let categories = this.props.group.categories;

    return (
      <div className="task-wrapper">
        {/* <Link to={`/groups/${group.id}`}> Go back</Link> */}

        {this.state.show === true || this.state.showTask === true ? (
          <div id="darken-page"></div>
        ) : null}
        <div id="task-box">
          <div className="task-box-header"> Shopping List for
            <div id="grpname" style={{ color: group.color }}>
              {group.name}
            </div>
          </div>
          <div className="task-box-body">
            <div id="task-box-categories">
              <h3 id="category-title">Category</h3>
              <div className="each-category-wrap">All</div>

              {categories
                ? categories.map((category) => (
                    <div key={category.id} className="each-category-wrap">
                      <div
                        id="category-icon-wrap"
                        style={{ backgroundColor: category.color }}
                      >
                        <img
                          src={category.imageUrl}
                          className="category-icon"
                        ></img>
                      </div>
                      {category.name}
                    </div>
                  ))
                : null}
            </div>
            {/* LIST OF TASKS */}
            <div id="task-box-list">
              {tasks && tasks.length
                ? tasks.map((task) => (
                    <div key={task.id} className="singletask">
                      <div
                        id="catcolor"
                        style={{
                          backgroundColor: task.category
                            ? task.category.color
                            : "#E8E8E8",
                        }}
                      ></div>

                      <button
                        onClick={() =>
                          this.toggleCompleted(task.id, task.isCompleted)
                        }
                        className="completeTask"
                      >
                        <div
                          className={
                            task.isCompleted
                              ? "check-circle complete"
                              : "check-circle incomplete"
                          }
                        >
                          <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                      </button>

                      <a
                        onClick={(e) => this.showTaskModal(e, task.id)}
                        id="task-name-click"
                      >
                        <div id="name-date-wrap">
                          {task.name}
                          {/* <p id="date-created">
                            added {format(new Date(task.createdAt), "MMM d")}
                          </p> */}
                          <p id="date-created">
                            {format(new Date(task.start), "MMM d")}
                          </p>
                        </div>

                        {/* {task.category.name ? task.category.name : "No Category"} */}
                        {task.points > 0 ? (
                          <div id="numberpoints">
                            {task.points}
                            <img src="/assets/coin.png" className="coin"></img>
                          </div>
                        ) : null}
                      </a>

                      <UpdateGroupTaskModal
                        selectedTask={task.id === this.state.taskId}
                        task={task}
                        onClose={(e) => this.showTaskModal(e)}
                        showTask={this.state.showTask}
                        groupId={this.props.match.params.groupId}
                      />

                      <button
                        onClick={() => this.handleDelete(task.id)}
                        className="deleteTask"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </div>
                  ))
                : null}
            </div>
            <div id="just-another-layout-div">Filters</div>
          </div>
          <div id="add-button-div">
            <button
              onClick={(e) => {
                this.showModal(e);
              }}
              className="add-task-button"
            >
              <div id="ahhh">
                <FontAwesomeIcon icon={faPlusSquare} />
              </div>
              Add New Task
            </button>
            <GroupTaskModal
              groupId={this.props.match.params.groupId}
              onClose={(e) => this.showModal(e)}
              show={this.state.show}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  tasks: state.tasks,
  userId: state.user.id,
  group: state.singleGroup,
});

const mapDispatch = (dispatch) => ({
  fetchGroup: (groupId) => dispatch(fetchSingleGroupShopping(groupId)),
  deleteTask: (taskId) => dispatch(removeTaskThunk(taskId)),
  updateTaskCompletion: (taskId, isCompleted) =>
    dispatch(updateTaskCompletion(taskId, isCompleted)),
});

export default connect(mapState, mapDispatch)(GroupShoppingList);
