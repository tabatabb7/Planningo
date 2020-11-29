import React from "react";
import { connect } from "react-redux";
import { updateGroupThunk, fetchSingleGroup } from "../../store/singleGroup";
import {Link} from 'react-router-dom'

import {
  removeGroupThunk,
} from "../../store/allGroups";

class SingleGroup extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchGroup(this.props.match.params.groupId);
  }

  async handleDelete(id) {
    try {
      await this.props.deleteGroup(id);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    let { group } = this.props;

    return (
      <div key={group.id} id="group-info">
        <h1 className="tool-title">{group.name}</h1>
        <h3>{group.description}</h3>
        {/* <Link to="/groups/edit">Edit Group</Link> */}

      </div>
    );
  }
}

const mapState = (state) => ({
  group: state.singleGroup,
});

const mapDispatch = (dispatch) => ({
  fetchGroup: (userId) => dispatch(fetchSingleGroup(userId)),
  deleteGroup: (groupId) => dispatch(removeGroupThunk(groupId)),
  updateGroup: (group) => dispatch(updateGroupThunk(group)),
});

export default connect(mapState, mapDispatch)(SingleGroup);
