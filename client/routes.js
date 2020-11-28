import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { UserHome, HomePage, Login, Signup, UserGroups, Account, AccountSettings, GroceryHome, Calendar, TaskList, SingleTask, CreateTask} from "./components";
import { me } from "./store";

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/tasks" component={TaskList} />
        <Route exact path="/tasks/:taskId" component={SingleTask} />
        <Route exact path="/add" component={CreateTask} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
            <Route path="/groups" component={UserGroups} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/account/settings" component={AccountSettings} />
            <Route path="/grocery" component={GroceryHome} />
            <Route path="/calendar" component={Calendar} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
