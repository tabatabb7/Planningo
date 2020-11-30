import React from "react";
import { connect } from "react-redux";

import { addGroupThunk } from "../../store/allGroups";

class CreateGroup extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      description: "",
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
      if(this.state.name === ""){
        alert("group name can't be empty!")
      }
      this.setState({
        name: "",
        description: "",
      });
    } catch (err) {
      console.log("error creating group", err);
    }
  }

  render() {
    return (
      <div className="group-wrapper">
        <h1>Create Group</h1>

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

const mapDispatch = (dispatch) => ({
  addGroup: (group) => dispatch(addGroupThunk(group)),
});

export default connect(null, mapDispatch)(CreateGroup);
