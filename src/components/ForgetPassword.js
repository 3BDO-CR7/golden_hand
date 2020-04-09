import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground, KeyboardAvoidingView} from "react-native";
import {Container, Content, Form, Item, Input, Toast, Icon, Left, Button, Body, Title, Header} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import {forgetPass} from "../actions";
import Spinner from "react-native-loading-spinner-overlay";


class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            phoneStatus: 0,
            spinner: false,
        }
    }

    activeInput(type) {

        if (type === 'phone' || this.state.phone !== '') {
            this.setState({phoneStatus: 1})
        }

    }

    unActiveInput(type) {

        if (type === 'phone' && this.state.phone === '') {
            this.setState({phoneStatus: 0})
        }

    }


    validate = () => {
        let isError = false;
        let msg = '';

        if (this.state.phone.length <= 0) {
            isError = true;
            msg = i18n.t('namereq');
        }
        if (msg !== '') {
            Toast.show({
                text: msg,
                type: "danger",
                duration: 3000
            });
        }
        return isError;
    };

    onLoginPressed() {
        this.setState({spinner: true});
        const err = this.validate();
        if (!err) {
            const {phone} = this.state;
            this.props.forgetPass({phone}, this.props.lang, this.props);
            this.setState({spinner: false});
        } else {
            this.setState({spinner: false});
        }
    }

    render() {
        return (

            <Container>

                <Spinner
                    visible={this.state.spinner}
                />
                <ImageBackground
                    source  = {require('../../assets/images/background.png')}
                    style   = {[styles.bgFullWidth]}
                >
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
                            <Animatable.View animation="fadeInDown" easing="ease-out" delay={500}
                                             style={[styles.flexCenter]}>
                                <View style={[styles.overHidden, styles.marginVertical_15]}>
                                    <Image style={[styles.icoImage]} source={require('../../assets/images/logo.png')}/>
                                </View>
                            </Animatable.View>
                            <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                                <Form
                                    style={[styles.Width_100, styles.flexCenter, styles.marginVertical_10, styles.Width_90]}>

                                    <View
                                        style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                        <Item floatingLabel style={[styles.item, styles.position_R, styles.overHidden]}>
                                            <Input
                                                placeholder={i18n.translate('phone')}
                                                style={[styles.input, styles.height_50, (this.state.phoneStatus === 1 ? styles.Active : styles.noActive)]}
                                                onChangeText={(phone) => this.setState({phone})}
                                                onBlur={() => this.unActiveInput('phone')}
                                                onFocus={() => this.activeInput('phone')}
                                                keyboardType={'number-pad'}
                                            />
                                        </Item>
                                        <View
                                            style={[styles.position_A, styles.bg_White, styles.flexCenter, styles.iconInput, (this.state.phoneStatus === 1 ? styles.left_0 : styles.leftHidLeft)]}>
                                            <Icon style={[styles.text_darkBrown, styles.textSize_22]}
                                                  type="MaterialCommunityIcons" name='cellphone'/>
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
                                        <Text style={[styles.textRegular, styles.textSize_14, styles.text_White]}>
                                            {i18n.translate('sent')}
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


const mapStateToProps = ({lang}) => {
    return {
        lang: lang.lang
    };
};
export default connect(mapStateToProps, {forgetPass})(ForgetPassword);
