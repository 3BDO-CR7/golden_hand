import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    KeyboardAvoidingView,
    ActivityIndicator,
    I18nManager
} from "react-native";
import {Container, Content, Form, Item, Input, Toast, Icon, Left, Button, Body, Title, Right, Header} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import Spinner from "react-native-loading-spinner-overlay";
import activationCode from "../reducers/ActivationCodeReducer";
import {DoubleBounce} from "react-native-loader";
import COLORS from "../consts/colors";


class DiscountCoupon extends Component {
    constructor(props){
        super(props);
        this.state = {
            code		        : '',
            spinner             : false,
            isSubmitted: false,
        }
    }

    componentWillMount() {

    }

    activeInput(type){

        if (type === 'code' || this.state.code !== ''){
            this.setState({ codeStatus: 1 })
        }

    }

    unActiveInput(type){

        if (type === 'code' && this.state.code === ''){
            this.setState({ codeStatus: 0 })
        }

    }


    validate = () => {
        let isError = false;
        let msg = '';

        if (this.state.code.length <= 0) {
            isError     = true;
            msg         = i18n.t('codeNot');
        }

        if (msg !== ''){
            Toast.show({
                text: msg,
                type: "danger",
                duration: 3000
            });
        }
        return isError;
    };

    renderSubmit() {
        if (this.state.isSubmitted){
            return(
                <View style={[{ justifyContent: 'center', alignItems: 'center' } , styles.marginVertical_15]}>
                    <ActivityIndicator size="large" color={COLORS.blue} style={{ alignSelf: 'center' }} />
                </View>
            )
        }

        return (
            <TouchableOpacity
                style={[
                    styles.bg_darkBlue,
                    styles.width_150,
                    styles.flexCenter,
                    styles.marginVertical_15,
                    styles.height_40
                ]}
                onPress={() => {


                    if( this.state.code ){

                    }else{
                        if(this.props.navigation.state.params.payment === '1'){
                            this.props.navigation.navigate('ChoosePayment', {
                                city_name                :  this.props.navigation.state.params.city_name,
                                latitude                 :  this.props.navigation.state.params.latitude,
                                longitude                :  this.props.navigation.state.params.longitude,
                                provider_id              :  this.props.navigation.state.params.provider_id,
                                shipping_price           :  this.props.navigation.state.params.shipping_price,
                                address                  :  this.props.navigation.state.params.city_name,
                            });
                        }else{
                            const provider_id             = this.props.navigation.state.params.provider_id;
                            const shipping_price          = this.props.navigation.state.params.shipping_price;
                            const address                 = this.props.navigation.state.params.city_name;
                            const lat                     = this.props.navigation.state.params.latitude;
                            const lng                     = this.props.navigation.state.params.longitude;
                            const payment_type            = 1;
                            this.props.getOrderStore(this.props.lang, provider_id , payment_type , shipping_price.toString() , lat , lng , address , this.props.user.token  , this.props )
                            Toast.show({
                                text        : 'تم إرسال الطلب بنجاح',
                                type        : "success",
                                duration    : 3000,
                                textStyle   : {
                                    color       : "white",
                                    fontFamily  : 'cairo',
                                    textAlign   : 'center'
                                }
                            });
                            this.props.navigation.navigate('Home');
                        }
                    }



                    // this.state.code ? this.checkCoupon() :this.props.navigation.navigate('PaymentUser' ,
                    //     {
                    //         routeName:'discountCoupon' ,
                    //         city_name               : this.props.navigation.state.params.city_name,
                    //         latitude                : this.props.navigation.state.params.latitude,
                    //         longitude               : this.props.navigation.state.params.longitude,
                    //         provider_id             : this.props.navigation.state.params.provider_id,
                    //         deliverd_time           : this.props.navigation.state.params.deliverd_time,
                    //         notes                   : this.props.navigation.state.params.notes,
                    //         total                   : this.props.navigation.state.params.total,
                    //         address                 : this.props.navigation.state.params.address,
                    //         coupon_number           : this.state.code,
                    //     })

                }}
                >
                <Text style={[styles.textRegular , styles.textSize_14, styles.text_White]}>
                    {i18n.translate('continue')}
                </Text>
            </TouchableOpacity>
        );
    }

    checkCoupon(){

        const routeName               ='discountCoupon' ;
        const city_name               = this.props.navigation.state.params.city_name;
        const latitude                = this.props.navigation.state.params.latitude;
        const longitude               = this.props.navigation.state.params.longitude;
        const provider_id             = this.props.navigation.state.params.provider_id;
        const deliverd_time           = this.props.navigation.state.params.deliverd_time;
        const notes                   = this.props.navigation.state.params.notes;
        const address                 = this.props.navigation.state.params.address;
        const total                   = this.props.navigation.state.params.total;
        const coupon_number           = this.state.code;
        this.props.getCoupon(this.props.lang ,routeName , city_name, provider_id , latitude , longitude , coupon_number , notes , deliverd_time , address , this.props.user.token  , this.props ,total)


    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isSubmitted: false});

    }

    onFocus(){
        this.componentWillMount();
    }

    render() {
        console.log('this.props.navigation.state.params.shipping_price' , this.props.navigation.state.params.shipping_price)

        return (

            <Container>

                <NavigationEvents onWillFocus={() => this.onFocus()} />
                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={[styles.text_black, styles.textSize_22]} type="AntDesign" name='right'/>
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title
                            style={[styles.textRegular, styles.text_black, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>
                            {i18n.t('discountCoupon')}
                        </Title>
                    </Body>

                    <Right style={styles.rightIcon}>
                        <Image style={[styles.logo , styles.marginHorizontal_10 , {top:0 , width : 35 , height : 35}]} source={require('../../assets/images/logo.png')} resizeMode={'contain'}/>
                    </Right>
                </Header>
                <ImageBackground source={I18nManager.isRTL ?require('../../assets/images/background.png') : require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>
                    <Content contentContainerStyle={styles.bgFullWidth}>
                        <View style={[styles.position_R, styles.bgFullWidth, styles.marginVertical_15, styles.SelfCenter, styles.Width_100]}>
                            <Text
                                style={[styles.textRegular, styles.text_black, styles.textSize_16 , styles.SelfCenter , {marginTop:150}]}>
                                {i18n.t('enterCoupon')}
                            </Text>
                            <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                                <Form style={[styles.Width_100, styles.flexCenter, styles.marginVertical_10, styles.Width_90]}>

                                    <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                                        <Item floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                            <Input
                                                placeholder             = {i18n.t('discountCoupon')}
                                                style                   = {[ styles.input , styles.height_50 , (this.state.codeStatus === 1 ? styles.Active : styles.noActive )]}
                                                onChangeText            = {(code) => this.setState({code})}
                                                onBlur                  = {() => this.unActiveInput('code')}
                                                onFocus                 = {() => this.activeInput('code')}
                                                autoCapitalize          ='none'
                                            />
                                        </Item>
                                        <View style = {[ styles.position_A , styles.bg_White, styles.flexCenter, styles.iconInput,  (this.state.codeStatus === 1 ? styles.left_0 : styles.leftHidLeft )]}>
                                            <Icon style = {[styles.text_fyrozy, styles.textSize_22]} type="MaterialCommunityIcons" name='cellphone' />
                                        </View>
                                    </View>

                                    {
                                        this.renderSubmit()
                                    }

                                </Form>
                            </KeyboardAvoidingView>
                        </View>
                    </Content>
                </ImageBackground>
            </Container>
        );
    }
}


const mapStateToProps = ({ lang, profile, auth }) => {
    return {
        lang		: lang.lang,
        auth        : auth.user,
        user        : profile.user,
    };
};
export default connect(mapStateToProps, {})(DiscountCoupon);