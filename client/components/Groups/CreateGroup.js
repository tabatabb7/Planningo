import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { addGroupThunk } from "../../store/allGroups";
import "./creategroup.css";
import MiscIcons from '../Images/MiscIcons'

class CreateGroup extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      description: "",
      color: "",
      redirectTo: null,
      error: "",
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
    await this.props.addGroup(this.state);
    if (this.state.name === "") {
      this.setState({
        error: "Please enter a group name."
      })
      return false;
    } else {
            alert(
        `Your group "${this.state.name}" was created! Redirecting you to your groups page..`
      );
      this.setState({
        redirectTo: "/groups",
        name: "",
        description: "",
        color: "",
      });
    }
  }

  render() {
    const colors = [
      "#DFFF00",
      "#FFBF00",
      "#FF7F50",
      "#DE3163",
      "#9FE2BF",
      "#40E0D0",
      "#6495ED",
      "#CCCCFF",
    ];

    const singleColors = colors.map((color) => {
      return (
        <div
          key={color}
          style={{ backgroundColor: color }}
          className="pick-color"
          onClick={() => {
            this.setState({ color: color });
          }}
          value={color}
        ></div>
      );
    });

    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div className="create-group-wrapper">
          <div className="new-group-form-wrap">
            <div className="create-group-header">
              <h3>Create a Group</h3>
              If you would like to use Planningo as a personal task manager, you
              can create a group just for yourself!
            </div>
            <form id="add-group-form-create-group" onSubmit={this.handleSubmit}>
              <label htmlFor="name">Name:</label>
              <input
                name="name"
                type="text"
                className="modal-input"
                placeholder="Your new group's name"
                onChange={this.handleChange}
                value={this.state.name}
              />
              <label htmlFor="name">Description:</label>
              <input
                name="description"
                type="textarea"
                placeholder="Write a description"
                className="modal-input"
                onChange={this.handleChange}
                value={this.state.description}
              />
              <label htmlFor="color">Group Color:</label>
              <div id="color-picker">{singleColors}</div>
              <input
                name="color"
                placeholder="Choose a color"
                className="modal-input"
                value={this.state.color}
                readOnly={true}
              />
              {this.state.error}
              <div className="add-button">
                <button className="create-group-form-button" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

const mapDispatch = (dispatch) => ({
  addGroup: (group) => dispatch(addGroupThunk(group)),
});

export default connect(null, mapDispatch)(CreateGroup);
