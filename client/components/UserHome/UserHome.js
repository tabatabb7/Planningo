import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./UserHome.css";
import { fetchUserTasksThunk } from "../../store/tasks";

class UserHome extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchUserTasks();
  }
  render() {
    console.log(this.props, "this.props inside render of UH");
    const { firstName } = this.props;
    const { tasks } = this.props;
    return (
      <div className="userhome-wrapper">
        <h3>{`Hello, ${firstName}`}</h3>
        <p>{`On your dashboard for today...`}</p>
        {tasks && tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => {
              <li>{task.name}</li>;
            })}
          </ul>
        ) : (
          <Link to="/tasks">Add a new task!</Link>
        )}
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    firstName: state.user.firstName,
    tasks: state.tasks,
  };
};
const mapDispatch = (dispatch) => ({
  fetchUserTasks: () => dispatch(fetchUserTasksThunk()),
});
export default connect(mapState, mapDispatch)(UserHome);

UserHome.propTypes = {
  firstName: PropTypes.string,
};
