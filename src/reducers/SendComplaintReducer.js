const INITIAL_STATE = { message : '' , loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'complaint':{
            return {
                message         : action.payload,
                loader          : action.payload.key === 1 ? false : true
            };
        }

        default:
            return state;
    }
};
