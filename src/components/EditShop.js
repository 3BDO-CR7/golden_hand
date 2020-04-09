import React, { Component } from "react";
import {View, Text, Image, ImageBackground , TouchableOpacity , KeyboardAvoidingView } from "react-native";
import {Container, Content, Icon, Header, Left, Button, Body, Title, Form, Item, Input, Right,Textarea} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import * as Animatable from 'react-native-animatable';
import {connect} from "react-redux";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {updateProfile} from '../actions'


class EditShop extends Component {
    constructor(props){
        super(props);

        this.state={
            status              : null,
            nameStoreStatus     : 1,
            infoStoreStatus     : 1,
            nameStore		    : this.props.navigation.state.params.data.name,
            info	            : this.props.navigation.state.params.data.details,
            cityName            : this.props.navigation.state.params.data.address,
            storeImage          : this.props.navigation.state.params.data.avatar,
            base64              : null,
        }
    }

    componentWillMount() {



    }

    componentWillReceiveProps(nextProps) {

        if( nextProps.navigation.state.params != undefined ||  nextProps.navigation.state.params  != undefined){
            this.state.cityName             = nextProps.navigation.state.params.city_name;
            this.setState({latitude   : nextProps.navigation.state.params.latitude});
            this.setState({longitude  : nextProps.navigation.state.params.longitude});
        }else{
            this.setState({cityName  : this.props.user.address});
        }

    }

    onUpdateStore(){
        console.log('token', this.props.user);
        const data = {
            name                : this.state.nameStore,
            provider_details    : this.state.info,
            address             : this.state.city_name,
            avatar              : this.state.base64,
            lang                : this.props.lang,
            props               : this.props,
            phone               : this.props.user.phone,
            city_id             : this.props.user.city_id,
            lat                 : this.state.latitude,
            lng                 : this.state.longitude,
            token               : this.props.user.token,
            category_id         : this.props.user.category_id,
        };

            this.setState({ isSubmitted: true });
            this.props.updateProfile(data);
    };


    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };

    _pickImage = async () => {

        this.askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing   : true,
            aspect          : [4, 3],
            base64          : true
        });

        if (!result.cancelled) {
            this.setState({ storeImage: result.uri ,base64:result.base64});
        }

    };

    activeInput(type){

        if (type === 'nameStore' || this.state.nameStore !== ''){
            this.setState({ nameStoreStatus: 1 })
        }

        if (type === 'info' || this.state.info !== ''){
            this.setState({ infoStoreStatus: 1 })
        }
    }

    unActiveInput(type){

        if (type === 'nameStore' && this.state.nameStore === ''){
            this.setState({ nameStoreStatus: 0 })
        }

        if (type === 'info' && this.state.info === ''){
            this.setState({ infoStoreStatus: 0 })
        }

    }

    render() {

        let image = this.state.storeImage;

        return (
            <Container>
                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={[styles.text_midBrown, styles.textSize_22]} type="AntDesign" name='right' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_midBrown, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>
                            {i18n.t('editstore')}
                        </Title>
                    </Body>
                    <Right style={styles.rightIcon}>
                        <Button  style={[styles.bg_lightBrown, styles.Radius_0, styles.iconHeader, styles.flexCenter]} transparent onPress={() => this.props.navigation.navigate('drawerNavigator')}>
                            <Icon style={[styles.text_midBrown, styles.textSize_22]} type="AntDesign" name='close' />
                        </Button>
                    </Right>
                </Header>
                <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>
                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>


                        { image != null ?

                            <View style={[styles.position_R, styles.Width_90, styles.marginVertical_15, styles.marginHorizontal_10, styles.SelfCenter,{right:20}]}>
                                <View style={[styles.brownOverlay, styles.Border , {top:10 , left:10}]}/>
                                <View style={[styles.position_R, styles.Width_100, styles.overHidden, styles.bg_White,styles.bgFullWidth]}>
                                    <Image style={[styles.Width_100, styles.swiper]} source={{ uri: image }} resizeMode={'cover'}/>
                                    <View style={[styles.blackOverlay, {top:0 , left:0}]}/>
                                    <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[styles.blockContent]}>
                                        <View style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                            <TouchableOpacity onPress={this._pickImage}>
                                                <Icon style={[styles.text_White , styles.textSize_20]} type="AntDesign" name='plus' />
                                            </TouchableOpacity>
                                        </View>
                                    </Animatable.View>
                                </View>
                            </View>

                            :

                            <View style={[styles.position_R, styles.Width_90, styles.marginVertical_15, styles.marginHorizontal_10, styles.SelfCenter,{right:20}]}>
                                <View style={[styles.blackOverlay, styles.Border , {top:10 , left:10}]}/>
                                <View style={[styles.position_R, styles.Width_100, styles.overHidden, styles.bg_White,styles.bgFullWidth]}>
                                    <Image style={[styles.Width_100, styles.swiper]} source={{ uri: image }} resizeMode={'cover'}/>
                                    <View style={[styles.blackOverlay, {top:0 , left:0}]}/>
                                    <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[styles.blockContent, { backgroundColor : "#ffffff6b"}]}>
                                        <View style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                            <TouchableOpacity onPress={this._pickImage}>
                                                <Icon style={[styles.text_White , styles.textSize_20]} type="AntDesign" name='plus' />
                                            </TouchableOpacity>
                                        </View>
                                    </Animatable.View>
                                </View>
                            </View>
                        }

                        <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                            <Form style={[styles.Width_100, styles.flexCenter, styles.marginVertical_10, styles.Width_90]}>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                                    <Item floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                        <Input
                                            placeholder             = {i18n.translate('namestore')}
                                            style                   = {[ styles.input , styles.height_50 , (this.state.nameStoreStatus === 1 ? styles.Active : styles.noActive )]}
                                            onChangeText            = {(nameStore) => this.setState({nameStore})}
                                            onBlur                  = {() => this.unActiveInput('nameStore')}
                                            onFocus                 = {() => this.activeInput('nameStore')}
                                            value                   = {this.state.nameStore}
                                        />
                                    </Item>
                                    <View style = {[ styles.position_A , styles.bg_lightBrown, styles.flexCenter, styles.iconInput,  (this.state.nameStoreStatus === 1 ? styles.left_0 : styles.leftHidLeft )]}>
                                        <Icon style = {[styles.text_midBrown, styles.textSize_22]} type="AntDesign" name='user' />
                                    </View>
                                </View>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('MapLocation', {pageName : this.props.navigation.state.routeName})}  style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                                    <Item onPress={() => this.props.navigation.navigate('MapLocation', {pageName : this.props.navigation.state.routeName})} floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                        <Input
                                            placeholder             = {i18n.translate('map')}
                                            style                   = {[ styles.input , styles.height_50 , styles.Active]}
                                            value                   = {this.state.cityName}
                                            disabled
                                        />
                                    </Item>
                                    <View style = {[ styles.position_A , styles.bg_lightBrown, styles.flexCenter, styles.iconInput, styles.left_0 ]}>
                                        <Icon style = {[styles.text_midBrown, styles.textSize_22]} type="Feather" name='map-pin' />
                                    </View>
                                </TouchableOpacity>

                                <View style={[styles.position_R, styles.overHidden, styles.flexCenter ]}>
                                    <Item style={[styles.item, styles.position_R, styles.overHidden]}>
                                        <Textarea
                                            auto-capitalization             = {false}
                                            rowSpan                         = {5}
                                            placeholder                     = {i18n.translate('massmtger')}
                                            style                           = {[ styles.textArea , (this.state.infoStoreStatus === 1 ? styles.Active : styles.noActive )]}
                                            onChangeText                    = {(info) => this.setState({info})}
                                            onBlur                          = {() => this.unActiveInput('info')}
                                            onFocus                         = {() => this.activeInput('info')}
                                            value                           = {this.state.info}
                                        />
                                    </Item>
                                    <View style = {[ styles.position_A , styles.bg_lightBrown, styles.flexCenter, styles.iconInput,  (this.state.infoStoreStatus === 1 ? styles.left_0 : styles.leftHidLeft )]}>
                                        <Icon style = {[styles.text_midBrown, styles.textSize_22]} type="FontAwesome5" name='pencil-alt' />
                                    </View>
                                </View>

                            </Form>

                            <TouchableOpacity onPress={() => this.onUpdateStore()} style={[styles.cartBtn , styles.SelfCenter , {marginBottom:20}]}>
                                <Text style={[styles.textRegular, styles.text_White,styles.textSize_14, styles.textLeft]}>{ i18n.t('confirm') }</Text>
                            </TouchableOpacity>

                        </KeyboardAvoidingView>
                </Content>
                </ImageBackground>
            </Container>

        );
    }
}


const mapStateToProps = ({ lang, profile }) => {
    return {
        lang            : lang.lang,
        user            : profile.user,
    };
};
export default connect(mapStateToProps, { updateProfile })(EditShop);
