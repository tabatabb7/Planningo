import React from "react";
import { connect } from "react-redux";
import GroupTaskModal from "./GroupTaskModal";
import UpdateGroupTaskModal from "./UpdateGroupTask";
import { removeTaskThunk } from "../../store/tasks";
import { updateTaskCompletion } from "../../store/singletask";
import { fetchSingleGroupTasks } from "../../store/singleGroup";
import {
  postCompletedPointsThunk,
  removeCompletedPointsThunk,
} from "../../store/point";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import "./grouptasks.css";
import "../Tasks/Tasks.css";

class GroupTaskList extends React.Component {
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
      if (isCompleted === false) {
        await this.props.updateTaskCompletion(taskId, !isCompleted);
        await this.props.postAwardedPoints(taskId);
      } else {
        await this.props.updateTaskCompletion(taskId, !isCompleted);
        await this.props.removePoints(taskId);
      }
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
        <div id="task-box">
          <div className="task-box-header">Tasks -- {group.name}</div>
          <div className="task-box-header"><Link to={`/groups/${group.id}`}> Go back</Link></div>
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
                      <a onClick={(e) => this.showTaskModal(e, task.id)}>

                        {task.name}
                      </a>

    <UpdateGroupTaskModal
                        selectedTask={task.id === this.state.taskId}
                        task={task}
                        onClose={(e) => this.showTaskModal(e)}
                        showTask={this.state.showTask}
                        groupId={this.props.match.params.groupId}
                      />

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

                      <div>---worth {task.points} POINTS</div>

                      <button
                        onClick={() => this.handleDelete(task.id)}
                        className="deleteTask"
                      >
                        X
                      </button>
                    </div>
                  ))
                : "Your group has no tasks"}
            </div>
            <div id="just-another-layout-div"></div>
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
  userId: state.user.id,
  group: state.singleGroup,
});

const mapDispatch = (dispatch) => ({
  fetchGroup: (groupId) => dispatch(fetchSingleGroupTasks(groupId)),
  deleteTask: (taskId) => dispatch(removeTaskThunk(taskId)),
  updateTaskCompletion: (taskId, isCompleted) =>
    dispatch(updateTaskCompletion(taskId, isCompleted)),
  postAwardedPoints: (taskId) => dispatch(postCompletedPointsThunk(taskId)),
  removePoints: (taskId) => dispatch(removeCompletedPointsThunk(taskId)),
});

export default connect(mapState, mapDispatch)(GroupTaskList);
