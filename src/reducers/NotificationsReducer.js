const INITIAL_STATE = { notifications : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getNotifications':{
            return {
                notifications        : action.payload.data,
                loader               : action.payload.key === 1 ? false : true
            };
        }

        default:
            return state;
    }
};
