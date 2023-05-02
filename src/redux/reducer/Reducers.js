import {ADD_TO_CART, REMOVE_FROM_CART} from '../ActionTypes';

const reducers = (initialState = [], actions) => {
  switch (actions) {
    case ADD_TO_CART:
      return {...initialState, ...actions.payload};
    case REMOVE_FROM_CART:
      const deletedAray = initialState.filter((item, index) => {
        return index !== actions.payload;
      });

      return deletedAray;

    default:
      return initialState;
  }
};

export default reducers;
