import React from "react";
import { connect } from "react-redux";
import { fetchSingleGroup } from "../../store/singleGroup";
import {
  fetchUserPointsThunk,
  fetchGroupPointsThunk,
  fetchUserGroupPointsThunk,
} from "../../store/point";
import "./grouprewards.css";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

class GroupRewards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "",
      points: "",
    };
  }
  async componentDidMount() {
    this.props.fetchGroup(this.props.match.params.groupId);
    // this.props.fetchUserPoints(this.props.userId);
    await this.props.fetchGroupPoints(this.props.match.params.groupId);
    // this.props.fetchUserGroupPoints(
    //   this.props.userId,
    //   this.props.match.params.groupId
    // );
  }

  pointCalc(points, userId) {
    return points
      .filter((user) => user.userId === userId)
      .reduce((accum, point) => {
        return accum + point.value;
      }, 0);
  }

  render() {
    const group = this.props.group;
    const points = this.props.points;
    console.log("THIS.PROPS POINTS!!!!", this.props.points);
    console.log("this.props inside grouprewards redner", this.props);
    console.log("GROUP USERS!!!!!-->", group.users);
    console.log("POINTS!!!!--->", points);

    return (
      <div className="group-reward-wrapper">
        <h1>Number of Points</h1>
        {points ? (
          group.users ? (
            <div id="group-reward-user-wrap">
              {group.users.map((user) => (
                <div key={user.id} id="group-reward-user">
                  <img src={user.avatarUrl} className="group-user-icon" />
                  {user.firstName}:{" "}
                  {points.length > 0 ? this.pointCalc(points, user.id) : 0}{" "}
                  points
                </div>
              ))}

              <h3>Group Stats</h3>
              <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
                <VictoryAxis
                  tickValues={this.props.points.map((user) => user.firstName)}
                />
                <VictoryAxis dependentAxis tickFormat={(x) => `${x / 1}`} />
                <VictoryBar
                  data={this.props.points}
                  x={"firstName"}
                  y={"value"}
                  style={{ data: { fill: "#ff7290" } }}
                />
              </VictoryChart>
            </div>
          ) : (
            "This group has no members."
          )
        ) : (
          <h1>Loading...</h1>
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
