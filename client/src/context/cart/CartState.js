import React, { useReducer } from 'react';

import CartContext from './CartContext'
import CartReducer from './CartReducer'

import axios from 'axios'

import {
    GET_CART_ITEMS,
    DELETE_PRODUCT,
    ADD_CART_ITEM,
    CART_ERROR

} from '../types'


 const CartState = props => {
     
    const initialState = {
        cart: null,
        error: null,
        loading: true
     }

const [state, dispatch] = useReducer(CartReducer, initialState)


// Actions:

// Get user's cart 
    const getCartItems = async () => {
        

        const res = await axios.get('/api/cart')

        dispatch({
            type: GET_CART_ITEMS,
            payload: res.data
        })

        
    }

// Add item to user's cart 
const addToCart = async (data) => {
        

    const res = await axios.post('/api/cart',data)

    dispatch({
        type: ADD_CART_ITEM,
        payload: res.data
    })

    
}





    return (
        <CartContext.Provider 
        value={{
          cart: state.cart,
          error: state.error,
          loading: state.loading,
          getCartItems,
          addToCart
        }}>
            {props.children}
        </CartContext.Provider>
    )
}



export default CartState