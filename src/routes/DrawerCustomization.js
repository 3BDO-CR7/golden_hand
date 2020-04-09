import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager , Share , Platform} from "react-native";
import {Container, Content, Icon} from 'native-base';
import { DrawerItems } from 'react-navigation-drawer';

import styles from "../../assets/style";
import COLORS from '../../src/consts/colors'
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {logout, tempAuth, chooseLang} from "../actions";

class DrawerCustomization extends Component {
    constructor(props){
        super(props);
        this.state={
            user: [],
        }
    }

    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    Platform.OS === 'ios'? 'https://apps.apple.com/us/app/reesh-ريش/id1490248883?ls=1' : 'https://play.google.com/store/apps/details?id=com.app.reesh',
            })

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    filterItems(item){
        return item.routeName !== 'MyOrders' && item.routeName !== 'Profile' && item.routeName !== 'Favorite' && item.routeName !== 'Offers';
    }

    changeLang(){
        const lang = I18nManager.isRTL ? 'en' : 'ar';
        this.props.chooseLang(lang);
    }

    logout(){
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('Login');
        this.props.logout(this.props.user.token);
        this.props.tempAuth();
    }

    render() {

        let { user } = this.props;
        if ( user == null )
            user = {
                avatar      : '../../assets/images/img_five.png',
                name        : i18n.t('guest'),
            };

        return (
            <Container>
                <View style={[styles.bg_lightBrown, styles.width_40, styles.heightFull, styles.position_A, styles.bg_before, styles.zIndexDown]}/>
                <Content contentContainerStyle={styles.bgFullWidth}>


                    {/*<Image style={[styles.imageMask]} source={require('../../assets/images/MaskGro.png')}/>*/}

                    <TouchableOpacity
                        style       = {[styles.width_40 , styles.height_40 , styles.bg_lightBrown, styles.position_A, styles.centerContext, styles.top_30, styles.SelfRight]}
                        onPress     = {() => { this.props.navigation.closeDrawer()} }
                    >
                        <Icon style={[styles.text_midBrown, styles.textSize_22]} type="AntDesign" name='close' />
                    </TouchableOpacity>

                    <View style={[styles.marginVertical_10, styles.SelfLeft]}>

                        <View style={[styles.viewUser, styles.SelfLeft, styles.justifyCenter]}>
                            <View style={[styles.bg_midBrown, styles.width_150, styles.height_70, styles.position_A, styles.zIndexDown]}/>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('profile')} style={[styles.position_R, styles.flexCenter, styles.zIndexUp, styles.Width_100, styles.marginHorizontal_25, styles.top_30]}>
                                <Image style={[styles.width_90, styles.height_90, styles.Radius_5]} source={{ uri: user.avatar }}/>
                                <View style={styles.nameUser} onPress={() => this.props.navigation.navigate('profile')}>
                                    <Text style={[styles.textRegular, styles.textSize_16, styles.text_midBrown]}>{ user.name }</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={[styles.marginVertical_25]}>
                        <DrawerItems {...this.props}
                                     onItemPress={
                                         (route) => {
                                             if (route.route.key === 'logout') {
                                                 this.logout()
                                             }else {
                                                 route.route.key === 'shareApp' ? this.onShare(): this.props.navigation.navigate(route.route.key)
                                             }
                                         }
                                     }

                                     items                          = {this.props.auth !== null ? this.props.items : this.props.items.filter((item) =>  this.filterItems(item) ) }
                                     activeBackgroundColor          = {styles.bg_red}
                                     inactiveBackgroundColor        = 'transparent'
                                     activeLabelStyle               = {COLORS.red}
                                     labelStyle                     = {styles.drawerLabel}
                                     iconContainerStyle             = {styles.drawerIcon}
                                     itemStyle                      = {[styles.drawerItemStyle]}
                                     itemsContainerStyle            = {styles.marginVertical_10}
                        />
                        <TouchableOpacity onPress={() => this.changeLang()} style={{ flexDirection: 'row', top: -10, marginLeft: 30 }}>
                            <Icon  name='translate' type='MaterialIcons' style={{ color: COLORS.midBrown }} />
                            <Text style={[styles.textRegular, styles.textSize_16, { marginLeft: 15 } , styles.text_midBrown]}>{ I18nManager.isRTL ? 'English' : 'العربية' }</Text>
                        </TouchableOpacity>
                    </View>

                </Content>

                {
                    (this.props.auth == null || this.props.user == null) ?

                    <TouchableOpacity style={[styles.clickLogin, styles.bg_midBrown, styles.position_A, styles.width_150]} onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={[styles.textRegular, styles.textSize_16, styles.text_White,styles.paddingVertical_5, styles.textCenter]}>{i18n.translate('login')}</Text>
                    </TouchableOpacity>

                    :

                    <TouchableOpacity style={[styles.clickLogin, styles.bg_midBrown ,styles.position_A, styles.width_150]} onPress={() => this.logout()}>
                        <Text style={[styles.textRegular, styles.textSize_16, styles.text_White,styles.paddingVertical_5, styles.textCenter]}>{i18n.translate('logout')}</Text>
                    </TouchableOpacity>

                }

            </Container>
        );
    }
}

const mapStateToProps = ({ auth, profile }) => {
    return {
        auth    : auth.user,
        user    : profile.user
    };
};

export default connect(mapStateToProps, { logout, tempAuth, chooseLang })(DrawerCustomization);