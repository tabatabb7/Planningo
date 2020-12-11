import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { connect } from "react-redux";
import { fetchSingleGroup } from "../../store/singleGroup";
import { fetchUserPointsThunk } from "../../store/point";

const data = [
  { task: 1, points: 130 },
  { task: 2, points: 16 },
  { task: 1, points: 142 },
  { task: 4, points: 19 },
];
//write a formula for data
//write a formula for custom tasks
class MyStats extends React.Component {
  componentDidMount() {
    this.props.fetchUserPoints(this.props.user.id);
  }
  convertData(points) {
    points;
  }
  render() {
    console.log(this.props, "this.props in the mystats render");
    const newData = this.props.points;
    // return (
    //   <div>
    //     <h1>My Stats</h1>
    //     <VictoryChart domainPadding={10} theme={VictoryTheme.material}>
    //       <VictoryAxis
    //         tickValues={[
    //           "Home",
    //           "Work",
    //           "Finance",
    //           "School",
    //           "Family",
    //           "Grocery",
    //           "Home",
    //         ]}
    //       />
    //       <VictoryAxis dependentAxis tickFormat={(x) => `${x / 1}`} />
    //       <VictoryBar data={newData} x={"taskId"} y={"value"} />
    //     </VictoryChart>
    //   </div>
    // );
    return (
      <div>
        <h1>My Stats</h1>
        <VictoryChart domainPadding={10} theme={VictoryTheme.material}>
          <VictoryAxis tickValues={["school", "work", "housework", "hobby"]} />
          <VictoryAxis dependentAxis tickFormat={(x) => `${x / 1}`} />
          <VictoryBar data={data} x={"task"} y={"points"} />
        </VictoryChart>
      </div>
    );
  }
}
const mapState = (state) => ({
  user: state.user,
  points: state.points,
});
const mapDispatch = (dispatch) => ({
  fetchUserPoints: (userId) => dispatch(fetchUserPointsThunk(userId)),
});
export default connect(mapState, mapDispatch)(MyStats);
