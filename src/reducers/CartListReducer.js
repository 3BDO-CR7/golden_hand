const INITIAL_STATE = { cartList : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getCartList':{
            return {
                cartList        : action.payload.data,
                loader      : action.payload.key === 1 ? false : true
            };
        }

        default:
            return state;
    }
};
