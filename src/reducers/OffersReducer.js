const INITIAL_STATE = { offers : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'offers':{
            return {
                offers              : action.payload.data,
                loader              : action.payload.key === 1 ? false : true
            };
        }

        default:
            return state;
    }
};
