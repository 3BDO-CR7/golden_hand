const INITIAL_STATE = { products  : null, images: [], comments: [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'productDetails':{
            return ({...state,
                products            : action.payload,
                images              : action.payload.images,
                comments            : action.payload.comments ,
            });
        }
        default:
            return state;
    }
};
