import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,

} from '../ActionTypes';

const reducers = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];

    case REMOVE_FROM_CART:
      const deletedArray1 = state.filter((item, index) => {
        return index !== action.payload;
      });

      return deletedArray1;

    case CLEAR_CART:
      return {
        ...state, cartData: []
      }

    default:
      return state;
  }
};

export default reducers;
