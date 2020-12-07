import React from "react";
import { connect } from "react-redux";
import GroupTaskModal from "./GroupTaskModal";
import {updateItemBought } from "../../store/singleItem";
import { removeItemThunk } from "../../store/items";

import { fetchSingleGroup } from "../../store/singleGroup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
// import "./groupitems.css";

class GroupShoppingList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.showModal = this.showModal.bind(this);

  }

  componentDidMount() {
    this.props.fetchGroup(this.props.match.params.groupId);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleDelete(id) {
    try {
      await this.props.deleteItem(id);
      this.props.fetchGroup(this.props.match.params.groupId);
    } catch (err) {
      console.error(err);
    }
  }

  async toggleBought(taskId, isBought) {
    try {
      await this.props.updateTaskCompletion(taskId, !isBought);

      this.props.fetchGroup(this.props.match.params.groupId);
    } catch (err) {
      console.error(err);
    }
  }


  showModal(e) {
    this.setState({ show: !this.state.show });
  }

  render() {
    let items = this.props.group.items;
    let group = this.props.group;

    return (
      <div className="group-task-wrapper">
        <div id="group-task-box">
          <div className="group-task-box-header">
            Shopping List for {group.name}
          </div>
          <div className="group-task-box-body">

            <div id="group-task-box-categories">Category</div>

            {/* LIST OF items */}
            <div id="group-task-box-list">
              {items && items.length
                ? items.map((item) => (
                    <div key={item.id} className="group-singletask">
                      <button
                        onClick={() => this.toggleBought(item.id, item.isBought)
                        }

                        className="group-completeTask"
                      >
                        <div
                          className={
                            item.isBought
                              ? "check-circle complete"
                              : "check-circle incomplete"
                          }
                        >
                          <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                      </button>
                      {item.name}

                      <button
                        onClick={() => this.handleDelete(item.id)}
                        className="group-deleteTask"
                      >
                        X
                      </button>
                    </div>
                  ))
                : "Your group has no items"}
            </div>
            <div id="group-just-another-layout-div"></div>
          </div>
          <div id="group-add-button-div">
            <button
              onClick={(e) => {
                this.showModal(e);
              }}
              className="group-add-task-button"
            >
              <div id="ahhh">
                <FontAwesomeIcon icon={faPlusSquare} />
              </div>
              Add Item
            </button>
            <GroupTaskModal
              groupId={this.props.match.params.groupId}
              onClose={(e) => this.showModal(e)}
              show={this.state.show}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  items: state.items,
  userId: state.user.id,
  group: state.singleGroup
});

const mapDispatch = (dispatch) => ({
  fetchGroup: (groupId) => dispatch(fetchSingleGroup(groupId)),
  deleteItem: (itemId) => dispatch(removeItemThunk(itemId)),
  updateBought: (itemId, isBought) =>
    dispatch(updateItemBought(itemId, isBought)),
});

export default connect(mapState, mapDispatch)(GroupShoppingList);
