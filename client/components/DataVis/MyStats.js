import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

const data = [
  { task: 1, points: 130 },
  { task: 2, points: 16 },
  { task: 3, points: 142 },
  { task: 4, points: 19 },
];

class MyStats extends React.Component {
  render() {
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

export default MyStats;
