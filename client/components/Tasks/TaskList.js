import React from "react";
import { connect } from "react-redux";
// import { updateSingleTask } from "../../store/singletask";
import CreateTaskModal from "./CreateTaskModal";
import UpdateTaskModal from "./UpdateTaskModal";
import "./Tasks.css";
import { fetchTaskThunk } from "../../store/tasks";
import { fetchTasksThunk, removeTaskThunk } from "../../store/tasks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      selected: "",
      show: false,
      showTask: false,
      taskId: ""
    };
    this.showModal = this.showModal.bind(this);
    this.showTaskModal = this.showTaskModal.bind(this);
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

  showModal(e) {
    this.setState({ show: !this.state.show });
  }

  async showTaskModal(e, taskName) {

    const task = await this.props.fetchTask(taskName)
    // this is coming back as undefined 
    console.log(task)

    const taskId = task[0].id

    this.setState({ taskId: taskId, showTask:!this.state.showTask });
  }

  render() {
    let { tasks, groups } = this.props.userTasks;

    return (
      <div className="task-wrapper">
        <div id="task-box">
          <div className="task-box-header">My Tasks
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
                    <div key={task.id} className="singletask">
                      <a onClick={e => this.showTaskModal(e, task.name)}> {task.name}</a>
                  
                      <UpdateTaskModal task={this.state.taskId} onClose={e => this.showTaskModal(e)} showTask={this.state.showTask}/>
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
  userTasks: state.tasks,
  userId: state.user.id,
});

const mapDispatch = (dispatch) => ({
  fetchTask: (taskName) => dispatch(fetchTaskThunk(taskName)),
  fetchTasks: () => dispatch(fetchTasksThunk()),
  deleteTask: (taskId) => dispatch(removeTaskThunk(taskId)),
  // updateTask: (task) => dispatch(updateSingleTask(task))
});

export default connect(mapState, mapDispatch)(TaskList);
