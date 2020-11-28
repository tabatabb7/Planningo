import React from "react";
import { connect } from "react-redux";
import { updateSingleTask } from "../../store/singletask";
import SingleTask from './SingleTask'

import {
  fetchTasksThunk,
  addTaskThunk,
  removeTaskThunk,
} from "../../store/tasks";

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

  async updateTask(studentId) {
    try {
      await this.props.updateStudentThunk(studentId);
      this.props.fetchStudents();
    } catch (err) {
      console.error(err);
    }
  }
  showModal(e) {
    this.setState({ showModal: true });
  }


  render() {
    let { tasks } = this.props;

    return (
      <div id="tasks">
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

        <h3>YOUR TASKS</h3>
        {tasks.map((task) => (
          <p key={task.id}>
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
