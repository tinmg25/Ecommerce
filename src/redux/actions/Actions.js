import { 
    ADD_TO_CART, 
    ADD_TO_WISHLIST, 
    REMOVE_FROM_CART, 
    REMOVE_FROM_WISHLIST,
    CLEAR_CART,
 } from "../ActionTypes";

export const addItemToCart = data => ({
    type: ADD_TO_CART,
    payload: data,
});

export const removeItemFromCart = index => ({
    type: REMOVE_FROM_CART,
    payload: index,
});

export const addItemToWishlist = data => ({
    type: ADD_TO_WISHLIST,
    payload: data,
});

export const removeItemFromWishlist = index => ({
    type: REMOVE_FROM_WISHLIST,
    payload: index,
});

export const clearCart = () => {
    return {
        type: CLEAR_CART,
    };
};