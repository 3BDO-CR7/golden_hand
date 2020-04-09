const INITIAL_STATE = { favorite : null , loader : true, products: [] };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'favorite':{
            return ({
                favorite        : action.payload.data,
                loader          : action.payload.key === 1 ? false : true
            });
        }
		case 'get_favs':{
			return ({
				products        : action.payload.data,
				loader          : action.payload.key === 1 ? false : true
			});
		}
        default:
            return state;
    }
};
