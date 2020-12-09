import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "../../store";
import "./sidenav.css"
import { fetchGroupsThunk } from "../../store/allGroups";

class SideNav extends React.Component {
  constructor(props) {
    super(props);
  }
  // componentDidMount() {
  //   this.props.fetchGroups(this.props.userId);
  // }

  render() {
    let { groups, handleClick, isLoggedIn, user } = this.props;
    return (
      <div className="side-nav-wrapper">
        {isLoggedIn ? (
          <div id="rightlink">
            <img src={user.avatarUrl} id="user-icon"></img>
            {user.firstName}
            <React.Fragment>
              <h3 className="tool-title">My Groups</h3>
              {!groups.length ? (
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
  groups: state.groups,
  userId: state.user.id,
  user: state.user,
  isLoggedIn: !!state.user.id,
});

const mapDispatch = (dispatch) => ({
  fetchGroups: (userId) => dispatch(fetchGroupsThunk(userId)),
  handleClick: () => dispatch(logout()),
});

export default connect(mapState, mapDispatch)(SideNav);

SideNav.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
