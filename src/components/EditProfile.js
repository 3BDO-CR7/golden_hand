import React, { Component } from "react";
import {View, Text, Image, ImageBackground  , TouchableOpacity , KeyboardAvoidingView } from "react-native";
import {Container, Content, Icon, Header, Left, Button, Body, Title, Form, Item, Input, Right, Picker} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import {DoubleBounce} from "react-native-loader";
import * as Animatable from 'react-native-animatable';
import {connect} from "react-redux";
import {categoryHome, getCities, updateProfile} from '../actions'
import COLORS from '../../src/consts/colors'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


class EditProfile extends Component {
    constructor(props){
        super(props);

        this.state={
            status              : null,
            username		    : this.props.user.name,
            phone	            : this.props.user.phone,
            usernameStatus      : 1,
            phoneStatus         : 1,
            country             : this.props.user.city_id,
            latitude            : '',
            longitude           : '',
            city_name           : this.props.user.address,
            userImage           : this.props.user.avatar,
            base64              : null,
            isSubmitted         : false,
            category_id	        : this.props.user.category_id,
        }
    }

    componentWillMount() {

        this.props.getCities( this.props.lang );

        if(this.props.user != null && this.props.user.type === 'provider'){

            this.props.categoryHome( this.props.lang );

        }

    }

    renderEditProfile(){
        if (this.state.username == '' || this.state.phone == ''){
            return (
                <TouchableOpacity style={[styles.cartBtn , styles.SelfCenter , {marginBottom:20}]}>
                    <Text style={[styles.textRegular, styles.text_White,styles.textSize_14, styles.textLeft]}>{ i18n.t('confirm') }</Text>
                </TouchableOpacity>
            );
        }

        if (this.state.isSubmitted){
            return(
                <View style={[{ justifyContent: 'center', alignItems: 'center' , marginBottom:20 }]}>
                    <DoubleBounce size={20} color={COLORS.darkBrown} style={{ alignSelf: 'center' }} />
                </View>
            )
        }

        return (
            <TouchableOpacity onPress={() => this.onUpdateProfile()} style={[styles.cartBtn , styles.SelfCenter , {marginBottom:20}]}>
                <Text style={[styles.textRegular, styles.text_White,styles.textSize_14, styles.textLeft]}>{ i18n.t('confirm') }</Text>
            </TouchableOpacity>
        );
    }


    onUpdateProfile(){
        const data = {
            name                : this.state.username,
            phone               : this.state.phone,
            city_id             : this.state.country,
            lat                 : this.state.latitude,
            lng                 : this.state.longitude,
            address             : this.state.city_name,
            avatar              : this.state.base64,
            category_id         : this.props.user != null && this.props.user.type === 'provider' ? this.state.category_id : null,
            lang                : this.props.lang,
            token               : this.props.user.token,
            provider_details    : null,
            props               : this.props,
        };

        this.setState({ isSubmitted: true });
        this.props.updateProfile(data);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isSubmitted: false });
        if( nextProps.navigation.state.params != undefined ||  nextProps.navigation.state.params  != undefined){
            this.state.city_name            = nextProps.navigation.state.params.city_name;
            this.setState({latitude   : nextProps.navigation.state.params.latitude});
            this.setState({longitude  : nextProps.navigation.state.params.longitude});
        }else{
            this.setState({city_name  : this.props.user.address});
        }
    }

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };

    _pickImage = async () => {

        this.askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64:true
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ userImage: result.uri ,base64:result.base64});
        }
    };


    onValueCountry      (value) {this.setState({country: value});}

    onValueCategory     (value) {this.setState({category_id: value});}

    activeInput(type){
        if (type === 'username' || this.state.username !== ''){
            this.setState({ usernameStatus: 1 })
        }

        if (type === 'phone' || this.state.phone !== ''){
            this.setState({ phoneStatus: 1 })
        }

        if (type === 'password' || this.state.password !== ''){
            this.setState({ passwordStatus: 1 })
        }

        if (type === 'rePasswordStatus' || this.state.confirmpassword !== ''){
            this.setState({rePasswordStatus: 1})
        }
    }

    unActiveInput(type){
        if (type === 'username' && this.state.username === ''){
            this.setState({ usernameStatus: 0 })
        }

        if (type === 'phone' && this.state.phone === ''){
            this.setState({ phoneStatus: 0 })
        }

        if (type === 'password' && this.state.password === ''){
            this.setState({ passwordStatus: 0 })
        }

        if (type === 'rePasswordStatus' && this.state.confirmpassword === ''){
            this.setState({ rePasswordStatus: 0 })
        }

    }

    render() {

        let image = this.state.userImage;

        return (
            <Container>
                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={[styles.text_midBrown, styles.textSize_22]} type="AntDesign" name='right' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                    <Title style={[styles.textRegular , styles.text_midBrown, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>{i18n.t('editAcc')}</Title>
                    </Body>
                    <Right style={styles.rightIcon}>
                        <Button  style={[styles.bg_lightBrown, styles.Radius_0, styles.iconHeader, styles.flexCenter]} transparent onPress={() => this.props.navigation.navigate('profile')}>
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
                                    <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[styles.blockContent , { backgroundColor : "#ffffff6b"}]}>
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
                        }

                        <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                            <Form style={[styles.Width_100, styles.flexCenter, styles.marginVertical_10, styles.Width_90]}>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                                    <Item floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                        <Input
                                            placeholder             = {i18n.translate('userName')}
                                            style                   = {[ styles.input , styles.height_50 , (this.state.usernameStatus === 1 ? styles.Active : styles.noActive )]}
                                            onChangeText            = {(username) => this.setState({username})}
                                            onBlur                  = {() => this.unActiveInput('username')}
                                            onFocus                 = {() => this.activeInput('username')}
                                            value                   = {this.state.username}
                                        />
                                    </Item>
                                    <View style = {[ styles.position_A , styles.bg_lightBrown, styles.flexCenter, styles.iconInput,  (this.state.usernameStatus === 1 ? styles.left_0 : styles.leftHidLeft )]}>
                                        <Icon style = {[styles.text_midBrown, styles.textSize_22]} type="AntDesign" name='user' />
                                    </View>
                                </View>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                                    <Item floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                        <Input
                                            placeholder             = {i18n.translate('phone')}
                                            style                   = {[ styles.input , styles.height_50 , (this.state.phoneStatus === 1 ? styles.Active : styles.noActive )]}
                                            onChangeText            = {(phone) => this.setState({phone})}
                                            onBlur                  = {() => this.unActiveInput('phone')}
                                            onFocus                 = {() => this.activeInput('phone')}
                                            value                   = {this.state.phone}
                                            keyboardType            = {'number-pad'}
                                        />
                                    </Item>
                                    <View style = {[ styles.position_A , styles.bg_lightBrown, styles.flexCenter, styles.iconInput,  (this.state.phoneStatus === 1 ? styles.left_0 : styles.leftHidLeft )]}>
                                        <Icon style = {[styles.text_midBrown, styles.textSize_22]} type="MaterialCommunityIcons" name='cellphone' />
                                    </View>
                                </View>

                                {
                                    this.props.user != null && this.props.user.type === 'provider' ?

                                        <View style={[styles.viewPiker, styles.flexCenter,styles.marginVertical_15,styles.Width_100, styles.Active,]}>
                                            <Item style={styles.itemPiker} regular>
                                                <Picker
                                                    mode                    = "dropdown"
                                                    style                   = {styles.Picker}
                                                    placeholderStyle        = {[styles.textRegular,{ color: "#7C7C7C", writingDirection: 'rtl', width : '100%', fontSize : 14 }]}
                                                    selectedValue           = {this.state.category_id}
                                                    onValueChange           = {this.onValueCategory.bind(this)}
                                                    textStyle               = {[styles.textRegular,{ color: "#7C7C7C", writingDirection: 'rtl', width : '100%', }]}
                                                    placeholder             = {i18n.translate('category')}
                                                    itemTextStyle           = {[styles.textRegular,{ color: "#7C7C7C", writingDirection: 'rtl', width : '100%', }]}
                                                >

                                                    <Picker.Item style={[styles.Width_100]} label={i18n.t('category')} value={null} />
                                                    {
                                                        this.props.categories.map((cate, i) => (
                                                            <Picker.Item style={styles.Width_100} key={i} label={cate.name} value={cate.id} />
                                                        ))
                                                    }

                                                </Picker>
                                            </Item>
                                            <Icon style={styles.iconPicker} type="AntDesign" name='down' />
                                            <View style = {[ styles.position_A , styles.bg_lightBrown, styles.flexCenter, styles.iconInput, styles.left_0 , {top:-1, left:-1}]}>
                                                <Icon style = {[styles.text_midBrown, styles.textSize_22]} type="FontAwesome5" name='pencil-alt' />
                                            </View>
                                        </View>

                                        :
                                        <View/>
                                }

                                <View style={[styles.viewPiker, styles.flexCenter,styles.marginVertical_15,styles.Width_100, styles.Active,]}>
                                    <Item style={styles.itemPiker} regular>
                                        <Picker
                                            mode                    = "dropdown"
                                            style                   = {styles.Picker}
                                            placeholderStyle        = {[styles.textRegular,{ color: "#121212", writingDirection: 'rtl', width : '100%', fontSize : 14 }]}
                                            selectedValue           = {this.state.country}
                                            onValueChange           = {this.onValueCountry.bind(this)}
                                            textStyle               = {[styles.textRegular,{ color: "#121212", writingDirection: 'rtl', width : '100%', }]}
                                            placeholder             = {i18n.translate('city')}
                                            itemTextStyle           = {[styles.textRegular,{ color: "#121212", writingDirection: 'rtl', width : '100%', }]}
                                        >
                                            <Picker.Item style={[styles.Width_100]} label={i18n.t('city')} value={null} />
                                            {
                                                this.props.cities.map((city, i) => (
                                                    <Picker.Item key={i} label={city.name} value={city.id} />
                                                ))

                                            }

                                        </Picker>
                                    </Item>
                                    <Icon style={styles.iconPicker} type="AntDesign" name='down' />
                                    <View style = {[ styles.position_A , styles.bg_lightBrown, styles.flexCenter, styles.iconInput, styles.left_0 , {top:-1, left:-1}]}>
                                        <Icon style = {[styles.text_midBrown, styles.textSize_22]} type="MaterialCommunityIcons" name='flag' />
                                    </View>
                                </View>

                                {/*<TouchableOpacity onPress={() => this.props.navigation.navigate('MapLocation', {pageName : this.props.navigation.state.routeName})} style={[styles.borderBold, styles.marginVertical_15, styles.Width_100, styles.height_50,styles.rowGroup,styles.paddingHorizontal_10]}>*/}
                                    {/*<Text style={[styles.textRegular , styles.text_black,]}>*/}
                                        {/*{this.state.city_name}*/}
                                    {/*</Text>*/}
                                    {/*<View style={[styles.overHidden]}>*/}
                                        {/*<Icon style={[styles.text_black, styles.textSize_16]} type="Feather" name='map-pin' />*/}
                                    {/*</View>*/}
                                {/*</TouchableOpacity>*/}


                                <TouchableOpacity onPress={() => this.props.navigation.navigate('MapLocation', {pageName : this.props.navigation.state.routeName})}  style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                                    <Item onPress={() => this.props.navigation.navigate('MapLocation', {pageName : this.props.navigation.state.routeName})} floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                        <Input
                                            placeholder             = {i18n.translate('map')}
                                            style                   = {[ styles.input , styles.height_50 , styles.Active]}
                                            value                   = {this.state.city_name}
                                            disabled
                                        />
                                    </Item>
                                    <View style = {[ styles.position_A , styles.bg_lightBrown, styles.flexCenter, styles.iconInput, styles.left_0 ]}>
                                        <Icon style = {[styles.text_midBrown, styles.textSize_22]} type="Feather" name='map-pin' />
                                    </View>
                                </TouchableOpacity>
                            </Form>

                            {
                                this.renderEditProfile()
                            }

                        </KeyboardAvoidingView>
                </Content>
                </ImageBackground>
            </Container>

        );
    }
}


const mapStateToProps = ({ lang , cities , profile, categoryHome}) => {
    return {
        lang            : lang.lang,
        cities          : cities.cities,
        user            : profile.user,
        categories      : categoryHome.categories,
    };
};
export default connect(mapStateToProps, {getCities , updateProfile, categoryHome})(EditProfile);