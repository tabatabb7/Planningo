import React from "react";
import { connect } from "react-redux";
import { updateGroupThunk, fetchSingleGroup } from "../../store/singleGroup";
import { Link } from "react-router-dom";
import { removeGroupThunk } from "../../store/allGroups";

class SingleGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchGroup(this.props.match.params.groupId);
  }

  async handleDelete(id) {
    try {
      await this.props.deleteGroup(id);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
   const group = this.props.group;

   return (
      <div key={group.id} id="group-info">
        Edit group
        <h1 className="tool-title">{group.name}</h1>
        <h3>{group.description}</h3>
        Users:
      {group.users ? (<div>
       {group.users.map((user) => (
              <div key={user.id}>
                  <img src={user.avatarUrl} />
                  <h3>
                    {user.firstName} {user.lastName}
                  </h3>
              </div>
            ))}</div>) : "This group has no members."}
      </div>
    );
  }
}


const mapState = (state) => ({
  group: state.singleGroup,
});

const mapDispatch = (dispatch) => ({
  fetchGroup: (group) => dispatch(fetchSingleGroup(group)),
  deleteGroup: (groupId) => dispatch(removeGroupThunk(groupId)),
  updateGroup: (group) => dispatch(updateGroupThunk(group)),
});

export default connect(mapState, mapDispatch)(SingleGroup);
