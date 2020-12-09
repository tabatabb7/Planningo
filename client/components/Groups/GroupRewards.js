import React from "react";
import { connect } from "react-redux";
import { fetchSingleGroup } from "../../store/singleGroup";
import {
  fetchUserPointsThunk,
  fetchGroupPointsThunk,
  fetchUserGroupPointsThunk,
} from "../../store/point";
import "./grouprewards.css";

class GroupRewards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "",
      points: "",
    };
  }
  componentDidMount() {
    this.props.fetchGroup(this.props.match.params.groupId);
    this.props.fetchUserPoints(this.props.userId);
    // this.props.fetchGroupPoints(this.props.match.params.groupId);
    // this.props.fetchUserGroupPoints(
    //   this.props.userId,
    //   this.props.match.params.groupId
    // );
  }

  render() {
    const group = this.props.group;
    const points = this.props.points;
    console.log(
      this.props.points,
      "this.props.points in render of grouprewards"
    );
    console.log(this.state, "this.state in render of grouprewards");
    points
      ? console.log(points, "this.props.points ternary")
      : console.log("didnt get this.props");

    // const userPoints = points.reduce((accum, point) => {
    //   return accum + point.value;
    // }, 0);

    return (
      <div className="group-reward-wrapper">
        <h1>Number of Points</h1>

        {group.users ? (
          <div id="group-reward-user-wrap">
            {group.users.map((user) => (
              <div key={user.id} id="group-reward-user">
                <img src={user.avatarUrl} className="group-user-icon" />
                {user.firstName}: {userPoints ? userPoints : 0} points
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
  points: state.points,
});

const mapDispatch = (dispatch) => ({
  fetchGroup: (groupId) => dispatch(fetchSingleGroup(groupId)),
  fetchUserPoints: (userId) => dispatch(fetchUserPointsThunk(userId)),
  fetchGroupPoints: (groupId) => dispatch(fetchGroupPointsThunk(groupId)),
  fetchUserGroupPoints: (userId, groupId) =>
    dispatch(fetchUserGroupPointsThunk(userId, groupId)),
});

export default connect(mapState, mapDispatch)(GroupRewards);
