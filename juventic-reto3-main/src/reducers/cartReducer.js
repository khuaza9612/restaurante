const reducer = (state, action) => {
  switch (action.type) {
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'ADD_TO_CART':
      const alreadyInCart = state.cart.find((item) => item.id === action.payload.id);
      if (alreadyInCart) {
        const newCart = state.cart.map((item) => {
          if (item.id === action.payload.id) {
            const newQty = item.qty + 1;
            return { ...item, qty: newQty };
          }
          return item;
        });
        return { ...state, cart: newCart };
      }
      const newCart = [...state.cart, { ...action.payload, qty: 1 }];
      return { ...state, cart: newCart };

    case 'INCREMENT':
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload) {
            const newQty = item.qty + 1;
            return { ...item, qty: newQty };
          }
          return item;
        }),
      };

    case 'DECREMENT':
      return {
        ...state,
        cart: state.cart
          .map((item) => {
            if (item.id === action.payload) {
              const newQty = item.qty - 1;
              return { ...item, qty: newQty };
            }
            return item;
          })
          .filter((item) => item.qty !== 0),
      };

    case 'TOTAL':
      const { qty, total } = state.cart.reduce(
        (acc, item) => {
          const { price, qty } = item;
          const itemTotal = price * qty;
          acc.qty += qty;
          acc.total += itemTotal;
          return acc;
        },
        {
          qty: 0,
          total: 0,
        }
      );
      return { ...state, total, quantity: qty };

    default:
      throw new Error('No action matched');
  }
};

export default reducer;
