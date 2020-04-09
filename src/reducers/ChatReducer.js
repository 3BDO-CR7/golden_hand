const INITIAL_STATE = { rooms : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'get_rooms': {
            return {
                rooms  : action.payload.data,
                loader : action.payload.key === 1 ? false : true
            };
        }

        default:
            return state;
    }
}


