const INITIAL_STATE = { subCate : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'subCate': {
            return {
                subCate         : action.payload.data,
                loader          : action.payload.key === 1 ? false : true
            };
        }
        default:
            return state;
    }
}