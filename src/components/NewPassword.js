import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground, KeyboardAvoidingView,} from "react-native";
import {Container, Content, Form, Item, Input, Toast, Icon, Left, Button, Body, Header} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { newPass } from "../actions";


class NewPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            user_id             : '',
            code                : '',
            password            : '',
            confirmpassword     : '',
            passwordStatus      : 0,
            rePasswordStatus    : 0,
            codeStatus          : 0,
        }
    }

    componentWillMount() {

        const code  = this.props.navigation.state.params.code;

        this.setState({ user_id : this.props.navigation.state.params.user_id });
        console.log('phone', this.props.navigation.state.params.user_id);

    }

    activeInput(type){

        if (type === 'code' || this.state.code !== ''){
            this.setState({ codeStatus: 1 })
        }

        if (type === 'password' || this.state.password !== ''){
            this.setState({ passwordStatus: 1 })
        }

        if (type === 'rePasswordStatus' || this.state.confirmpassword !== ''){
            this.setState({rePasswordStatus: 1})
        }

    }

    unActiveInput(type){

        if (type === 'code' && this.state.code === ''){
            this.setState({ codeStatus: 0 })
        }

        if (type === 'password' && this.state.password === ''){
            this.setState({ passwordStatus: 0 })
        }

        if (type === 'rePasswordStatus' && this.state.confirmpassword === ''){
            this.setState({ rePasswordStatus: 0 })
        }

    }


    validate = () => {
        let isError = false;
        let msg = '';

        if (this.state.code.length <= 0) {
            isError = true;
            msg = i18n.t('codeN');
        }else if (this.state.password.length <= 0 || this.state.password.length < 6){
            isError     = true;
            msg         = i18n.translate('passreq');
        }else if (this.state.password !== this.state.confirmpassword){
            isError     = true;
            msg         = i18n.translate('notmatch');
        }

        if (msg !== ''){
            Toast.show({
                text        : msg,
                type        : "danger",
                duration    : 3000,
                textStyle     : {
                    color           : "white",
                    fontFamily      : 'cairo',
                    textAlign       : 'center',
                }
            });
        }
        return isError;
    };

    onLoginPressed() {
        const err = this.validate();
        if (!err){
            const { code , password, user_id } = this.state;
            this.props.newPass({ code , password, user_id }, this.props.lang, this.props);
        }
    }


    onFocus(){
        this.componentWillMount()
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
                                            placeholder             = {i18n.t('code')}
                                            style                   = {[ styles.input , styles.height_50 , (this.state.codeStatus === 1 ? styles.Active : styles.noActive )]}
                                            onChangeText            = {(code) => this.setState({code})}
                                            onBlur                  = {() => this.unActiveInput('code')}
                                            onFocus                 = {() => this.activeInput('code')}
                                            keyboardType            = {'number-pad'}
                                        />
                                    </Item>
                                    <View style = {[ styles.position_A , styles.bg_White, styles.flexCenter, styles.iconInput,  (this.state.codeStatus === 1 ? styles.left_0 : styles.leftHidLeft )]}>
                                        <Icon style = {[styles.text_darkBrown, styles.textSize_22]} type="AntDesign" name='scan1' />
                                    </View>
                                </View>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                                    <Item floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                        <Input
                                            placeholder             = {i18n.t('newpass')}
                                            style                   = {[ styles.input , styles.height_50 , (this.state.passwordStatus === 1 ? styles.Active : styles.noActive )]}
                                            onChangeText            = {(password) => this.setState({password})}
                                            onBlur                  = {() => this.unActiveInput('password')}
                                            onFocus                 = {() => this.activeInput('password')}
                                            secureTextEntry
                                        />
                                    </Item>
                                    <View style = {[ styles.position_A , styles.bg_White, styles.flexCenter, styles.iconInput,  (this.state.passwordStatus === 1 ? styles.left_0 : styles.leftHidLeft )]}>
                                        <Icon style = {[styles.text_darkBrown, styles.textSize_22]} type="AntDesign" name='lock1' />
                                    </View>
                                </View>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                                    <Item floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                        <Input
                                            placeholder             = {i18n.t('confirmpass')}
                                            style                   = {[ styles.input , styles.height_50 , (this.state.rePasswordStatus === 1 ? styles.Active : styles.noActive )]}
                                            onChangeText            = {(confirmpassword) => this.setState({confirmpassword})}
                                            onBlur                  = {() => this.unActiveInput('rePasswordStatus')}
                                            onFocus                 = {() => this.activeInput('rePasswordStatus')}
                                            secureTextEntry
                                        />
                                    </Item>
                                    <View style = {[ styles.position_A , styles.bg_White, styles.flexCenter, styles.iconInput,  (this.state.rePasswordStatus === 1 ? styles.left_0 : styles.leftHidLeft )]}>
                                        <Icon style = {[styles.text_darkBrown, styles.textSize_22]} type="AntDesign" name='lock1' />
                                    </View>
                                </View>

                                <TouchableOpacity
                                    style={[
                                        styles.bg_darkBrown,
                                        styles.width_150,
                                        styles.flexCenter,
                                        styles.marginVertical_15,
                                        styles.height_40
                                    ]}
                                    onPress={() => this.onLoginPressed()}>
                                    <Text style={[styles.textRegular , styles.textSize_14, styles.text_White]}>
                                        {i18n.translate('confirm')}
                                    </Text>
                                </TouchableOpacity>

                            </Form>
                            </KeyboardAvoidingView>
                        </View>
                </Content>
                    </ImageBackground>
            </Container>
        );
    }
}


const mapStateToProps = ({ lang }) => {
    return {
        lang		: lang.lang
    };
};
export default connect(mapStateToProps, { newPass })(NewPassword);
