
const INITIAL_STATE = {user: null, loading: false, msg: '' };

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case ('login_user') :
            return ({...state, loading: true});
        case ('login_failed') :{
            // console.log('action____', action);
            return ({...state, loading: false, user: action.error, msg: action.error.msg });
        }
        case ('login_success') :
            return ({...state, loading: false, user: action.data, msg: action.data.msg });
        case ('user_logout') :
            return ({...state, user: null});
        case ('temp_auth') :
            return ({...state, user: null});
        default :
            return state;
    }

}