import axios from "axios";

/**
 * ACTION TYPES
 */

const GET_GROCERIES = "GET_GROCERIES";
const ADD_GROCERY_ITEM = "ADD_GROCERY_ITEM";
const DELETE_GROCERY_ITEM = "DELETE_GROCERY_ITEM";
const TOGGLE_GROCERY_ITEM = "TOGGLE_GROCERY_ITEM";

/**
 * INITIAL STATE
 */

const initialState = [];

/**
 * ACTION CREATORS
 */
const getGroceries = (groceries) => ({ type: GET_GROCERIES, groceries });
const addGroceryItem = (grocery) => ({ type: ADD_GROCERY_ITEM, grocery });
const deleteGroceryItem = (grocery) => ({ type: DELETE_GROCERY_ITEM, grocery });
const toggleGroceryItem = (grocery) => ({
  type: TOGGLE_GROCERY_ITEM,
  grocery,
});

/**
 * THUNK CREATORS
 */

export const fetchGroceriesThunk = () => async (dispatch) => {
  try {
    const { data: groceries } = await axios.get(`/api/groceries`);
    dispatch(getGroceries(groceries));
  } catch (error) {
    console.log("error fetching groceries");
  }
};

export const addGroceryItemThunk = (grocery) => async (dispatch) => {
  try {
    const { data: newItem } = await axios.post("/api/groceries/", grocery);
    dispatch(addGroceryItem(newItem));
  } catch (error) {
    console.error("Error adding grocery item!");
    console.error(error);
  }
};

export const removeGroceryItemThunk = (groceryId) => async (dispatch) => {
  try {
    await axios.delete(`/api/groceries/${groceryId}`);
    dispatch(deleteGroceryItem(groceryId));
  } catch (error) {
    console.error("Error deleting grocery item!");
    console.error(error);
  }
};

export const toggleGroceryItemThunk = (groceryId) => async (dispatch) => {
  try {
    const newToggle = await axios.put(`/api/groceries/${groceryId}`, {
      isBought: !isBought,
    });
    dispatch(toggleGroceryItem(groceryId));
  } catch (error) {
    console.error("Error toggling grocery item!");
  }
};

export default function groceriesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GROCERIES:
      return action.groceries;
    case ADD_GROCERY_ITEM:
      return [...state, action.grocery];
    case DELETE_GROCERY_ITEM:
      return [...state];
    case TOGGLE_GROCERY_ITEM:
      return [...state, action.grocery];
    default:
      return state;
  }
}
