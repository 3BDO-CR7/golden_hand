const INITIAL_STATE = { products  : [], subCategories: [], provider: null, loader : true, isRefreshed: false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'homeProvider':{
            return ({...state,
                products            : action.payload.products,
                subCategories       : action.payload.sub_categories,
                provider            : action.payload.provider_info ,
                loader              : action.payload.key === 1 ? false : true
            });
        }
        default:
            return state;
    }
};
