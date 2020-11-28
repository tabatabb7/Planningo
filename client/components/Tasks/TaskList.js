import React from "react";
import { connect } from "react-redux";
import { updateSingleTask } from "../../store/singletask";
import SingleTask from './SingleTask'
import "../styles/Tasks.css";


import {
  fetchTasksThunk,
  addTaskThunk,
  removeTaskThunk,
} from "../../store/tasks";


/*
TODOS:
1. Don't allow user to enter empty task
2. Make add/edit modals
3. Cross out completed tasks
4. Button to filter out completed tasks
*/

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      showModal: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
  }
  componentDidMount() {
    this.props.fetchTasks(this.props.match.params.userId);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      await this.props.addTask(this.state);
      this.setState({
        name: "",
      });
    } catch (err) {
      console.log("error creating task", err);
    }
  }

  async handleDelete(id) {
    try {
      await this.props.deleteTask(id);
      this.props.fetchTasks();
    } catch (err) {
      console.error(err);
    }
  }

  // async updateTask(studentId) {
  //   try {
  //     await this.props.updateStudentThunk(studentId);
  //     this.props.fetchStudents();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  showModal(e) {
    this.setState({ showModal: true });
  }


  render() {
    let { tasks } = this.props;

    return (
      <div className="task-wrapper">
        <h1 className="tool-title">My Tasks</h1>
        <div id="task-box">
        {tasks.map((task) => (
          <p key={task.id} className="singletask">
            {task.name}
            <button
              onClick={() => this.handleDelete(task.id)}
              className="deleteTask"
            >
              X
            </button>
          </p>
        ))}
        </div>
        <form id="add-task-form" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Add Task:</label>
          <input
            name="name"
            type="text"
            onChange={this.handleChange}
            value={this.state.name}
          />
          <button type="submit">Add</button>
        </form>

      </div>
    );
  }
}

const mapState = (state) => ({
  tasks: state.tasks,
  userId: state.user.id,
});

const mapDispatch = (dispatch) => ({
  fetchTasks: (userId) => dispatch(fetchTasksThunk(userId)),
  deleteTask: (taskId) => dispatch(removeTaskThunk(taskId)),
  addTask: (task) => dispatch(addTaskThunk(task)),
  updateTask: (task) => dispatch(updateSingleTask(task))
});

export default connect(mapState, mapDispatch)(TaskList);
