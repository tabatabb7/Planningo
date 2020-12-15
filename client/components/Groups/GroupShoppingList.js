import React from "react";
import { connect } from "react-redux";
import GroupShoppingModal from "./GroupShoppingModal";
import { removeTaskThunk } from "../../store/tasks";
import { updateTaskCompletion } from "../../store/singletask";
import { fetchSingleGroupShopping } from "../../store/singleGroup";
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
    let categories = this.props.group.categories;

    return (
      <div className="task-wrapper">
        <div id="task-box">
          <div className="task-box-header">
            Shopping List - {group.name}
          </div>
          <div className="task-box-body">
            <div id="task-box-categories">
              Category
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
                : "null"}
            </div>

            {/* LIST OF TASKS */}
            <div id="task-box-list">
              {tasks && tasks.length
                ? tasks.map((task) => (
                    <div key={task.id} className="singletask">
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
                      {task.name}
                      <button
                        onClick={() => this.handleDelete(task.id)}
                        className="deleteTask"
                      >
                        X
                      </button>
                    </div>
                  ))
                : "This shopping list has no items!"}
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
              Add Item
            </button>
            <GroupShoppingModal
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
  group: state.singleGroup,
});

const mapDispatch = (dispatch) => ({
  fetchGroup: (groupId) => dispatch(fetchSingleGroupShopping(groupId)),
  deleteTask: (taskId) => dispatch(removeTaskThunk(taskId)),
  updateTaskCompletion: (taskId, isCompleted) =>
    dispatch(updateTaskCompletion(taskId, isCompleted)),
});

export default connect(mapState, mapDispatch)(GroupShoppingList);
