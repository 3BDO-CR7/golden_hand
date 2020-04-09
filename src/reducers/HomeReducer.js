const INITIAL_STATE = { slider : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'sliderHome':{
            return ({...state, slider : action.payload.data, loader : action.payload.key === 1 ? false : true });
        }
        default:
            return state;
    }
};
