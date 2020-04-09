const INITIAL_STATE = { cart : null , loader : true, };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'addCart':{
            return ({
                cart            : action.payload.data,
                loader          : action.payload.key === 1 ? false : true
            });
        }
        default:
            return state;
    }
};
