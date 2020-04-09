import React from "react";
import { createAppContainer , createSwitchNavigator } from "react-navigation";
import { createStackNavigator} from "react-navigation-stack";
import { createDrawerNavigator } from 'react-navigation-drawer';

import { I18nManager } from "react-native";

import Login                    from '../components/Login'
import Home                     from '../components/Home'
import AboutApp                 from "../components/AboutApp";
import Faq                      from "../components/Faq";
import ContactUs                from "../components/ContactUs";
import Terms                    from "../components/Terms";
import InitScreen               from "../components/InitScreen";
import Basket                   from "../components/Basket";
import FilterCategory           from "../components/FilterCategory";
import Register                 from "../components/Register";
import ActivationCode           from "../components/ActivationCode";
import NewPassword              from "../components/NewPassword";
import ForgetPassword           from "../components/ForgetPassword";
import DetailsBasket            from "../components/DetailsBasket";
import MapLocation              from "../components/MapLocation";
import ChoosePayment            from "../components/ChoosePayment";
import FormPayment              from "../components/FormPayment";
import ConfirmPayment           from "../components/ConfirmPayment";
import MyOrders                 from "../components/MyOrders";
import Offers                   from "../components/Offers";
import Favorite                 from "../components/Favorite";
import OpenCamera               from "../components/OpenCamera";
import EditShop                 from "../components/EditShop";
import AddProduct               from "../components/AddProduct";
import DiscountCoupon           from "../components/DiscountCoupon";
import SearchHome               from "../components/SearchHome";
import DrawerCustomization      from "./DrawerCustomization";

//// amaaaany

import Provider                 from "../components/Provider";
import Product                  from "../components/Product";
import Notifications            from "../components/Notifications";
import Profile                  from "../components/Profile";
import OrderDetails             from "../components/OrderDetails";
import EditProfile              from "../components/EditProfile";
import DelegateOrderDetails     from "../components/DelegateOrderDetails";
import Confirmation             from "../components/Confirmation";
import UpdateProduct from "../components/UpdateProduct";
import ShareApp from "../components/ShareApp";
import Commission from "../components/Commission";
import CommissionPayment from "../components/CommissionPayment";
import BankAccounts from "../components/BankAccounts";
import Chat from "../components/Chat";
import Inbox from "../components/Inbox";


const drawerCust = (props) => (<DrawerCustomization {...props} />);

const drawerNavigator = createDrawerNavigator({
    Home                : Home,
    profile             : Profile,
    MyOrders            : MyOrders,
    Offers              : Offers,
    Favorite            : Favorite,
    AboutApp            : AboutApp,
    chat                : Chat,
    commission          : Commission,
    Faq                 : Faq,
    shareApp            : ShareApp,
    Terms               : Terms,
    ContactUs           : ContactUs,
},
{
    initialRouteName    : 'Home',
    drawerPosition      : I18nManager.isRTL ?'right' : 'left',
    drawerOpenRoute     : 'DrawerOpen',
    drawerCloseRoute    : 'DrawerClose',
    gesturesEnabled     : false,
    drawerToggleRoute   : 'DrawerToggle',
    drawerWidth         : '100%',
    contentComponent    : drawerCust
});



const appStack =  createStackNavigator({

	// Sh3wza

    drawerNavigator: {
        screen: drawerNavigator,
        navigationOptions: {
            header: null
        }
    },
    AddProduct : {
        screen: AddProduct,
        navigationOptions: {
            header: null
        }
    },
    DiscountCoupon : {
        screen: DiscountCoupon,
        navigationOptions: {
            header: null
        }
    },
    Basket: {
        screen: Basket,
        navigationOptions: {
            header: null
        }
    },
    SearchHome: {
        screen: SearchHome,
        navigationOptions: {
            header: null
        }
    },
    EditShop : {
        screen: EditShop,
        navigationOptions: {
            header: null
        }
    },
    OpenCamera : {
        screen: OpenCamera,
        navigationOptions: {
            header: null
        }
    },
    MyOrders : {
        screen: MyOrders,
        navigationOptions: {
            header: null
        }
    },
    DetailsBasket : {
        screen: DetailsBasket,
        navigationOptions: {
            header: null
        }
    },
    Favorite : {
        screen: Favorite,
        navigationOptions: {
            header: null
        }
    },
    Offers : {
        screen: Offers,
        navigationOptions: {
            header: null
        }
    },
    ConfirmPayment : {
        screen: ConfirmPayment,
        navigationOptions: {
            header: null
        }
    },
    FormPayment : {
        screen: FormPayment,
        navigationOptions: {
            header: null
        }
    },
    ChoosePayment : {
        screen: ChoosePayment,
        navigationOptions: {
            header: null
        }
    },
    FilterCategory : {
        screen: FilterCategory,
        navigationOptions: {
            header: null
        }
    },
    contactUs: {
        screen: ContactUs,
        navigationOptions: {
            header: null
        }
    },
    Terms: {
        screen: Terms,
        navigationOptions: {
            header: null
        }
    },
    MapLocation : {
        screen: MapLocation,
        navigationOptions: {
            header: null
        }
    },
    updateProduct: {
        screen: UpdateProduct,
        navigationOptions: {
            header: null
        }
    },




    /// Amaany
    delegateOrderDetails: {
        screen: DelegateOrderDetails,
        navigationOptions: {
            header: null
        }
    },
    editProfile: {
        screen: EditProfile,
        navigationOptions: {
            header: null
        }
    },
    profile: {
        screen: Profile,
        navigationOptions: {
            header: null
        }
    },
    orderDetails: {
        screen: OrderDetails,
        navigationOptions: {
            header: null
        }
    },
    product: {
        screen: Product,
        navigationOptions: {
            header: null
        }
    },
    notifications: {
        screen: Notifications,
        navigationOptions: {
            header: null
        }
    },
    provider: {
        screen: Provider,
        navigationOptions: {
            header: null
        }
    },
    confirmation: {
        screen: Confirmation,
        navigationOptions: {
            header: null
        }
    },
    faq: {
        screen: Faq,
        navigationOptions: {
            header: null
        }
    },
    aboutApp: {
        screen: AboutApp,
        navigationOptions: {
            header: null
        }
    },
    shareApp: {
        screen: ShareApp,
        navigationOptions: {
            header: null
        }
    },
    commission: {
        screen: Commission,
        navigationOptions: {
            header: null
        }
    },
    commissionPayment: {
        screen: CommissionPayment,
        navigationOptions: {
            header: null
        }
    },
    bankAccounts: {
        screen: BankAccounts,
        navigationOptions: {
            header: null
        }
    },
	inbox: {
		screen: Inbox,
		navigationOptions: {
			header: null
		}
	},

    chat: {
        screen: Chat,
        navigationOptions: {
            header: null
        }
    }
});

const authStack = createStackNavigator({
        Login: {
            screen: Login,
            navigationOptions: {
                header: null
            }
        },
        ForgetPassword: {
            screen: ForgetPassword,
            navigationOptions: {
                header: null
            }
        },
        NewPassword: {
            screen: NewPassword,
            navigationOptions: {
                header: null
            }
        },
        ActivationCode: {
            screen: ActivationCode,
            navigationOptions: {
                header: null
            }
        },

        Register: {
            screen: Register,
            navigationOptions: {
                header: null
            }
        },
        Terms: {
            screen: Terms,
            navigationOptions: {
                header: null
            }
        },

        MapLocation : {
            screen: MapLocation,
            navigationOptions: {
                header: null
            }
        },

    }
);

const AppNavigator = createSwitchNavigator({
	InitScreen: {
        screen: InitScreen,
        navigationOptions: {
            header: null
        }
    },
    auth    : authStack,
    app     : appStack,
});

export default createAppContainer(AppNavigator);
