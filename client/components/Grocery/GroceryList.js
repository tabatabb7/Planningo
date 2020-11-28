import React from "react";
import { connect } from "react-redux";
// import { updateSingleGroceryItem } from "../../store/singleGrocery";

import {
  fetchGroceriesThunk,
  addGroceryItemThunk,
  removeGroceryItemThunk,
} from "../../store/groceries";

class GroceryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      showModal: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
  }
  componentDidMount() {
    this.props.fetchItems(this.props.match.params.userId);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      await this.props.addItem(this.state);
      this.setState({
        name: "",
      });
    } catch (err) {
      console.log("error creating grocery item", err);
    }
  }

  async handleDelete(id) {
    try {
      await this.props.deleteItem(id);
      this.props.fetchItems();
    } catch (err) {
      console.error(err);
    }
  }

  // async updateTask(studentId) {
  //   try {
  //     await this.props.updateStudentThunk(studentId);
  //     this.props.fetchStudents();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  showModal(e) {
    this.setState({ showModal: true });
  }


  render() {
    let { groceries } = this.props;

    return (
      <div id="groceries-wrap">
        <form id="add-grocery-form" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Add Grocery Item:</label>
          <input
            name="name"
            type="text"
            onChange={this.handleChange}
            value={this.state.name}
          />
          <button type="submit">Add</button>
        </form>

        <h3>My Groceries</h3>
        {groceries.map((grocery) => (
          <p key={grocery.id}>
            {grocery.name}
            <button
              onClick={() => this.handleDelete(grocery.id)}
              className="delete-item"
            >
              X
            </button>
          </p>
        ))}
      </div>
    );
  }
}

const mapState = (state) => ({
  groceries: state.groceries,
  userId: state.user.id,
});

const mapDispatch = (dispatch) => ({
  fetchItems: (userId) => dispatch(fetchGroceriesThunk(userId)),
  deleteItem: (groceryId) => dispatch(removeGroceryItemThunk(groceryId)),
  addItem: (grocery) => dispatch(addGroceryItemThunk(grocery)),
  // updateItem: (grocery) => dispatch(updateSingleGroceryItem(grocery))
});

export default connect(mapState, mapDispatch)(GroceryList);
