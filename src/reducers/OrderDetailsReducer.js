const INITIAL_STATE = { orderDetails : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getOrderDetails':{
            return {
                orderDetails        : action.payload.data,
                loader      : action.payload.key === 1 ? false : true
            };
        }

        default:
            return state;
    }
};
