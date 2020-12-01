import axios from "axios";

/**
 * ACTION TYPES
 */

const GET_GROCERIES = "GET_GROCERIES";
const ADD_GROCERY_ITEM = "ADD_GROCERY_ITEM";
const DELETE_GROCERY_ITEM = "DELETE_GROCERY_ITEM";

/**
 * INITIAL STATE
 */

const initialState = [];

/**
 * ACTION CREATORS
 */
const getGroceries = (groceries, groupId) => ({
  type: GET_GROCERIES,
  groceries,
  groupId,
});
const addGroceryItem = (grocery, groupId) => ({
  type: ADD_GROCERY_ITEM,
  grocery,
  groupId,
});
const deleteGroceryItem = (grocery, groupId) => ({
  type: DELETE_GROCERY_ITEM,
  grocery,
  groupId,
});

/**
 * THUNK CREATORS
 */

export const fetchGroceriesThunk = (groupId) => async (dispatch) => {
  try {
    const { data: groceries } = await axios.get(
      `/api/groups/${groupId}/grocery`
    );

    dispatch(getGroceries(groceries));
  } catch (error) {
    console.log("error fetching groceries");
  }
};

export const addGroceryItemThunk = (grocery, groupId) => async (dispatch) => {
  try {
    const { data: newItem } = await axios.post(
      `/api/groups/${groupId}/grocery`,
      grocery
    );

    dispatch(addGroceryItem(newItem));
  } catch (error) {
    console.error("Error adding grocery item!");
    console.error(error);
  }
};

export const removeGroceryItemThunk = (groceryId, groupId) => async (
  dispatch
) => {
  try {
    await axios.delete(`/api/groups/${groupId}/grocery/${groceryId}`);
    dispatch(deleteGroceryItem(groceryId, groupId));
  } catch (error) {
    console.error("Error deleting grocery item!");
    console.error(error);
  }
};

export default function groupGroceriesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GROCERIES:
      return action.groceries;
    case ADD_GROCERY_ITEM:
      return [...state, action.grocery];
    case DELETE_GROCERY_ITEM:
      return [...state];
    default:
      return state;
  }
}
