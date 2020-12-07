import axios from "axios";

/**
 * ACTION TYPES
 */

const GET_ITEMS = "GET_ITEMS";
const ADD_ITEM = "ADD_ITEM";
const DELETE_ITEM = "DELETE_ITEM";

/**
 * INITIAL STATE
 */

const initialState = [];

/**
 * ACTION CREATORS
 */
const getItems = (items) => ({ type: GET_ITEMS, items });
const addItem = (item) => ({ type: ADD_ITEM, item });
const deleteItem = (item) => ({ type: DELETE_ITEM, item });


/**
 * THUNK CREATORS
 */

export const fetchItemsThunk = () => async (dispatch) => {
  try {
    const { data: Items } = await axios.get(`/api/Items`);
    dispatch(getItems(Items));
  } catch (error) {
    console.log("error fetching Items");
  }
};

export const addItemThunk = (item) => async (dispatch) => {
  try {
    const { data: newItem } = await axios.post("/api/items/", item);
    dispatch(addItem(newItem));
  } catch (error) {
    console.error("Error adding item!");
    console.error(error);
  }
};

export const removeItemThunk = (itemId) => async (dispatch) => {
  try {
    await axios.delete(`/api/items/${itemId}`);
    dispatch(deleteItem(itemId));
  } catch (error) {
    console.error("Error deleting  item!");
    console.error(error);
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return action.items;
    case ADD_ITEM:
      return [...state, ...action.item];
    case DELETE_ITEM:
      return [...state];
    default:
      return state;
  }
}
