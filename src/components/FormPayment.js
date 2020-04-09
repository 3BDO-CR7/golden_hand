import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground, KeyboardAvoidingView} from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Left,
    Icon,
    Body,
    Title,
    Item,
    Input,
    Picker,
    CheckBox,
    Form
} from 'native-base'
import styles from '../../assets/style'
import {DoubleBounce} from 'react-native-loader';
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import i18n from "../../locale/i18n";
import * as Animatable from "react-native-animatable";
import {getOrderStore} from '../actions'
import COLORS from "../consts/colors";

class FormPayment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            accNum: '',
            finishDate: '',
            confirmCode: '',
            usernameStatus: 0,
            accNumStatus: 0,
            finishDateStatus: 0,
            confirmCodeStatus: 0,
            isSubmitted: false,
        }
    }


    renderStoreOrder(){
        if (this.state.isSubmitted){
            return(
                <View style={[{ justifyContent: 'center', alignItems: 'center' } , styles.marginVertical_15]}>
                    <DoubleBounce size={20} color={COLORS.darkBrown} style={{ alignSelf: 'center' }} />
                </View>
            )
        }
        const isCommission = this.props.navigation.state.params.routeName ==='commission'  ;

        return (
            <TouchableOpacity
                onPress={() =>isCommission ? this.navigateScreen() : this.storeOrder()}
                style={[styles.bg_midBrown,
                    styles.width_150,
                    styles.flexCenter,
                    styles.marginVertical_15,
                    styles.height_40]}>
                <Text
                    style={[styles.textRegular, styles.text_White, styles.textSize_14, styles.textLeft]}>{i18n.t('confirm')}</Text>
            </TouchableOpacity>
        );
    }
    navigateScreen(){

            this.setState({ isSubmitted: true });
            this.props.navigation.navigate('ConfirmPayment')
            // this.props.bookPackage(this.props.lang, this.props.navigation.state.params.id , this.props.navigation.state.params.product_id , this.props.user.token  , this.props )

        // this.props.navigation.navigate(this.props.navigation.state.params.routeName ==='subscription'?'drawerNavigator' : 'ConfirmPayment')
    }
    storeOrder(){
        this.setState({ isSubmitted: true });

        const provider_id             = this.props.navigation.state.params.provider_id;
        const shipping_price          = this.props.navigation.state.params.shipping_price;
        const address                 = this.props.navigation.state.params.address;
        const lat                     = this.props.navigation.state.params.latitude;
        const lng                     = this.props.navigation.state.params.longitude;
        const payment_type            = this.props.navigation.state.params.payment_type;

        this.props.getOrderStore(this.props.lang, provider_id , payment_type , shipping_price.toString() , lat , lng , address , this.props.user.token  , this.props,  this.props.navigation.state.params.coupon)


    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isSubmitted: false});

    }


    activeInput(type) {
        if (type === 'username' || this.state.username !== '') {
            this.setState({usernameStatus: 1})
        }

        if (type === 'accNum' || this.state.accNum !== '') {
            this.setState({accNumStatus: 1})
        }

        if (type === 'finishDate' || this.state.finishDate !== '') {
            this.setState({finishDateStatus: 1})
        }

        if (type === 'confirmCode' || this.state.confirmCode !== '') {
            this.setState({confirmCodeStatus: 1})
        }
    }

    unActiveInput(type) {
        if (type === 'username' && this.state.username === '') {
            this.setState({usernameStatus: 0})
        }

        if (type === 'accNum' && this.state.accNum === '') {
            this.setState({accNumStatus: 0})
        }

        if (type === 'finishDate' && this.state.finishDate === '') {
            this.setState({finishDateStatus: 0})
        }

        if (type === 'confirmCode' && this.state.confirmCode === '') {
            this.setState({confirmCodeStatus: 0})
        }

    }


    componentWillMount() {
    }


    renderLoader() {
        if (this.props.loader) {
            return (
                <View style={[styles.loading, styles.flexCenter]}>
                    <DoubleBounce size={20}/>
                </View>
            );
        }
    }

    onFocus() {
        this.componentWillMount();
    }

    render() {

        return (
            <Container>

                <NavigationEvents onWillFocus={() => this.onFocus()}/>

                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={[styles.text_midBrown, styles.textSize_22]} type="AntDesign" name='right'/>
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                    <Title
                        style={[styles.textRegular, styles.text_midBrown, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>
                        {i18n.t('pay')}
                    </Title>
                    </Body>
                </Header>
                <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>
                <Content contentContainerStyle={styles.bgFullWidth} style={styles.bgFullWidth}>

                        <View style={[styles.overHidden]}>
                            <Animatable.View animation="fadeInUp" easing="ease-out" delay={500}
                                             style={[styles.flexCenter]}>
                                <Image
                                    style={[styles.upImage, styles.flexCenter]}
                                    source={require('../../assets/images/payment.png')}
                                />
                            </Animatable.View>
                        </View>
                        <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                            <Form
                                style={[styles.Width_100, styles.flexCenter, styles.marginVertical_10, styles.Width_90]}>


                                <View
                                    style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                    <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                        <Input
                                            placeholder={i18n.t('userName')}
                                            style={[styles.input, styles.height_50, (this.state.usernameStatus === 1 ? styles.Active : styles.noActive)]}
                                            onChangeText={(username) => this.setState({username})}
                                            onBlur={() => this.unActiveInput('username')}
                                            onFocus={() => this.activeInput('username')}
                                        />
                                    </Item>
                                    <View
                                        style={[styles.position_A, styles.bg_lightBrown, styles.flexCenter, styles.iconInput, (this.state.usernameStatus === 1 ? styles.left_0 : styles.leftHidLeft)]}>
                                        <Icon style={[styles.darkBrown, styles.textSize_22]} type="AntDesign"
                                              name='user'/>
                                    </View>
                                </View>

                                <View
                                    style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                    <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                        <Input
                                            placeholder={i18n.translate('accNum')}
                                            style={[styles.input, styles.height_50, (this.state.accNumStatus === 1 ? styles.Active : styles.noActive)]}
                                            keyboardType={'number-pad'}
                                            onChangeText={(accNum) => this.setState({accNum})}
                                            onBlur={() => this.unActiveInput('accNum')}
                                            onFocus={() => this.activeInput('accNum')}
                                        />
                                    </Item>
                                    <View
                                        style={[styles.position_A, styles.bg_lightBrown, styles.flexCenter, styles.iconInput, (this.state.accNumStatus === 1 ? styles.left_0 : styles.leftHidLeft)]}>
                                        <Icon style={[styles.darkBrown, styles.textSize_22]} type="MaterialCommunityIcons"
                                              name='account-details'/>
                                    </View>
                                </View>

                                <View
                                    style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                    <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                        <Input
                                            placeholder={i18n.translate('finishDate')}
                                            style={[styles.input, styles.height_50, (this.state.finishDateStatus === 1 ? styles.Active : styles.noActive)]}
                                            onChangeText={(finishDate) => this.setState({finishDate})}
                                            onBlur={() => this.unActiveInput('finishDate')}
                                            onFocus={() => this.activeInput('finishDate')}
                                        />
                                    </Item>
                                    <View
                                        style={[styles.position_A, styles.bg_lightBrown, styles.flexCenter, styles.iconInput, (this.state.finishDateStatus === 1 ? styles.left_0 : styles.leftHidLeft)]}>
                                        <Icon style={[styles.darkBrown, styles.textSize_22]} type="MaterialIcons"
                                              name='date-range'/>
                                    </View>
                                </View>

                                <View
                                    style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                    <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                        <Input
                                            placeholder={i18n.translate('confirmCode')}
                                            style={[styles.input, styles.height_50, (this.state.confirmCodeStatus === 1 ? styles.Active : styles.noActive)]}
                                            keyboardType={'number-pad'}
                                            onChangeText={(confirmCode) => this.setState({confirmCode})}
                                            onBlur={() => this.unActiveInput('confirmCode')}
                                            onFocus={() => this.activeInput('confirmCode')}
                                        />
                                    </Item>
                                    <View
                                        style={[styles.position_A, styles.bg_lightBrown, styles.flexCenter, styles.iconInput, (this.state.confirmCodeStatus === 1 ? styles.left_0 : styles.leftHidLeft)]}>
                                        <Icon style={[styles.darkBrown, styles.textSize_22]} type="MaterialIcons"
                                              name='confirmation-number'/>
                                    </View>
                                </View>

                                {
                                    this.renderStoreOrder()
                                }

                            </Form>
                        </KeyboardAvoidingView>

                </Content>
                </ImageBackground>
            </Container>

        );
    }
}

const mapStateToProps = ({lang , profile}) => {
    return {
        lang: lang.lang,
        user: profile.user,
    };
};
export default connect(mapStateToProps, {getOrderStore})(FormPayment);