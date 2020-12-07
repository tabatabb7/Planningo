import React from "react";
import { connect } from "react-redux";
import { updateTaskCompletion } from "../../store/singletask";
import ShoppingModal from "./ShoppingModal";
import "./Tasks.css";
import { fetchTasksThunk, removeTaskThunk } from "../../store/tasks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";


class ShoppingList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
    this.showModal = this.showModal.bind(this);
  }
  componentDidMount() {
    this.props.fetchTasks();
  }

  async handleDelete(id) {
    try {
      await this.props.deleteTask(id);
      this.props.fetchTasks();
    } catch (err) {
      console.error(err);
    }
  }

  async toggleCompleted(taskId, isCompleted) {
    try {
      await this.props.updateTaskCompletion(taskId, !isCompleted);

      this.props.fetchTasks();
    } catch (err) {
      console.error(err);
    }
  }

  showModal(e) {
    this.setState({ show: !this.state.show });
  }

  render() {
    let { tasks, groups } = this.props.tasks;

    return (
      <div className="task-wrapper">

        <div id="task-box">
          <div className="task-box-header">Shopping List
          {/* <select name="selected">
          <option value="" disabled>
            Select Group
          </option>
          {groups && groups.length
            ? groups.map((group) => (
                <option key={group.id}>{group.name} </option>
              ))
            : "There are no groups"}
        </select> */}
        </div>
          <div className="task-box-body">
            <div id="task-box-categories">Category</div>

            {/* LIST OF TASKS */}
            <div id="task-box-list">
              {tasks && tasks.length
                ? tasks.map((task) => (
                    <p key={task.id} className="singletask">
                              <button
                        onClick={() => this.toggleCompleted(task.id, task.isCompleted)
                        }

                        className="group-completeTask"
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
                      {task.name}
                      <button
                        onClick={() => this.handleDelete(task.id)}
                        className="deleteTask"
                      >
                        X
                      </button>
                    </p>
                  ))
                : "You have no tasks"}
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
            <ShoppingModal
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
});

const mapDispatch = (dispatch) => ({
  fetchTasks: () => dispatch(fetchTasksThunk()),
  deleteTask: (taskId) => dispatch(removeTaskThunk(taskId)),
  updateTaskCompletion: (taskId, isCompleted) =>
  dispatch(updateTaskCompletion(taskId, isCompleted)),});

export default connect(mapState, mapDispatch)(ShoppingList);
