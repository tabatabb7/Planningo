import React from "react";
import { connect } from "react-redux";
import { updateGroupThunk } from "../../store/singleGroup";
import {Link} from 'react-router-dom'


import {
  fetchGroupsThunk,
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
  }
  componentDidMount() {
    this.props.fetchGroups(this.props.match.params.userId);
  }

  async handleDelete(id) {
    try {
      await this.props.deleteGroup(id);
      this.props.fetchGroups();
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    let { groups } = this.props;
    return (
      <div className="group-wrapper">
        <h1 className="tool-title">My Groups</h1>
        <Link to="/groups/create">Create a Group</Link>
        {!groups.length ? 'You are not a part of any groups.' : (
        <div id="group-box">
          {groups.map((group) => (
            <div key={group.id} className="singlegroup">
              <Link to={`/groups/${group.id}`}>
                <img src={group.imageUrl}></img>
              {group.name}
              </Link>
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
  updateGroup: (group) => dispatch(updateGroupThunk(group)),
});

export default connect(mapState, mapDispatch)(GroupList);
