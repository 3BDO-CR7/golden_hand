const INITIAL_STATE = { name : null, phone : null , address : null , socials : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getContactUs':{
            return {
                name        : action.payload.data.contacts.name,
                phone       : action.payload.data.contacts.phone,
                address     : action.payload.data.contacts.address,
                socials     : action.payload.data.socials,
                loader      : action.payload.key === 1 ? false : true
            };
        }

        default:
            return state;
    }
};
