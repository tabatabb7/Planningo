import React from "react";
import { connect } from "react-redux";
import { updateTaskCompletion } from "../../store/singletask";
import "./Tasks.css";
import CreateTaskModal from "./CreateTaskModal";
import UpdateTaskModal from "./UpdateTaskModal";
import { fetchShoppingItemsThunk, removeTaskThunk } from "../../store/tasks";
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
    this.props.fetchItems();
  }

  async handleDelete(id) {
    try {
      await this.props.deleteItem(id);
      this.props.fetchItems();
    } catch (err) {
      console.error(err);
    }
  }

  async toggleCompleted(taskId, isCompleted) {
    try {
      await this.props.updateTaskCompletion(taskId, !isCompleted);

      this.props.fetchItems();
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
          <div className="task-box-header">Shopping List</div>
          <div className="task-box-body">
            <div id="task-box-categories">div</div>

            {/* LIST OF TASKS */}
            <div id="task-box-list">
              {tasks && tasks.length
                ? tasks.map((task) => (
                    <div key={task.id} className="singletask">


                      <button
                        onClick={() =>
                          this.toggleCompleted(task.id, task.isCompleted)
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

                      <a onClick={(e) => this.showTaskModal(e, task.id)}>
                        {task.name}
                      </a>

                      <UpdateTaskModal
                        selectedTask={task.id === this.state.taskId}
                        task={task}
                        onClose={(e) => this.showTaskModal(e)}
                        showTask={this.state.showTask}
                      />
                      <button
                        onClick={() => this.handleDelete(task.id)}
                        className="deleteTask"
                      >
                        X
                      </button>
                    </div>
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
            <CreateTaskModal
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
  fetchItems: () => dispatch(fetchShoppingItemsThunk()),
  deleteItem: (taskId) => dispatch(removeTaskThunk(taskId)),
  updateTaskCompletion: (taskId, isCompleted) =>
    dispatch(updateTaskCompletion(taskId, isCompleted)),
});

export default connect(mapState, mapDispatch)(ShoppingList);
