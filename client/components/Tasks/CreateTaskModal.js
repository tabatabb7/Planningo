import React, { Component } from "react";
import { connect } from "react-redux";
import Categories from "./Categories"
import {
  fetchTasksThunk,
  removeTaskThunk,
  addTaskThunk,
} from "../../store/tasks";
import "./taskmodal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class CreateTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      selected: "",
      description: "",
      points: 0,
      selected: "",
      // chosenGroup: [],
      error: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      if (this.state.name == "" || this.state.selected == "") {
        alert("task name OR group can't be empty!")
      } else {
        await this.props.addTask(this.state);
        await this.props.fetchTasks();
        this.setState({
          name: "",
          selected: "",
          description: "",
          points: 0
        });
        this.props.onClose();
      }
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

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  // cats() {
  //   const chosenGroup = this.props.groups.filter((group) => group.name === this.state.selected)
  //   console.log("Chosen!!!!!", chosenGroup)

  //   this.setState({chosenGroup: chosenGroup})
  // }


  render() {
    const { groups } = this.props.tasks;
    // const chosenGroup = this.props.groups.filter((group) => group.name === this.state.selected)
    // console.log("Chosen!!!!!", chosenGroup)


   const listCategories = this.props.groups.map((group) => group.categories)
  //  console.log('LIST CATEGORIES', listCategories)
   const dupCategories = listCategories.flat()
   let categories = []
   dupCategories.forEach((cat) => {
     if(!categories.includes(cat.name && !cat.groupId)) {
       categories.push(cat)
     }
   })
  //  console.log("CATEGORIES!!!!!--->", categories)

    if (!this.props.show) {
      return null;
    }

    return (
      <div>
        <div>{this.props.children}</div>
        <div className="task-modal-content">
          <div id="top-taskmodal-div">
            <div id="modal-title">NEW TASK</div>
            <button
              onClick={(e) => this.onClose(e)}
              className="close-modal-btn"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div id="lower-taskmodal-div">
            <form id="add-task-form" onSubmit={this.handleSubmit}>
              <label htmlFor="name">Task:</label>
              <input
                name="name"
                type="text"
                className="modal-input"
                onChange={this.handleChange}
                value={this.state.name}
              />

              <label htmlFor="description">Description:</label>
              <textarea
                name="description"
                type="text"
                rows="4"
                className="modal-input"
                onChange={this.handleChange}
                value={this.state.description}
              />
              <label htmlFor="points">Points:</label>
              <textarea
                name="points"
                type="text"
                className="modal-input"
                onChange={this.handleChange}
                value={this.state.points}
              />
            </form>


            <div id="task-box-categories">
              <h3 id="cat-title">Category</h3>
                {categories ?
                  categories.map((category)=>(
                    <div key={category.id} className="each-cat-wrap">
                    <div id="cat-icon-wrap"  style={{backgroundColor: category.color}}>
                    <img src={category.imageUrl} className="cat-icon"></img>
                    </div>
                      {category.name}
                 </div>
                  )): 'null'
                }
             </div> 

             {/* <div id="task-box-category">
              <h3 id="cat-title">Category</h3>
          {this.state.chosenGroup & this.state.chosenGroup.length > 0 ? 
          <Categories chosenGroup={this.state.chosenGroup}/> :
           'null'}
            </div> */}

            <form id="group-form" onSubmit={this.handleSubmit}>
              <label htmlFor="selected"></label>
              <select
                value={this.state.selected}
                onChange={this.handleChange}
                // onClick={this.cats}
                name="selected"
              >
                <option value="" disabled>
                  Select Group
                </option>
                {groups && groups.length
                  ? groups.map((group) => (
                      <option key={group.id}>{group.name} </option>
                    ))
                  : "There are no groups"}
              </select>
              <button type="submit" id="modal-submit-button">Add</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  tasks: state.tasks,
  groups: state.groups
});

const mapDispatch = (dispatch) => ({
  addTask: (task) => dispatch(addTaskThunk(task)),
  fetchTasks: (userId) => dispatch(fetchTasksThunk(userId)),
  deleteTask: (taskId) => dispatch(removeTaskThunk(taskId)),
});

export default connect(mapState, mapDispatch)(CreateTaskModal);
