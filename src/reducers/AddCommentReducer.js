const INITIAL_STATE = { comment : null , loader : true, };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'addComment':{
            return ({
                comment             : action.payload.data,
                loader              : action.payload.key === 1 ? false : true
            });
        }
        default:
            return state;
    }
};
