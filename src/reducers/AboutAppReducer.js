const INITIAL_STATE = { aboutApp : null, loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getAboutApp':
            return { aboutApp: action.payload.data.about, loader: action.payload.key === 1 ? false : true };
        default:
            return state;
    }
};
