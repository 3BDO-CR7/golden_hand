const INITIAL_STATE = { register : [] , loader : true , msg:'' };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'register':{
            return {
                register    : action.payload,
                loader      : action.payload.key === 1 ? false : true,
                msg         : action.payload.msg
            };
        }

        default:
            return state;
    }
};