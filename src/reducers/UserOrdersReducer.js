const INITIAL_STATE = { userOrders : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getUserOrders':{
            return {
                userOrders        : action.payload.data,
                loader      : action.payload.key === 1 ? false : true
            };
        }

        default:
            return state;
    }
};
