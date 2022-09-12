import React, { createContext, useContext, useReducer, useEffect } from 'react';

import reducer from '../reducers/cartReducer';

const initialState = {
  cart: [],
  quantity: 0,
  total: 0,
};

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };
  const increment = (id) => {
    dispatch({ type: 'INCREMENT', payload: id });
  };
  const decrement = (id) => {
    dispatch({ type: 'DECREMENT', payload: id });
  };
  const clear = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  useEffect(() => {
    dispatch({ type: 'TOTAL' });
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        increment,
        decrement,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};

export { CartContext, CartProvider };
