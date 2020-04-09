const INITIAL_STATE = { Terms : null, loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getTerms':
            return { Terms: action.payload.data.terms, loader: action.payload.key === 1 ? false : true };
        default:
            return state;
    }
};
