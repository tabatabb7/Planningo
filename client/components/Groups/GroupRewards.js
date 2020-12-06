
import React from "react";
import { connect } from "react-redux";
import {
  fetchSingleGroup,
} from "../../store/singleGroup";
import "./grouprewards.css"

class GroupRewards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "",
    };
  }
  componentDidMount() {
    this.props.fetchGroup(this.props.match.params.groupId);
  }

  render() {
    const group = this.props.group;

    return (
      <div className="group-reward-wrapper">

        <h1>Number of Points</h1>
        {group.users ? (
          <div id="group-reward-user-wrap">
            {group.users.map((user) => (
              <div key={user.id} id="group-reward-user">
                <img src={user.avatarUrl} className="group-user-icon"/>
                {user.firstName}: {user.User_Group.points} points
              </div>
            ))}
          </div>
        ) : (
          "This group has no members."
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  userId: state.user.id,
  group: state.singleGroup,
  tasks: state.tasks,
});

const mapDispatch = (dispatch) => ({
  fetchGroup: (groupId) => dispatch(fetchSingleGroup(groupId)),
});

export default connect(mapState, mapDispatch)(GroupRewards);

