import React, {Component} from 'react';
// import {connect} from 'react-redux';
import {withRouter, Route, Switch, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import{
  Home,
  Login,
  Register
} from './components';

//import store

class Routes extends Component {
  // componentDidMount() {
  //   this.props.loadInitialData();
  // }

  render() {
    // const {isLoggedIn} = this.props;
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/register" component={Register} />
    </Switch>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

// const mapDispatch = (dispatch) => {
//   return {
//     loadInitialData() {
//       dispatch(me());
//     },
//   };
// };

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
// export default withRouter(connect(mapState, mapDispatch)(Routes));
// export default withRouter(connect(mapState, null)(Routes));
export default Routes;

// Routes.propTypes = {
//   loadInitialData: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired,
// };
