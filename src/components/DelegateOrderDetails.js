import React, {Component} from "react";
import {
    View,
    Text,
    Image,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    FlatList,
    I18nManager,
    ScrollView,
    Animated
} from "react-native";
import {Container, Content, Icon, Header, Left, Button, Body, Title, Right, Textarea} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import {DoubleBounce} from "react-native-loader";
import * as Animatable from 'react-native-animatable';
import {connect} from "react-redux";
import COLORS from '../../src/consts/colors'
import Swiper from 'react-native-swiper';
import Modal from "react-native-modal";
import {NavigationEvents} from "react-navigation";
import {getOrderDetails, getCancelOrder, getDeleteOrder, getAcceptDelegateOrder, getFinishOrder} from '../actions'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;



class DelegateOrderDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: null,
            isModalVisible: false,
            loader: false,
            reason: '',
            isSubmitted: false,
        }
    }

    _keyExtractor = (item, index) => item.id;

    renderItems = (item , key) => {
        return(
            <View
                style       = {[styles.position_R , styles.flex_45, {marginTop:25}, styles.height_200, styles.marginHorizontal_10]}
                key         = { key }
                // onPress     = {() => this.props.navigation.navigate('product', { id : item.id })}
            >
                <View style={[styles.lightOverlay, styles.Border]} />
                <View style={[styles.bg_White, styles.Border]}>
                    <View style={[styles.rowGroup, styles.paddingHorizontal_5 , styles.paddingVertical_5]}>
                        <View style={[styles.flex_100, styles.position_R]}>
                            <Image
                                style           = {[styles.Width_100 , styles.height_100, styles.flexCenter]}
                                source          = {{uri:item.product_info.image}}
                                resizeMode      = {'cover'}
                            />

                        </View>
                    </View>
                    <View style={[styles.overHidden, styles.paddingHorizontal_10, styles.marginVertical_5]}>
                        <Text
                            style           = {[styles.text_gray, styles.textSize_14, styles.textRegular, styles.Width_100, styles.textLeft]}
                            numberOfLines   = { 1 } prop with
                            ellipsizeMode   = "head"
                        >
                            {item.product_info.product_name}
                        </Text>
                        <Text style={[styles.text_light_gray, styles.textSize_13, styles.textRegular, styles.Width_100, styles.textLeft]}>
                            {item.product_info.product_category} - {item.product_info.product_sub_category}
                        </Text>
                        <View style={[styles.rowGroup]}>
                            <Text style={[styles.text_red, styles.textSize_13, styles.textRegular,styles.textLeft, styles.borderText, styles.paddingHorizontal_5]}>
                                {item.product_info.total_price} {i18n.t('RS')}
                            </Text>
                            <Text style={[styles.text_red, styles.textSize_13, styles.textRegular,styles.textLeft,{borderWidth:1 , borderColor:COLORS.light_red , textAlign: 'center'}, styles.paddingHorizontal_5]}>
                                {item.product_info.product_count}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

        );
    };


    componentWillReceiveProps(nextProps) {
        this.setState({loader: false , isSubmitted: false});

    }

    componentWillMount(){
        this.setState({loader: true});
        setTimeout(() => this.props.getOrderDetails(this.props.lang, this.props.navigation.state.params.order_id), 2000)

    }

    renderFinishOrder(){
        if (this.state.isSubmitted){
            return(
                <View style={[{ justifyContent: 'center', alignItems: 'center' , marginBottom:20  , marginTop: 20}]}>
                    <DoubleBounce size={20} color={COLORS.darkBrown} style={{ alignSelf: 'center' }} />
                </View>
            )
        }

        return (
            <TouchableOpacity
                onPress={() => this.finishOrder()}
                style={[styles.cartBtn, styles.SelfCenter, {marginBottom: 20 , marginTop: 20}]}>
                <Text
                    style={[styles.textRegular, styles.text_White, styles.textSize_14, styles.textLeft]}>{i18n.t('finishOrder')}</Text>
            </TouchableOpacity>
        );
    }

    finishOrder(){
        this.setState({ isSubmitted: true });
        this.props.getFinishOrder(this.props.lang, this.props.navigation.state.params.order_id , this.props.user.token  , this.props )
    }

    renderAcceptOrder(){
        if (this.state.isSubmitted){
            return(
                <View style={[{ justifyContent: 'center', alignItems: 'center', alignSelf:'center' , marginVertical: 15 }]}>
                    <DoubleBounce size={20} color={COLORS.darkBrown} style={{ alignSelf: 'center' }} />
                </View>
            )
        }

        return (
            <View style={[styles.Width_100 , styles.directionRowSpace , styles.paddingHorizontal_10, styles.marginVertical_15]}>
                <TouchableOpacity
                    onPress={() => this.acceptOrder()}
                    style={[styles.cartBtn, styles.SelfCenter, {marginBottom: 20}]}>
                    <Text
                        style={[styles.textRegular, styles.text_White, styles.textSize_14, styles.textLeft]}>{i18n.t('ok')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.cancelProviderOrder()}
                    style={[styles.cartBtn, styles.SelfCenter, {
                        marginBottom: 20,
                        backgroundColor: '#8f8f8f96',
                    }]}>
                    <Text
                        style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft]}>{i18n.t('refuse')}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    acceptOrder(){
        this.setState({ isSubmitted: true });
        this.props.getAcceptDelegateOrder(this.props.lang, this.props.navigation.state.params.order_id , this.props.user.token  , this.props )
    }


    cancelProviderOrder(){
        this.setState({ isSubmitted: true });
        this.props.getCancelOrder(this.props.lang, this.props.navigation.state.params.order_id , null , this.props.user.token , this.props )
    }


    componentDidMount() {
        this.runPlaceHolder();
    }

    runPlaceHolder() {
        if (Array.isArray(this.loadingAnimated) && this.loadingAnimated.length > 0) {
            Animated.parallel(
                this.loadingAnimated.map(animate => {
                    if (animate && animate.getAnimated) {
                        return animate.getAnimated();
                    }
                    return null;
                }),
                {
                    stopTogether: false,
                }
            ).start(() => {
                this.runPlaceHolder();
            })
        }
    }

    _renderRows(loadingAnimated, numberRow, uniqueKey) {
        let shimmerRows = [];
        for (let index = 0; index < numberRow; index++) {
            shimmerRows.push(
                <ShimmerPlaceHolder
                    key={`loading-${index}-${uniqueKey}`}
                    ref={(ref) => loadingAnimated.push(ref)}
                    style={{marginVertical:7, alignSelf: 'center'}}
                    width={width - 20}
                    height={100}
                    colorShimmer={['#ffffff75', COLORS.lightBrown, '#ffffff75']}
                />
            )
        }

        return (
            <View >
                {shimmerRows}
            </View>
        )
    }

    onFocus() {
        this.componentWillMount();
    }


    render() {

        this.loadingAnimated = [];

        return (
            <Container>
                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent
                                onPress={() => this.props.navigation.navigate('MyOrders')}>
                            <Icon style={[styles.text_black, styles.textSize_22]} type="AntDesign" name='right'/>
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                    <Title
                        style={[styles.textRegular, styles.text_black, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>{i18n.t('orderDet')}</Title>
                    </Body>
                </Header>
                <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>
                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>
                        <NavigationEvents onWillFocus={() => this.onFocus()}/>
                        {
                            this.state.loader ?
                                this._renderRows(this.loadingAnimated, 5, '5rows') :
                                this.props.orderDetails?
                               <View>
                                    <View style={[styles.position_R, styles.flexCenter, styles.Width_90, {marginTop: 20}]}>
                                       <View style={[styles.lightOverlay, styles.Border]}></View>
                                       <View
                                           style={[styles.rowGroup, styles.bg_White, styles.Border, styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                           <View style={[styles.icImg, styles.flex_30]}>
                                               <Image style={[styles.icImg]}
                                                      source={{uri: this.props.orderDetails.provider.avatar}}/>
                                           </View>
                                           <View style={[styles.flex_70]}>
                                               <View style={[styles.rowGroup]}>
                                                   <Text
                                                       style={[styles.textRegular, styles.darkBrown]}>{this.props.orderDetails.provider.name}</Text>
                                               </View>
                                               <View style={[styles.overHidden]}>
                                                   <Text
                                                       style={[styles.textRegular, styles.text_gray, styles.Width_100, styles.textLeft]}>{this.props.orderDetails.provider.phone}</Text>
                                               </View>
                                               <View style={[styles.overHidden, styles.rowGroup]}>
                                                   <View style={[{ flexDirection:'row',
                                                       alignItems:'center',}]}>
                                                       <Icon style={[styles.text_bold_gray, styles.textSize_12]} type="Feather" name='map-pin' />
                                                       <Text style={[styles.textRegular , styles.text_bold_gray, styles.marginHorizontal_5 ,styles.textSize_12]}>
                                                           {this.props.orderDetails.provider.address}
                                                       </Text>
                                                   </View>
                                                   <Text
                                                       style={[styles.textRegular, styles.text_bold_gray,styles.textSize_12]}>{this.props.orderDetails.provider.date}</Text>
                                               </View>
                                           </View>
                                           <TouchableOpacity
                                               style={[styles.width_40, styles.height_40, styles.flexCenter, styles.bg_transRed, styles.borderLightOran, styles.marginVertical_5, styles.position_A, styles.top_5, styles.right_0]}>
                                               <Text
                                                   style={[styles.textRegular, styles.text_red]}>{this.props.orderDetails.total_quantity}</Text>
                                           </TouchableOpacity>
                                       </View>
                                   </View>

                                   <View
                                       style={[styles.position_R, styles.flexCenter, styles.Width_90, {marginTop: 20}]}>
                                       <View style={[styles.lightOverlay, styles.Border]}></View>
                                       <View
                                           style={[styles.rowGroup, styles.bg_White, styles.Border, styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                           <Text
                                               style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft, {marginBottom: 10}]}>{i18n.t('aboutClient')}</Text>
                                           <View style={[styles.notiBlock, {
                                               borderBottomWidth: 0,
                                               marginBottom: 0
                                           }]}>
                                               <Image
                                                   source={{uri: this.props.orderDetails.user.avatar}}
                                                   resizeMode={'cover'}
                                                   style={styles.restImg}/>
                                               <View style={[styles.directionColumn, {flex: 1}]}>
                                                   <Text
                                                       style={[styles.textRegular, styles.text_midBrown, styles.textSize_14, styles.textLeft, {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{this.props.orderDetails.user.name}</Text>
                                                   <Text
                                                       style={[styles.textRegular, styles.text_gray, styles.textSize_14, styles.textLeft, {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{this.props.orderDetails.user.phone}</Text>
                                                   <View style={[{ flexDirection:'row',
                                                       alignItems:'center',}]}>
                                                       <Icon style={[styles.text_bold_gray, styles.textSize_12]} type="Feather" name='map-pin' />
                                                       <Text style={[styles.textRegular , styles.text_bold_gray, styles.marginHorizontal_5 ,styles.textSize_12 , styles.writing , {alignSelf:'flex-start'}]}>
                                                           {this.props.orderDetails.user.address}
                                                       </Text>
                                                   </View>
                                               </View>
                                           </View>
                                       </View>
                                   </View>

                                   <FlatList
                                       data                    = {this.props.orderDetails.products}
                                       renderItem              = {({item}) => this.renderItems(item)}
                                       numColumns              = {2}
                                       keyExtractor            = {this._keyExtractor}
                                   />
                                   <View
                                       style={[styles.Width_90, {
                                           marginTop: 15,
                                           marginBottom: 15
                                       }, styles.marginHorizontal_10, styles.SelfCenter]}>
                                       <View style={[styles.lightOverlay, styles.Border]} />
                                       <View
                                           style={[styles.Width_100, styles.overHidden, styles.bg_White, styles.Border, styles.bgFullWidth, styles.paddingHorizontal_7, styles.paddingVertical_7]}>
                                           <View style={[styles.directionRowSpace, styles.Border, styles.paddingHorizontal_10, styles.paddingVertical_10, {marginTop: 15}]}>
                                               <Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft]}>{i18n.t('productsprice')}</Text>
                                               <Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft]}>{this.props.orderDetails.products_price} {i18n.t('RS')}</Text>
                                           </View>
                                           <View style={[styles.directionRowSpace, styles.Border, styles.paddingHorizontal_10, styles.paddingVertical_10, {marginTop: 10}]}>
                                               <Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft]}>{i18n.t('deliveredPrice')}</Text>
                                               <Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft]}>{this.props.orderDetails.shipping_price} {i18n.t('RS')}</Text>
                                           </View>
                                           <View style={[styles.directionRowSpace, styles.Border, styles.paddingHorizontal_10, styles.paddingVertical_10, {
                                                   marginTop: 10,
                                                   backgroundColor: '#000'
                                               }]}>
                                               <Text style={[styles.textRegular, styles.text_White, styles.textSize_14, styles.textLeft]}>{i18n.t('total')}</Text>
                                               <Text style={[styles.textRegular, styles.text_White, styles.textSize_14, styles.textLeft]}>{this.props.orderDetails.total_price} {i18n.t('RS')}</Text>
                                           </View>
                                       </View>
                                   </View>

                                   <View
                                       style={[styles.position_R, styles.flexCenter, styles.Width_90, {marginTop: 20}]}>
                                       <View style={[styles.lightOverlay, styles.Border]} />
                                       <View
                                           style={[styles.position_R, styles.Width_100, styles.overHidden, styles.bg_White, styles.bgFullWidth, styles.paddingHorizontal_7, styles.paddingVertical_7
                                               , {
                                                   borderWidth: 1,
                                                   borderTopColor: COLORS.lightWhite,
                                                   borderBottomColor: COLORS.lightWhite,
                                                   borderRightColor: COLORS.lightWhite,
                                                   borderLeftWidth: 5,
                                                   borderLeftColor: COLORS.midBrown
                                               }]}>
                                           <View style={[styles.directionColumn, {flex: 1}]}>
                                               <Text
                                                   style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft, {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{i18n.t('payMethod')}</Text>
                                               <Text
                                                   style={[styles.textRegular, styles.darkBrown, styles.textSize_14, styles.textLeft, {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{this.props.orderDetails.payment_type}</Text>
                                           </View>
                                       </View>
                                   </View>

                                   <View
                                       style={[styles.position_R, styles.flexCenter, styles.Width_90, {marginTop: 20}]}>
                                       <View style={[styles.lightOverlay, styles.Border]} />
                                       <View
                                           style={[styles.position_R, styles.Width_100, styles.overHidden, styles.bg_White, styles.bgFullWidth, styles.paddingHorizontal_7, styles.paddingVertical_7
                                               , {
                                                   borderWidth: 1,
                                                   borderTopColor: COLORS.lightWhite,
                                                   borderBottomColor: COLORS.lightWhite,
                                                   borderRightColor: COLORS.lightWhite,
                                                   borderLeftWidth: 5,
                                                   borderLeftColor: COLORS.midBrown,
                                                   marginBottom:15
                                               }]}>
                                           <View style={[styles.directionColumn, {flex: 1}]}>
                                               <Text
                                                   style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft, {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{i18n.t('orderStatus')}</Text>
                                               <Text
                                                   style={[styles.textRegular, styles.darkBrown, styles.textSize_14, styles.textLeft, {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{this.props.orderDetails.status_text}</Text>
                                           </View>
                                       </View>
                                   </View>

                                   {
									   this.props.orderDetails.order_status === 1 ?
                                           this.renderAcceptOrder()
                                           : <View/>
                                   }

                                   {
									   this.props.orderDetails.order_status === 2 ?
                                           this.renderFinishOrder()
                                           :
                                           <View/>
                                   }

                               </View>
                                    :
                                    <View/>
                        }

                </Content>
                </ImageBackground>
            </Container>

        );
    }
}

const mapStateToProps = ({lang  , profile , orderDetails}) => {
    return {
        lang: lang.lang,
        user: profile.user,
        orderDetails: orderDetails.orderDetails,
    };
};

export default connect(mapStateToProps, {getOrderDetails , getCancelOrder , getDeleteOrder , getAcceptDelegateOrder, getFinishOrder})(DelegateOrderDetails);
