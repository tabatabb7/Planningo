import React from 'react';
import PropTypes from 'prop-types';
// import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Route} from 'react-router-dom';

class Home extends React.Component {
  render() {
    const {isLoggedIn} = props;
    return <div>Home</div>;
  }
}
const mapState = (state) => {
  return {
    firstName: state.user.firstName,
    isLoggedIn: !!state.user.id,
  };
};

// export default connect(mapState)(Home);
export default Home;

Home.propTypes = {
  email: PropTypes.string,
};
