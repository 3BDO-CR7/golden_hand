import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground,KeyboardAvoidingView} from "react-native";
import {Container, Content, Form, Item, Input, Toast, Icon, Left, Button, Body, Header} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { activeCode, profile, userLogin } from "../actions";
import Spinner from "react-native-loading-spinner-overlay";
import activationCode from "../reducers/ActivationCodeReducer";
import {DoubleBounce} from "react-native-loader";
import COLORS from "../consts/colors";


class ActivationCode extends Component {
    constructor(props){
        super(props);
        this.state = {
            code		        : '',
            userId              : null,
            spinner             : false,
            type				: 0,
            activeKey           : 0
        }
    }

    componentWillMount() {

        const code  = this.props.navigation.state.params.code;
        this.setState({ userId: null });

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
        if (this.state.code == '') {
            return (
                <TouchableOpacity
                    style={[
                        styles.bg_darkBrown,
                        styles.width_150,
                        styles.flexCenter,
                        styles.marginVertical_15,
                        styles.height_40,
                        {
                            backgroundColor: '#999'
                        }
                    ]}>
                    <Text style={[styles.textRegular, styles.textSize_14, styles.text_White]}>
                        {i18n.translate('confirm')}
                    </Text>
                </TouchableOpacity>
            );
        }

        if (this.state.spinner){
            return(
                <View style={[{ justifyContent: 'center', alignItems: 'center' , marginBottom:20 }]}>
                    <DoubleBounce size={20} color={COLORS.darkBrown} style={{ alignSelf: 'center' }} />
                </View>
            )
        }

        return (
            <TouchableOpacity
                style={[
                    styles.bg_midBrown,
                    styles.width_150,
                    styles.flexCenter,
                    styles.marginVertical_15,
                    styles.height_40
                ]}
                onPress={() => this.onPressed()}>
                <Text style={[styles.textRegular , styles.textSize_14, styles.text_White]}>
                    {i18n.translate('confirm')}
                </Text>
            </TouchableOpacity>
        );
    }

    onPressed() {


        const { password, phone, deviceId } = this.props.navigation.state.params;

        const err = this.validate();
        if (!err){
            const {code , type} = this.state;
            const activeCode  = this.props.navigation.state.params.code;
            if (activeCode == code){
                this.setState({ spinner: true });
                this.props.activeCode({ code, password, phone, deviceId }, this.props , this.props.lang);
            } else {
                Toast.show({
                    text		: i18n.t('notInvalidCode'),
                    type		: "danger",
                    duration	: 3000,
                    textStyle     : {
                        color           : "white",
                        fontFamily      : 'cairo',
                        textAlign       : 'center',
                    }
                });
            }

        }

    }

    componentWillReceiveProps(newProps){
        this.setState({ spinner: false });
        console.log('props auth ...PPP', newProps, newProps.activeKey);

        if (this.state.activeKey == 0){
            const { password, phone, deviceId } = this.props.navigation.state.params;
            this.props.userLogin({ phone, password, deviceId }, this.props.lang);

            this.setState({ activeKey: newProps.activeKey })
        }

        if (newProps.auth !== null && newProps.auth.key === 1 && this.state.activeKey != 0){

            if (this.state.userId === null){
                this.setState({ userId: newProps.auth.data.id });
                this.props.profile(newProps.auth.data.token);
            }

            this.props.navigation.navigate('drawerNavigator');

        }

        if (newProps.auth !== null) {
            this.setState({spinner: false});
            Toast.show({
                text		: newProps.auth.msg,
                type		: newProps.auth.key === 1 ? "success" : "danger",
                duration	: 3000,
                textStyle     : {
                    color           : "white",
                    fontFamily      : 'cairo',
                    textAlign       : 'center',
                }
            });
        }

    }

    onFocus(){
        this.componentWillMount();
    }

    render() {
        return (

            <Container>

                <NavigationEvents onWillFocus={() => this.onFocus()} />

                <ImageBackground source={require('../../assets/images/background.png')} style={[styles.bgFullWidth]}>
                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={[styles.text_midBrown, styles.textSize_22]} type="AntDesign" name='right' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}/>
                </Header>
                <Content contentContainerStyle={styles.bgFullWidth}>
                        <View style={[styles.position_R, styles.bgFullWidth, styles.marginVertical_15, styles.SelfCenter, styles.Width_100]}>
                            <Animatable.View animation="fadeInDown" easing="ease-out" delay={500} style={[styles.flexCenter]}>
                                <View style={[styles.overHidden, styles.marginVertical_15]}>
                                    <Image style={[styles.icoImage]} source={require('../../assets/images/logo.png')}/>
                                </View>
                            </Animatable.View>
                            <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                                <Form style={[styles.Width_100, styles.flexCenter, styles.marginVertical_10, styles.Width_90]}>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                                    <Item floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                        <Input
                                            placeholder             = {i18n.t('actcode')}
                                            style                   = {[ styles.input , styles.height_50 , (this.state.codeStatus === 1 ? styles.Active : styles.noActive )]}
                                            onChangeText            = {(code) => this.setState({code})}
                                            onBlur                  = {() => this.unActiveInput('code')}
                                            onFocus                 = {() => this.activeInput('code')}
                                            keyboardType            = {'number-pad'}
                                        />
                                    </Item>
                                    <View style = {[ styles.position_A , styles.bg_White, styles.flexCenter, styles.iconInput,  (this.state.codeStatus === 1 ? styles.left_0 : styles.leftHidLeft )]}>
                                        <Icon style = {[styles.darkBrown, styles.textSize_22]} type="MaterialCommunityIcons" name='cellphone' />
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


const mapStateToProps = ({ lang, profile, auth, activationCode }) => {
    return {
        lang		: lang.lang,
        auth        : auth.user,
        user        : profile.user,
        activeKey   : activationCode.activeKey,
        activeUser  : activationCode.user
    };
};
export default connect(mapStateToProps, { activeCode, profile, userLogin })(ActivationCode);
