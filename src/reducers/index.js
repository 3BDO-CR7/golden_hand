import { combineReducers } from 'redux';
import lang from './LangReducer';
import auth from './AuthReducer';
import profile from './ProfileReducer';
import aboutApp from './AboutAppReducer';
import contactUs from './ContactUsReducer';
import faq from './FaqReducer';
import terms from './TermsReducer';
import complaint from './SendComplaintReducer';
import home from './HomeReducer';
import changePassword from './ChangePasswordReducer';
import searchHome from './SearchHomeReducer';
import categoryHome from './CategoryHomeReducer';
import categoryProvider from './CategoryProviderReducer';
import SearchProvider from './SearchProvidersReducer';
import filterProvider from './FilterProvidersReducer';
import cities from './CitiesReducer';
import providerProducts from './ProviderProductsReducer';
import favorite from './FavoriteReducer';
import productsDetail from './ProductsDetailsReducer';
import addComment from './AddCommentReducer';
import cartList from './CartListReducer';
import cartProducts from './CartProductsReducer';
import notifications from './NotificationsReducer';
import userOrders from './UserOrdersReducer';
import orderDetails from './OrderDetailsReducer';
import register from './RegisterReducer';
import activeCode from './ActivationCodeReducer';
import forgetPassword from './ForgetPasswordReducer';
import newPassword from './NewPasswordReducer';
import offers from './OffersReducer';
import activationCode from './ActivationCodeReducer';
import homeProvider from './HomeProviderReducer';
import homeDelegate from './HomeDelegateReducer';
import addProduct from './AddProductReducer';
import subCate from './SubCategoriesReducer';
import deletProduct from './DeletProductReducer';
import updateProduct from './UpdateProductsReducer';
import chatReducer from './ChatReducer';

export default combineReducers({
    lang,
    auth,
    profile,
    aboutApp,
    contactUs,
    faq,
    terms,
    chatReducer,
    complaint,
    home,
    cities,
    changePassword,
    searchHome,
    categoryHome,
    categoryProvider,
    SearchProvider,
    filterProvider,
    providerProducts,
    favorite,
    productsDetail,
    addComment,
    cartList,
    cartProducts,
    notifications,
    userOrders,
    orderDetails,
    register,
    activeCode,
    forgetPassword,
    newPassword,
    offers,
    activationCode,
    homeProvider,
    homeDelegate,
    addProduct,
    subCate,
    deletProduct,
    updateProduct
});

