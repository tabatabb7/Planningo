import React from "react";
import { connect } from "react-redux";
import { updateGroupThunk, fetchSingleGroup } from "../../store/singleGroup";
import { Link } from "react-router-dom";
import { removeGroupThunk } from "../../store/allGroups";


/* TODOS:
1. move users list to its own component
2. join button
3. view group info page where you can leave group
4. each  user pic in user list will link to the user's public profile : see UserPublicProfile in ./User
*/

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
        <h1 className="tool-title">Group: {group.name}</h1>
        <img src={group.imageUrl}></img>
        <h3>Description: {group.description}</h3>
        Users:
      {group.users ? (<div>
       {group.users.map((user) => (
              <div key={user.id}>
                  <img src={user.avatarUrl} />
                  {(() => { if(user.User_Group.role === "owner"){
                    return (<h3>{user.firstName} {user.lastName} 🌟 </h3>)
                  } else if (user.User_Group.role === "admin"){
                    return (<h3>
                      {user.firstName} {user.lastName} 🏅
                    </h3>)
                  } else {
                    return (<h3>
                      {user.firstName} {user.lastName}
                    </h3>)
                    }})()}
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
