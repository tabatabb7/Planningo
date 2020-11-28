import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTasksThunk, addTaskThunk, removeTaskThunk } from "../../store/tasks";

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      this.props.addTask(this.state);
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
            value={this.props.name}
          />
          <button type="submit">Add</button>
        </form>

        <h3>YOUR TASKS</h3>
        {tasks.map((task) => (
          <p key={task.id}>
            <Link to={`tasks/${task.id}`}> {task.name} </Link>
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
});

export default connect(mapState, mapDispatch)(TaskList);
