const INITIAL_STATE = { categoryProviders : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'searchProviders':{
            return ({...state, categoryProviders : action.payload.data, loader : action.payload.key === 1 ? false : true });
        }
        default:
            return state;
    }
};
