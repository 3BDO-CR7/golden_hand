const INITIAL_STATE = { orders  : [], loader : true, };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'homeDelegate':{
            return ({...state,
                orders              : action.payload.data,
                loader              : action.payload.key === 1 ? false : true
            });
        }
        default:
            return state;
    }
};
