import axios from "axios";

/**
 * ACTION TYPES
 */

const GET_ITEM = "GET_ITEM";
const UPDATE_ITEM = "UPDATE_ITEM";
const UPDATE_BOUGHT = "UPDATE_BOUGHT";

/**
 * INITIAL STATE
 */

const initialState = {};

/**
 * ACTION CREATORS
 */
const getItem = (item) => ({
  type: GET_ITEM,
  item,
});

const updateItem = item => ({ type: UPDATE_ITEM, item})


const updateBought = (itemId, isBought) => ({
  type: UPDATE_BOUGHT,
  itemId,
  isBought
})

/**
 * THUNK CREATORS
 */

export const fetchSingleItem = (itemId) => async (dispatch) => {
  try {
    const { data: item } = await axios.get(
      `/api/items/${itemsId}`
    );

    dispatch(getItem(item));
  } catch (error) {
    console.log("error fetching item list item");
  }
};

export const updateSingleItem = itemId => async dispatch => {
  try {
    const { data: updatedItem } = await axios.put(`/api/items/${itemId}`)
    dispatch(updateItem(updatedItem))
  } catch (error) {
    console.error('Error updating task!')
    console.error(error)
  }
}

export const updateItemBought = (itemId, isBought) => async dispatch => {
  try {
 await axios.patch(`/api/items/${itemId}`, {
      updatedFields: { isBought },})
      dispatch(updateBought(taskId, isBought))
  } catch (error) {
    console.error('Error updating task!')
    console.error(error)
  }
}


export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEM:
      return action.item;
    case UPDATE_ITEM:
      return [...state, ...action.item];
    case UPDATE_BOUGHT:
      return [...state, ...action.item]
    default:
      return state;
  }
}
