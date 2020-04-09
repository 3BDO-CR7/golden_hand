import React, { Component } from "react";
import {View, Text, Image, ImageBackground, TouchableOpacity, Linking} from "react-native";
import {Container, Content, Icon, Header, Left, Button, Body, Title, Item, Textarea, Form, Toast} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import {connect} from "react-redux";
import {DoubleBounce} from "react-native-loader";
import { getContactUs, complaint } from '../actions';
import  Modal  from "react-native-modal";
import * as Animatable from 'react-native-animatable';
import {NavigationEvents} from "react-navigation";

class ContactUs extends Component {
    constructor(props){
        super(props);
        this.state={
            show_modal          : false,
            message             : '',
            error               : ''
        }
    }


    componentWillMount() {
        this.props.getContactUs( this.props.lang );
    }

    onFocus(){
        this.componentWillMount();
    }

    renderLoader(){
        if (this.props.loader){
            return(
                <View style={[styles.loading, styles.flexCenter]}>
                    <DoubleBounce size={20} />
                </View>
            );
        }
    }

    validate = () => {
        let isError = false;
        let msg = '';

        if (this.state.message.length <= 0 ) {
            isError     = true;
            msg         = i18n.t('context');
            this.setState({ error : i18n.t('context') })
        }

        if (msg !== ''){
            Toast.show({
                text        : msg,
                type        : "danger",
                duration    : 3000,
                textStyle   : {
                    color       : "white",
                    fontFamily  : 'cairo',
                    textAlign   : 'center'
                }
            });
        }
        return isError;
    };

    onSent() {

        const err = this.validate();
        if (!err){

            const { message } = this.state;
            const data = {message, lang: this.props.lang};

            this.props.complaint(data, this.props);

            this.setState({ show_modal: !this.state.show_modal });

        }
    }

    toggleModal = () => {
        this.setState({ show_modal: !this.state.show_modal });
    };

    static navigationOptions = () => ({
        header      : null,
        drawerLabel : ( <Text style={[styles.textRegular, styles.text_midBrown, styles.textSize_18]}>{ i18n.t('contact') }</Text> ) ,
        drawerIcon  : ( <Image style={[styles.smImage]} source={require('../../assets/images/contact.png')}/>)
    });

    render() {

        return (
            <Container>
                { this.renderLoader() }
                <NavigationEvents onWillFocus={() => this.onFocus()} />
                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={[styles.text_midBrown, styles.textSize_22]} type="AntDesign" name='right' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_midBrown, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>
                            { i18n.t('contact') }
                        </Title>
                    </Body>
                </Header>
                <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>
                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>
                        <TouchableOpacity style={[styles.borderRed, styles.marginVertical_15, styles.Width_80, styles.SelfCenter, styles.height_50, styles.paddingHorizontal_25]}>
                            <View style={[styles.bg_lightBrown, styles.iconImg, styles.iconContact, styles.flexCenter]}>
                                <Icon style={[styles.text_midBrown, styles.textSize_22]} type="Feather" name='user' />
                            </View>
                            <Text style={[styles.textRegular , styles.text_black, styles.SelfLeft, styles.marginHorizontal_25, styles.centerContext]}>
                                { this.props.name }
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.borderRed, styles.marginVertical_15, styles.Width_80, styles.SelfCenter, styles.height_50, styles.paddingHorizontal_25]} onPress={() => Linking.openURL(this.props.phone)}>
                            <View style={[styles.bg_lightBrown, styles.iconImg, styles.iconContact, styles.flexCenter]}>
                                <Icon style={[styles.text_midBrown, styles.textSize_22]} type="SimpleLineIcons" name='screen-smartphone' />
                            </View>
                            <Text style={[styles.textRegular , styles.text_black, styles.SelfLeft, styles.marginHorizontal_25, styles.centerContext]}>
                                { this.props.phone }
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.borderRed, styles.marginVertical_15, styles.Width_80, styles.SelfCenter, styles.height_50, styles.paddingHorizontal_25]}>
                            <View style={[styles.bg_lightBrown, styles.iconImg, styles.iconContact, styles.flexCenter]}>
                                <Icon style={[styles.text_midBrown, styles.textSize_22]} type="Feather" name='map-pin' />
                            </View>
                            <Text style={[styles.textRegular , styles.text_black, styles.SelfLeft, styles.marginHorizontal_25, styles.centerContext]}>
                                { this.props.address }
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.marginVertical_25,styles.flexCenter]} onPress={this.toggleModal}>
                            <Text style={[styles.textRegular , styles.text_midBrown, styles.textDecoration, styles.textSize_16]}>
                                { i18n.t('FAsww') }
                            </Text>
                        </TouchableOpacity>

                        <View style={[ styles.rowGroup , styles.marginVertical_15, styles.paddingHorizontal_20, styles.SelfCenter]}>
                            {
                                this.props.socials.map((soc, i) => (
                                    <TouchableOpacity key={i} onPress={() => Linking.openURL(soc.url)}>
                                        <Image source={{ uri: soc.icon }} style={{width : 30,  height : 30, margin : 15}}/>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>

                    <Modal
                        onBackdropPress               = {() => this.toggleModal()}
                        isVisible                       = {this.state.show_modal}
                    >
                        <View style={styles.commentModal}>

                            <View style={[styles.bg_White, styles.overHidden, styles.Width_100, styles.paddingVertical_10]}>
                                <View style={[styles.overHidden]}>
                                    <Text style={[styles.textRegular, styles.textSize_16, styles.text_black, styles.textCenter]}>
                                        { i18n.t('FAsww') }
                                    </Text>
                                    <View style={[styles.position_R, styles.Width_90, styles.marginVertical_10, styles.flexCenter]}>
                                        <Form style={[styles.position_R, styles.Width_90, styles.marginVertical_10, styles.flexCenter]}>
                                            <Item style={[styles.item, styles.position_R]}>
                                                <View style={[styles.lightOverlay, styles.Border]}></View>
                                                <Textarea
                                                    auto-capitalization             = {false}
                                                    rowSpan                         = {5}
                                                    placeholder                     = { i18n.t('textsent') }
                                                    style                           = {[styles.textArea, styles.bg_White, styles.Border]}
                                                    onChangeText                    = {(message) => this.setState({message})}
                                                />
                                            </Item>
                                            <Text style = {[styles.textRegular, styles.textCenter, styles.textSize_14 , styles.text_red]}>
                                                { this.state.error }
                                            </Text>
                                        </Form>
                                    </View>
                                    <TouchableOpacity style={[styles.overHidden, styles.paddingVertical_5 , styles.bg_midBrown, styles.Width_50, styles.flexCenter, styles.Radius_5]} onPress={() => this.onSent()}>
                                        <Text style={[styles.textRegular, styles.textSize_18, styles.text_White, styles.textCenter]}>
                                            { i18n.t('sent') }
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </Modal>
                </Content>
                </ImageBackground>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang , contactUs }) => {
    return {
        lang        : lang.lang,
        name        : contactUs.name,
        phone       : contactUs.phone,
        address     : contactUs.address,
        socials     : contactUs.socials,
        loader      : contactUs.loader
    };
};
export default connect(mapStateToProps, {getContactUs, complaint})(ContactUs);