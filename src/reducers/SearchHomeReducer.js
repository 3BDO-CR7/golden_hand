const INITIAL_STATE = { categories : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'searchHome':{
            return ({...state, categories : action.payload.data, loader : action.payload.key === 1 ? false : true });
        }
        default:
            return state;
    }
};
