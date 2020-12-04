
import React from "react";
import { connect } from "react-redux";
import GroupTaskModal from "./GroupTaskModal"
import { removeTaskThunk } from "../../store/tasks";
import {
  fetchSingleGroup,
  addGroupTaskThunk,
} from "../../store/singleGroup";
import "./grouptasks.css"

class GroupTaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      selected: "",
      show: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
  }
  componentDidMount() {
    this.props.fetchGroup(this.props.match.params.groupId);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      await this.props.addGroupTask(this.props.match.params.groupId, this.state);
      console.log(this.state)
      this.setState({
        name: "",
        selected: ""
      });
      await this.props.fetchGroup(this.props.match.params.groupId)
    } catch (err) {
      console.log("error creating task", err);
    }
  }

  async handleDelete(id) {
    try {
      await this.props.deleteTask(id);
      await this.props.fetchGroup(this.props.match.params.groupId)
    } catch (err) {
      console.error(err);
    }
  }

  showModal(e) {
    this.setState({ show: !this.state.show });
  }


  render() {
    let tasks  = this.props.group.tasks
    let group = this.props.group

    return (
      <div className="group-task-wrapper">
        <h1 className="group-tool-title">Group Tasks</h1>
        <div id="group-task-box">
        <button  onClick={e => {this.showModal(e)}} className="add-group-task-button"> Add task </button>
        <GroupTaskModal groupId={this.props.match.params.groupId} onClose={e => this.showModal(e)} show={this.state.show}/>
        {tasks && tasks.length ? 
        tasks.map((task) => (
          <p key={task.id} className="groupsingletask">
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
  group: state.singleGroup
});

const mapDispatch = (dispatch) => ({
  fetchGroup: (groupId) => dispatch(fetchSingleGroup(groupId)),
  deleteTask: (taskId) => dispatch(removeTaskThunk(taskId)),
  addGroupTask: (groupId, task) => dispatch(addGroupTaskThunk(groupId, task)),
  updateTask: (task) => dispatch(updateSingleTask(task))
});

export default connect(mapState, mapDispatch)(GroupTaskList);

