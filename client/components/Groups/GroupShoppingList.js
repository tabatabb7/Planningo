import React from "react";
import { connect } from "react-redux";
import GroupTaskModal from "./GroupTaskModal";
import { removeTaskThunk } from "../../store/tasks";
import { updateTaskCompletion} from "../../store/singletask";
import { fetchSingleGroup } from "../../store/singleGroup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import "./grouptasks.css";

class GroupShoppingList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
    this.handleChange = this.handleChange.bind(this);
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

  render() {
    let tasks = this.props.group.tasks;
    let group = this.props.group;

    return (
      <div className="group-task-wrapper">
        <div id="group-task-box">
          <div className="group-task-box-header">
            GROUP Tasks -- {group.name}
          </div>
          <div className="group-task-box-body">
          <div id="group-task-box-assignedto">Assigned To:</div>

            <div id="group-task-box-categories">Category</div>

            {/* LIST OF TASKS */}
            <div id="group-task-box-list">
              {tasks && tasks.length
                ? tasks.map((task) => (
                    <div key={task.id} className="group-singletask">
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

                      <div>---worth {task.Task_Group.points} POINTS</div>

                      <button
                        onClick={() => this.handleDelete(task.id)}
                        className="group-deleteTask"
                      >
                        X
                      </button>
                    </div>
                  ))
                : "Your group has no tasks"}
            </div>
            <div id="group-just-another-layout-div"></div>
          </div>
          <div id="group-add-button-div">
            <button
              onClick={(e) => {
                this.showModal(e);
              }}
              className="group-add-task-button"
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
  group: state.singleGroup
});

const mapDispatch = (dispatch) => ({
  fetchGroup: (groupId) => dispatch(fetchSingleGroup(groupId)),
  deleteTask: (taskId) => dispatch(removeTaskThunk(taskId)),
  updateTaskCompletion: (taskId, isCompleted) =>
    dispatch(updateTaskCompletion(taskId, isCompleted)),
});

export default connect(mapState, mapDispatch)(GroupShoppingList);
