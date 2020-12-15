import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { addGroupThunk } from "../../store/allGroups";
import "./creategroup.css";

class CreateGroup extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      description: "",
      redirectTo: null,
      // showError: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  //clears boxes after submit
  async handleSubmit(event) {
    event.preventDefault();
    try {
      await this.props.addGroup(this.state);
      if (this.state.name === "") {
        alert("group name can't be empty!");
      }
      this.setState({
        redirectTo: "/groups",
      });
      alert(
        `Your group "${this.state.name}" was created! Redirecting you to your groups page..`
      );
    } catch (err) {
      console.log("error creating group", err);
    }
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div className="group-wrapper">
        <div className="create-group-header">
          <h3>Create your first group and add members! <br/>
            If you would like to use Planningo as a personal task manager,
            you can create a group for just yourself.</h3>
            </div>

          <form id="add-group-form" onSubmit={this.handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              name="name"
              type="text"
              placeholder="Your new group's name"
              onChange={this.handleChange}
              value={this.state.name}
            />
            <label htmlFor="name">Description:</label>
            <input
              name="description"
              type="textarea"
              placeholder="Write a description"
              onChange={this.handleChange}
              value={this.state.description}
            />
            <button type="submit">Add</button>
          </form>
        </div>
      );
    }
  }
}

const mapDispatch = (dispatch) => ({
  addGroup: (group) => dispatch(addGroupThunk(group)),
});

export default connect(null, mapDispatch)(CreateGroup);
