import React from "react";
import { connect } from "react-redux";
import { updateGroupThunk } from "../../store/singleGroup";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { fetchGroupsThunk, removeGroupThunk } from "../../store/allGroups";
import "./grouplist.css";

class GroupList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchGroups(this.props.match.params.userId);
  }

  async handleDelete(id) {
    await this.props.deleteGroup(id);
    this.props.fetchGroups();
  }

  render() {
    let { groups } = this.props;
    return (
      <div className="group-wrapper">
        <h1 className="tool-title">My Groups</h1>
        <Link to="/groups/create">
          {" "}
          <div className="create-group-btn">Create a Group </div>
        </Link>

        {!groups.length ? (
          "You are not a part of any groups."
        ) : (
          <div id="group-box">
            {groups.map((group) => (
              <div key={group.id} className="singlegroup">
                <Link to={`/groups/${group.id}`}>
                  <div
                    id="grp-img-wrap"
                    style={{ backgroundColor: group.color }}
                  >
                    <img className="group-image" src={group.imageUrl}></img>
                  </div>
                </Link>
                {/* <button
                  onClick={() => this.handleDelete(group.id)}
                  className="deletegroup"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button> */}
                <div
                  id="single-grp-info"
                  style={{ backgroundColor: group.color }}
                >
                  <Link to={`/groups/${group.id}`}>
                    <h2>{group.name}</h2>
                    <h4>{group.description}</h4>
                    Your role:{" "}
                    {group.User_Group.role === "admin" ? (
                      <div>{group.User_Group.role} 🌟   <Link to={`/groups/${group.id}`}>Edit Group</Link></div>
                    ) : (
                      group.User_Group.role
                    )}
                  </Link>
                </div>
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
