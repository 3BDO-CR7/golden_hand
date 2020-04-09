const INITIAL_STATE = { changePassword : null , key : 0, message: null };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getChangePassword':{
            return ({...state, changePassword  : action.payload.data, message : action.payload.msg, key : action.payload.key, });
        }

        default:
            return state;
    }
};
