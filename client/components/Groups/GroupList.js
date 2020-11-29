import React from "react";
import { connect } from "react-redux";
import { updateGroupThunk } from "../../store/singleGroup";

import {
  fetchGroupsThunk,
  addGroupThunk,
  removeGroupThunk,
} from "../../store/allGroups";

/*
TODOS:
1. Don't allow user to enter empty group
2. Make add/edit modals
3. Cross out completed groups
4. Button to filter out completed groups
*/

class GroupList extends React.Component {
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
    this.props.fetchGroups(this.props.match.params.userId);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      await this.props.addGroup(this.state);
      this.setState({
        name: "",
      });
    } catch (err) {
      console.log("error creating group", err);
    }
  }

  async handleDelete(id) {
    try {
      await this.props.deleteGroup(id);
      this.props.fetchGroups();
    } catch (err) {
      console.error(err);
    }
  }

  // async updategroup(studentId) {
  //   try {
  //     await this.props.updateStudentThunk(studentId);
  //     this.props.fetchStudents();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  showModal(e) {
    this.setState({ showModal: true });
  }

  render() {
    let { groups } = this.props;
    console.log(groups, "inside the render grouplist");
    return (
      <div className="group-wrapper">
        <h1 className="tool-title">My Groups</h1>
        {!groups.length ? 'You are not a part of any groups.' : (
        <div id="group-box">
          {groups.map((group) => (
            <div key={group.id} className="singlegroup">
              {group.name}
              <button
                onClick={() => this.handleDelete(group.id)}
                className="deletegroup"
              >
                X
              </button>
            </div>
          ))}
        </div>
                  )}
        <form id="add-group-form" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Add Group:</label>
          <input
            name="name"
            type="text"
            onChange={this.handleChange}
            value={this.state.name}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => ({
  groups: state.groups,
  userId: state.user.id,
});

const mapDispatch = (dispatch) => ({
  fetchGroups: (userId) => dispatch(fetchGroupsThunk(userId)),
  deleteGroup: (groupId) => dispatch(removeGroupThunk(groupId)),
  addGroup: (group) => dispatch(addGroupThunk(group)),
  updateGroup: (group) => dispatch(updateGroupThunk(group)),
});

export default connect(mapState, mapDispatch)(GroupList);
