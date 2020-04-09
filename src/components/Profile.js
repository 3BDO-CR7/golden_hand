import React, { Component } from "react";
import {View, Text, Image, ImageBackground ,TouchableOpacity } from "react-native";
import {Container, Content, Icon, Header, Left, Button, Body, Title, Form, Item, Input, Right , Toast} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import {DoubleBounce} from "react-native-loader";
import {connect} from "react-redux";
import COLORS from '../../src/consts/colors'
import Modal from "react-native-modal";
import {getChangePassword} from "../actions";


class Profile extends Component {
    constructor(props){
        super(props);

        this.state={
            status                          : null,
            username		                : 'اماني قاسم',
            phone	                        : '012365478',
            city	                        : 'الرياض',
            location	                    : 'الرياض التخصصي',
            isModalVisible                  : false,
            isModalInfo                     : false,
            password	                    : '',
            newPassword	                    : '',
            confirmNewPassword	            : '',
            passwordStatus                  : 0,
            newPasswordStatus               : 0,
            confirmNewPasswordStatus        : 0,
            isSubmitted                     : false,
            messageError                    : ''
        }
    }

    static navigationOptions = () => ({
        header      : null,
        drawerLabel : ( <Text style={[styles.textRegular, styles.text_midBrown, styles.textSize_18]}>{ i18n.t('myAcc') }</Text> ) ,
        drawerIcon  : ( <Icon style={[styles.text_midBrown , styles.textSize_20]} type="AntDesign" name="user" /> )
    });

    componentWillMount() {
        this.setState({ messageError: '', isSubmitted: false });
    }

    renderSubmit(){
        if (this.state.password === '' || this.state.newPassword === '' || this.state.confirmNewPassword === '') {
            return (
                <View style={[styles.Width_100,{marginBottom:20}]}>
                    <TouchableOpacity style={[styles.cartBtn , styles.SelfCenter , {backgroundColor:'#999'}]}>
                        <Text style={[styles.textRegular, styles.text_White,styles.textSize_14, styles.textLeft]}>{ i18n.t('confirm') }</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        if (this.state.isSubmitted) {
            return (
                <View style={[{justifyContent: 'center', alignItems: 'center' , margin:20}]}>
                    <DoubleBounce size={20} color={COLORS.darkBrown} style={{alignSelf: 'center'}}/>
                </View>
            )
        }
        return (
            <View style={[styles.Width_100,{marginBottom:20}]}>
                <TouchableOpacity onPress={() => this.changePass()} style={[styles.cartBtn , styles.SelfCenter ]}>
                    <Text style={[styles.textRegular, styles.text_White,styles.textSize_14, styles.textLeft]}>{i18n.t('confirm')}</Text>
                </TouchableOpacity>
            </View>

        );
    }

    changePass(){

        this.setState({ massegeError : this.props.massage });

        if (this.state.newPassword.length < 6){
            this.setState({ messageError    : i18n.t('passreq') });
            return false
        }
        if(this.state.newPassword !== this.state.confirmNewPassword){
            this.setState({ messageError    : i18n.t('passError') });
            return false
        }

        // this.setState({ isSubmitted: true, });

        this.props.getChangePassword(
            this.props.lang ,
            this.state.password,
            this.state.newPassword,
            this.props.user.token
        )

    }

    componentWillReceiveProps(nextProps) {
        this.setState({ messageError: nextProps.message, isSubmitted: false });

        if (nextProps.changePassword) {
            this.setState({isSubmitted: false , isModalVisible:false, messageError: ''});
        }
    }

    toggleModal = () => {
        this.setState({
            isModalVisible                  : !this.state.isModalVisible ,
            password                        : '' ,
            newPassword                     : '',
            confirmNewPassword              : '',
            messageError                    : '',
            passwordStatus                  : 0,
            newPasswordStatus               : 0,
            confirmNewPasswordStatus        : 0,
        });
    };

    toggleModalInfo = () => {
        this.setState({ isModalInfo: !this.state.isModalInfo});
    };

    activeInput(type){
        if (type === 'password' || this.state.password !== ''){
            this.setState({ passwordStatus: 1 })
        }

        if (type === 'newPassword' || this.state.newPassword !== ''){
            this.setState({newPasswordStatus: 1})
        }

        if (type === 'confirmNewPassword' || this.state.confirmNewPassword !== ''){
            this.setState({confirmNewPasswordStatus: 1})
        }
    }

    unActiveInput(type){

        if (type === 'password' && this.state.password === ''){
            this.setState({ passwordStatus: 0 })
        }

        if (type === 'newPassword' && this.state.newPassword === ''){
            this.setState({ newPasswordStatus: 0 })
        }

        if (type === 'confirmNewPassword' && this.state.confirmNewPassword === ''){
            this.setState({ confirmNewPasswordStatus: 0 })
        }

    }

    render() {
        return (
            <Container>
                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={[styles.text_midBrown, styles.textSize_22]} type="AntDesign" name='right' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                    <Title style={[styles.textRegular , styles.text_midBrown, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>{i18n.t('myAcc')}</Title>
                    </Body>
                    <Right style={styles.rightIcon}>
                        <Button  style={[styles.bg_lightBrown, styles.Radius_0, styles.iconHeader, styles.flexCenter]} transparent onPress={() => this.props.navigation.navigate('editProfile')}>
                            <Icon style={[styles.text_midBrown, styles.textSize_22]} type="Feather" name='edit-3' />
                        </Button>
                    </Right>
                </Header>
                <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>
                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                        <View style={[styles.position_R, styles.Width_90, styles.marginVertical_15, styles.marginHorizontal_10, styles.SelfCenter,{right:20}]}>
                            <View style={[styles.brownOverlay, styles.Border , {top:10 , left:10}]}/>
                            <View style={[styles.position_R, styles.Width_100, styles.overHidden, styles.bg_White,styles.bgFullWidth]}>
                                <Image style={[styles.Width_100, styles.swiper]} source={{uri: this.props.user.avatar}} resizeMode={'cover'}/>
                            </View>
                        </View>

                        <Form style={[styles.Width_100, styles.flexCenter, styles.marginVertical_10, styles.Width_90]}>

                            <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                                <Item floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                    <Input
                                        placeholder             = {i18n.translate('userName')}
                                        style                   = {[ styles.input , styles.height_50 , styles.Active]}
                                        value                   = { this.props.user.name }
                                        disabled
                                    />
                                </Item>
                                <View style = {[ styles.position_A , styles.bg_lightBrown, styles.flexCenter, styles.iconInput, styles.left_0 ]}>
                                    <Icon style = {[styles.text_midBrown, styles.textSize_22]} type="AntDesign" name='user' />
                                </View>
                            </View>
                            <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                                <Item floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                    <Input
                                        placeholder             = {i18n.translate('phone')}
                                        style                   = {[ styles.input , styles.height_50, styles.Active ]}
                                        value                   = { this.props.user.phone }
                                        disabled
                                    />
                                </Item>
                                <View style = {[ styles.position_A , styles.bg_lightBrown, styles.flexCenter, styles.iconInput,styles.left_0 ]}>
                                    <Icon style = {[styles.text_midBrown, styles.textSize_22]} type="MaterialCommunityIcons" name='cellphone' />
                                </View>
                            </View>
                            <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                                <Item floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                    <Input
                                        placeholder             = {i18n.translate('city')}
                                        style                   = {[ styles.input , styles.height_50 , styles.Active]}
                                        value                   = {this.props.user.city_name}
                                        disabled
                                    />
                                </Item>
                                <View style = {[ styles.position_A , styles.bg_lightBrown, styles.flexCenter, styles.iconInput, styles.left_0 ]}>
                                    <Icon style = {[styles.text_midBrown, styles.textSize_22]} type="MaterialCommunityIcons" name='flag' />
                                </View>
                            </View>

                            <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                                <Item floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                    <Input
                                        placeholder             = {i18n.translate('map')}
                                        style                   = {[ styles.input , styles.height_50 , styles.Active]}
                                        value                   = {this.props.user.address}
                                        disabled
                                    />
                                </Item>
                                <View style = {[ styles.position_A , styles.bg_lightBrown, styles.flexCenter, styles.iconInput, styles.left_0 ]}>
                                    <Icon style = {[styles.text_midBrown, styles.textSize_22]} type="Feather" name='map-pin' />
                                </View>
                            </View>

                            {
                                this.props.user != null && this.props.user.type === 'provider' ?
                                    <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                                        <Item floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                            <Input
                                                placeholder             = {i18n.translate('namecategory')}
                                                style                   = {[ styles.input , styles.height_50 , styles.Active]}
                                                value                   = {this.props.user.category}
                                                disabled
                                            />
                                        </Item>
                                        <View style = {[ styles.position_A , styles.bg_lightBrown, styles.flexCenter, styles.iconInput, styles.left_0 ]}>
                                            <Icon style = {[styles.text_midBrown, styles.textSize_22]} type="FontAwesome5" name='pencil-alt' />
                                        </View>
                                    </View>
                                    :
                                    <View/>
                            }

                        </Form>

                        {
                            this.props.user != null && this.props.user.type === 'delegate' ?
                                <TouchableOpacity onPress={() => this.toggleModalInfo()} style={[styles.SelfCenter, styles.marginVertical_25]} >
                                    <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_15, styles.textDecoration]}>
                                        {i18n.translate('moreinfo')}
                                    </Text>
                                </TouchableOpacity>
                                :
                                <View/>
                        }

                        <TouchableOpacity onPress={() => this.toggleModal()} style={[styles.SelfCenter, styles.marginVertical_10]} >
                            <Text style={[styles.textRegular , styles.text_midBrown, styles.textSize_16, styles.paddingHorizontal_15, styles.textDecoration]}>
                                {i18n.translate('changepass')}
                            </Text>
                        </TouchableOpacity>

                </Content>
                </ImageBackground>

                <Modal style={{}} isVisible={this.state.isModalInfo} onBackdropPress={() => this.toggleModalInfo()}>
                    <View style={[styles.commentModal,{padding:15}]}>
                        <Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft , styles.SelfCenter]}>
                            {i18n.t('serinfo')}
                        </Text>

                        <View style={[styles.rowGroup , styles.paddingHorizontal_5 , styles.marginVertical_10, styles.position_R]}>
                            <View style={[styles.marginVertical_10, styles.position_R, styles.flex_45 , ]}>
                                <View style={[styles.lightOverlay, styles.Border, styles.height_100, {top:-5 , left:-5}]}/>
                                <View style={[styles.Width_100 , styles.height_100]}>
                                    <Image style={[styles.Width_100 , styles.height_100, styles.Border, styles.bg_White]} source={{ uri : this.props.user.identity_image}}/>
                                </View>
                                <Text style={[styles.textRegular, styles.text_gray, styles.textSize_14, styles.textLeft , styles.SelfCenter]}>
                                    {i18n.t('PhotoID')}
                                </Text>
                            </View>
                            <View style={[ styles.marginVertical_10, styles.position_R, styles.flex_45 , ]}>
                                <View style={[styles.lightOverlay, styles.Border, styles.height_100, {top:-5 , left:-5}]}/>
                                <View style={[styles.Width_100 , styles.height_100]}>
                                    <Image style={[styles.Width_100 , styles.height_100, styles.Border, styles.bg_White]} source={{ uri : this.props.user.licence_image}}/>
                                </View>
                                <Text style={[styles.textRegular, styles.text_gray, styles.textSize_14, styles.SelfCenter]}>
                                    {i18n.t('PhotoLicense')}
                                </Text>
                            </View>
                            <View style={[styles.marginVertical_10, styles.position_R, styles.flex_45 , ]}>
                                <View style={[styles.lightOverlay, styles.Border, styles.height_100, {top:-5 , left:-5}]}/>
                                <View style={[styles.Width_100 , styles.height_100]}>
                                    <Image style={[styles.Width_100 , styles.height_100, styles.Border, styles.bg_White]} source={{ uri : this.props.user.car_image}}/>
                                </View>
                                <Text style={[styles.textRegular, styles.text_gray, styles.textSize_14, styles.SelfCenter]}>
                                    {i18n.t('PhotoCar')}
                                </Text>
                            </View>
                        </View>

                    </View>
                </Modal>


                <Modal style={{}} isVisible={this.state.isModalVisible} onBackdropPress={() => this.toggleModal()}>
                    <View style={[styles.commentModal,{padding:15 , height:350}]}>
                        <Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft , styles.SelfCenter]}>
                            {i18n.t('changepass')}
                        </Text>

                        <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                            <Item floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                <Input
                                    placeholder             = {i18n.translate('password')}
                                    style                   = {[ styles.input , styles.height_50 , (this.state.passwordStatus === 1 ? styles.Active : styles.noActive )]}
                                    onChangeText            = {(password) => this.setState({password})}
                                    onBlur                  = {() => this.unActiveInput('password')}
                                    onFocus                 = {() => this.activeInput('password')}
                                    value                   = {this.state.password}
                                    secureTextEntry
                                />
                            </Item>
                            <View style = {[ styles.position_A , styles.bg_White, styles.flexCenter, styles.iconInput , {top:8},  (this.state.passwordStatus === 1 ? styles.left_0 : styles.leftHidLeft )]}>
                                <Icon style = {[styles.text_midBrown, styles.textSize_22]} type="AntDesign" name='lock1' />
                            </View>
                        </View>

                        <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                            <Item floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                <Input
                                    placeholder             = {i18n.translate('newpass')}
                                    style                   = {[ styles.input , styles.height_50 , (this.state.newPasswordStatus === 1 ? styles.Active : styles.noActive )]}
                                    onChangeText            = {(newPassword) => this.setState({newPassword})}
                                    onBlur                  = {() => this.unActiveInput('newPassword')}
                                    onFocus                 = {() => this.activeInput('newPassword')}
                                    value                   = {this.state.newPassword}
                                    secureTextEntry
                                />
                            </Item>
                            <View style = {[ styles.position_A , styles.bg_White, styles.flexCenter, styles.iconInput , {top:8},  (this.state.newPasswordStatus === 1 ? styles.left_0 : styles.leftHidLeft )]}>
                                <Icon style = {[styles.text_midBrown, styles.textSize_22]} type="AntDesign" name='lock1' />
                            </View>
                        </View>

                        <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                            <Item floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                <Input
                                    placeholder             = {i18n.translate('confirmpass')}
                                    style                   = {[ styles.input , styles.height_50 , (this.state.confirmNewPasswordStatus === 1 ? styles.Active : styles.noActive )]}
                                    onChangeText            = {(confirmNewPassword) => this.setState({confirmNewPassword})}
                                    onBlur                  = {() => this.unActiveInput('confirmNewPassword')}
                                    onFocus                 = {() => this.activeInput('confirmNewPassword')}
                                    value                   = {this.state.confirmNewPassword}
                                    secureTextEntry
                                />
                            </Item>
                            <View style = {[ styles.position_A , styles.bg_White, styles.flexCenter, styles.iconInput , {top:8},  (this.state.confirmNewPasswordStatus === 1 ? styles.left_0 : styles.leftHidLeft )]}>
                                <Icon style = {[styles.text_midBrown, styles.textSize_22]} type="AntDesign" name='lock1' />
                            </View>
                        </View>

                        <Text style={[styles.textRegular, styles.textCenter, styles.Width_100, styles.text_red, styles.marginVertical_10]}>
                            { this.state.messageError }
                        </Text>

                        {
                            this.renderSubmit()
                        }

                    </View>
                </Modal>
            </Container>

        );
    }
}


const mapStateToProps = ({ lang , changePassword , profile }) => {
    return {
        lang                    : lang.lang,
        user                    : profile.user,
        changePassword          : changePassword.changePassword,
        message                 : changePassword.message
    };
};
export default connect(mapStateToProps, {getChangePassword})(Profile);