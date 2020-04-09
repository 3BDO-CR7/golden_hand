const INITIAL_STATE = { code : [] , loader : true, activeKey: 0, user: null };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'activeCode':{
            return {
                user            : action.payload,
                loader          : action.payload.key === 1 ? false : true,
                activeKey       : action.payload.key
            };
        }

        default:
            return state;
    }
};