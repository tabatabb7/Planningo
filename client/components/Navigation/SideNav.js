import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "../../store";
import "./sidenav.css"

class SideNav extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let { handleClick, isLoggedIn, user, groups } = this.props;
    return (
      <div className="side-nav-wrapper">
        {isLoggedIn ? (
          <div id="rightlink">
            <img src={user.avatarUrl} id="user-icon" style={{backgroundColor: user.color}}></img>
            {user.firstName}
            <React.Fragment>
              <h3 className="tool-title">My Groups</h3>
              {!groups ? (
                "You are not a part of any groups."
              ) : (
                <div id="group-box">
                  {groups.map((group) => (
                    <div key={group.id} className="singlegroup">
                      <Link to={`/groups/${group.id}`}>
                        <img src={group.imageUrl}></img>
                        {group.name}
                      </Link>
                    </div>
                  ))}
                  <Link to={"/groups"}>Group Settings</Link>
                </div>
              )}
              <a href="#" onClick={handleClick}>
                <p>logout</p>
              </a>
            </React.Fragment>
          </div>
        ) : (
          <div id="rightlink">
            <React.Fragment>
              <Link to="/login">
                <div className="icon"></div>
                <p>sign in/</p>
                <p>register</p>
              </Link>
            </React.Fragment>
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
  groups: state.user.groups,
  isLoggedIn: !!state.user.id,
});

const mapDispatch = (dispatch) => ({
  handleClick: () => dispatch(logout()),
});

export default connect(mapState, mapDispatch)(SideNav);

SideNav.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
