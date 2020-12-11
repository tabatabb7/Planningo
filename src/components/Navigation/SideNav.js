import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store";
import PropTypes from "prop-types";
import { fetchGroupsThunk } from "../../store/allGroups";
import "./sidenav.css";

class SideNav extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchGroups(this.props.user.id);
  }

  async handleDelete(id) {
    try {
      await this.props.deleteGroup(id);
      this.props.fetchGroups();
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    let { groups, user, handleClick, toggleSideNav } = this.props;
    return (
      <div className="side-nav-wrapper">
        <div id="nav-user-wrap">
          <div id="user-nav">
            <Link to="/account" onClick={toggleSideNav}>
              <img src={user.avatarUrl} id="user-icon"></img>{" "}
            </Link>
            {user.firstName}
          </div>

          <h4 className="nav-tool-title">My Groups</h4>
          {groups.length > 0 ? (
            "You are not a part of any groups."
          ) : (
            <div id="nav-group">
              {groups.map((group) => (
                <div
                  key={group.id}
                  id="each-nav-group"
                  style={{ backgroundColor: group.color }}
                >
                  <Link to={`/groups/${group.id}`} onClick={toggleSideNav}>
                    <img src={group.imageUrl} className="nav-group-icon"></img>
                    <div id="nav-group-name">{group.name}</div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="nav-user-links-wrap">
          <div className="nav-user-links a">
            <Link to="/groups" onClick={toggleSideNav}>
              Group Settings
            </Link>
          </div>
          <div className="nav-user-links b">
            <a href="#" onClick={handleClick}>
              logout
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  groups: state.groups,
  user: state.user,
});

const mapDispatch = (dispatch) => ({
  fetchGroups: (userId) => dispatch(fetchGroupsThunk(userId)),
  handleClick: () => dispatch(logout()),
});

export default connect(mapState, mapDispatch)(SideNav);

SideNav.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
