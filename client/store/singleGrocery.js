import axios from 'axios'

// intialState
const initialState = {}

// action constants
const GET_GROCERY_ITEM = 'GET_GROCERY_ITEM'
const UPDATE_GROCERY_ITEM = 'UPDATE_GROCERY_ITEM'

const getGroceryItem = grocery => ({ type: GET_GROCERY_ITEM, grocery})
const updateGroceryItem = grocery => ({ type: UPDATE_GROCERY_ITEM, grocery })

// thunk creators
export const fetchGroceryItemThunk = groceryId => async dispatch => {
  try {
    const { data: grocery } = await axios.get(`/api/groceries/${groceryId}`)
    dispatch(getGroceryItem(grocery))
  } catch (error) {
    console.error('Error fetching item!')
    console.error(error)
  }
}

export const updateSingleGroceryItem = grocery => async dispatch => {
  try {
    const { data: updatedItem } = await axios.put(`/api/items/${grocery.groceryId}`, grocery)
    dispatch(updateGroceryItem(updatedItem))
  } catch (error) {
    console.error('Error updating item!')
    console.error(error)
  }
}



export default function singleGroceryItemReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GROCERY_ITEM:
      return { ...state, ...action.grocery }
    case UPDATE_GROCERY_ITEM:
      return { ...state, ...action.grocery }
    default:
      return state
  }
}
