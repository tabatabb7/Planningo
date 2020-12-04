import React from "react";
import { connect } from "react-redux";
// import { updateSingleTask } from "../../store/singletask";
import TaskModal from './TaskModal'
import "./Tasks.css";
import {
  fetchTasksThunk,
  // addTaskThunk,
  removeTaskThunk,
} from "../../store/tasks";


class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      selected: "",
      show: false,
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
  }
  componentDidMount() {
    this.props.fetchTasks();
  }

  // handleChange(event) {
  //   this.setState({
  //     [event.target.name]: event.target.value,
  //   });
  // }

  // async handleSubmit(event) {
  //   event.preventDefault();
  //   try {
  //     await this.props.addTask(this.state);
  //     this.setState({
  //       name: "",
  //       selected: "",
  //     });
  //     await this.props.fetchTasks();
  //   } catch (err) {
  //     console.log("error creating task", err);
  //   }
  // }

  async handleDelete(id) {
    try {
      await this.props.deleteTask(id);
      this.props.fetchTasks();
    } catch (err) {
      console.error(err);
    }
  }

  showModal(e) {
    this.setState({ show:!this.state.show });
  }

  render() {
    let { tasks } = this.props.tasks
    // let { groups } = this.props.tasks

    return (
      <div className="task-wrapper">
        <div id="task-box">My Tasks
        <button  onClick={e => {this.showModal(e)}} className="add-task-button"> Add task </button>
        <TaskModal onClose={e => this.showModal(e)} show={this.state.show}/>
        {tasks && tasks.length ?
        tasks.map((task) => (
          <p key={task.id} className="singletask">
            {task.name}
            <button
              onClick={() => this.handleDelete(task.id)}
              className="deleteTask"
            >
              X
            </button>
          </p>
        )) : "You have no tasks"}
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
  // addTask: (task) => dispatch(addTaskThunk(task)),
  // updateTask: (task) => dispatch(updateSingleTask(task))
});


export default connect(mapState, mapDispatch)(TaskList);
