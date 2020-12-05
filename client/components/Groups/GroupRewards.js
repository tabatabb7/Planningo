
import React from "react";
import { connect } from "react-redux";
import { removeTaskThunk } from "../../store/tasks";
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
    let tasks  = this.props.group.tasks
    let group = this.props.group

    return (
      <div className="group-task-wrapper">
        <h1>Group Rewards</h1>

      </div>
    );
  }
}

const mapState = (state) => ({
  tasks: state.tasks,
  userId: state.user.id,
  group: state.singleGroup
});

const mapDispatch = (dispatch) => ({
  fetchGroup: (groupId) => dispatch(fetchSingleGroup(groupId)),
  deleteTask: (taskId) => dispatch(removeTaskThunk(taskId)),
  addGroupTask: (groupId, task) => dispatch(addGroupTaskThunk(groupId, task)),
});

export default connect(mapState, mapDispatch)(GroupRewards);

