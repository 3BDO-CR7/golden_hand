import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground, KeyboardAvoidingView} from "react-native";
import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Toast,
    CheckBox,
    Picker,
    Icon,
    Left,
    Button,
    Body,
    Header
} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import {NavigationEvents} from "react-navigation";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import {getCities, register, categoryHome} from "../actions";
import axios from "axios";


import Spinner from "react-native-loading-spinner-overlay";
import CONST from "../consts";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            phone: '',
            mapsite: '',
            password: '',
            confirmpassword: '',
            deviceId: '',
            latitude: '',
            longitude: '',
            city_name: '',
            usernameStatus: 0,
            phoneStatus: 0,
            passwordStatus: 0,
            rePasswordStatus: 0,
            type: 0,
            userId: null,
            country: null,
            chooseUser: null,
            category_id: null,
            checked: false,
            PhotoID: i18n.t('PhotoID'),
            PhotoCar: i18n.t('PhotoCar'),
            PhotoLicense: i18n.t('PhotoLicense'),
            IDbase64: null,
            Carbase64: null,
            Licensebase64: null,
            spinner: false,
            mapRegion: null,
            hasLocationPermissions: false,
            initMap: true,
        }
    }

    async componentWillMount() {

        if (this.props.navigation.getParam('latitude') || this.props.navigation.getParam('longitude')) {
            this.state.city_name = this.props.navigation.getParam('city_name');
            this.setState({latitude: this.props.navigation.getParam('latitude')});
            this.setState({longitude: this.props.navigation.getParam('longitude')});
        }  else{
            axios({
                url         :  CONST.url + 'settings',
                method      :  'POST',
                data        :  {},
            }).then(response => {
                this.setState({
                    map_key   : response.data.map_key,
                    map       : response.data.map,
                    payment   : response.data.payment
                });
                this.get_places(response.data.map_key,response.data.map)
            });
        }

        this.props.categoryHome(this.props.lang);
        this.props.getCities(this.props.lang);


    }



    async get_places(allow,key){
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('صلاحيات تحديد موقعك الحالي ملغاه');
        }else {
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
            const userLocation = { latitude, longitude };
            this.setState({
                initMap: false,
                mapRegion: userLocation,
                latitude: userLocation.latitude,
                longitude: userLocation.longitude
            });
        }

        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity    += this.state.mapRegion.latitude + ',' + this.state.mapRegion.longitude;
        if(allow === '1'){
            getCity    += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=ar&sensor=true';
        }else{
            getCity    += '&key='+key+'&language=ar&sensor=true';
        }

        try {
            const { data } = await axios.get(getCity);
            this.setState({ city_name: data.results[0].formatted_address });

        } catch (e) {
            console.log(e);
        }
    }



    onFocus() {
        this.componentWillMount();
    }

    activeInput(type) {
        if (type === 'username' || this.state.username !== '') {
            this.setState({usernameStatus: 1})
        }

        if (type === 'phone' || this.state.phone !== '') {
            this.setState({phoneStatus: 1})
        }

        if (type === 'password' || this.state.password !== '') {
            this.setState({passwordStatus: 1})
        }

        if (type === 'rePasswordStatus' || this.state.confirmpassword !== '') {
            this.setState({rePasswordStatus: 1})
        }
    }

    unActiveInput(type) {
        if (type === 'username' && this.state.username === '') {
            this.setState({usernameStatus: 0})
        }

        if (type === 'phone' && this.state.phone === '') {
            this.setState({phoneStatus: 0})
        }

        if (type === 'password' && this.state.password === '') {
            this.setState({passwordStatus: 0})
        }

        if (type === 'rePasswordStatus' && this.state.confirmpassword === '') {
            this.setState({rePasswordStatus: 0})
        }

    }

    onValueUser(value) {
        this.setState({chooseUser: value});
    }

    onValueCountry(value) {
        this.setState({country: value});
    }

    onValueCategory(value) {
        this.setState({category_id: value});
    }


    validate = () => {

        let isError = false;
        let msg = '';

        if (this.state.username.length <= 0 || this.state.username.length < 4) {
            isError = true;
            msg = i18n.translate('Full');
        } else if (this.state.phone.length <= 0) {
            isError = true;
            msg = i18n.translate('namereq');
        } else if (this.state.phone.length < 10) {
            isError = true;
            msg = i18n.translate('aggnumber');
        } else if (this.state.chooseUser === null) {
            isError = true;
            msg = i18n.translate('chooseuser');
        } else if (this.state.country === null) {
            isError = true;
            msg = i18n.translate('choosecity');
        } else if (this.state.password.length <= 0 || this.state.password.length < 6) {
            isError = true;
            msg = i18n.translate('passreq');
        } else if (this.state.password !== this.state.confirmpassword) {
            isError = true;
            msg = i18n.translate('notmatch');
        } else if (this.state.checked === false) {
            isError = true;
            msg = i18n.translate('aggreTerms');
        }

        if (msg !== '') {
            Toast.show({
                text: msg,
                duration: 2000,
                type: "danger",
                textStyle: {
                    color: "white",
                    fontFamily: 'cairo',
                    textAlign: 'center',
                }
            });
        }
        return isError;
    };

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };

    _pickImage = async (key) => {

        this.askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true
        });

        let localUri = result.uri;
        let filename = localUri.split('/').pop();
        console.log(result);

        if (!result.cancelled) {
            if (key === 'ID') {
                this.setState({
                    idImage: result.uri,
                    IDbase64: result.base64,
                    PhotoID: filename,
                });
            } else if (key === 'Car') {
                this.setState({
                    carImage: result.uri,
                    Carbase64: result.base64,
                    PhotoCar: filename,
                });
            } else if (key === 'License') {
                this.setState({
                    licenseImage: result.uri,
                    Licensebase64: result.base64,
                    PhotoLicense: filename,
                });
            }
        }
    };

    onRegisterPressed() {

        this.setState({spinner: true});

        const err = this.validate();

        if (!err) {
            const {username, chooseUser, phone, category_id, latitude, longitude, city_name, country, IDbase64, Carbase64, Licensebase64, password} = this.state;
            const data = {
                username,
                chooseUser,
                phone,
                category_id,
                latitude,
                longitude,
                city_name,
                country,
                IDbase64,
                Carbase64,
                Licensebase64,
                password
            };

            this.props.register(data, this.props, this.props.lang);
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
                <NavigationEvents onWillFocus={() => this.onFocus()}/>

                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={[styles.bgFullWidth]}
                >

                <Content contentContainerStyle={styles.bgFullWidth}>
                        <View
                            style={[styles.position_R, styles.bgFullWidth, styles.marginVertical_15, styles.SelfCenter, styles.Width_100]}>
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
                                        <Item floatingLabel
                                              style={[styles.item, styles.position_R, styles.overHidden]}>
                                            <Input
                                                placeholder={i18n.t('userName')}
                                                style={[styles.input, styles.height_50, (this.state.usernameStatus === 1 ? styles.Active : styles.noActive)]}
                                                onChangeText={(username) => this.setState({username})}
                                                onBlur={() => this.unActiveInput('username')}
                                                onFocus={() => this.activeInput('username')}
                                            />
                                        </Item>
                                        <View
                                            style={[styles.position_A, styles.bg_White, styles.flexCenter, styles.iconInput, (this.state.usernameStatus === 1 ? styles.left_0 : styles.leftHidLeft)]}>
                                            <Icon style={[styles.text_darkBrown, styles.textSize_22]} type="AntDesign"
                                                  name='user'/>
                                        </View>
                                    </View>

                                    <View
                                        style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                        <Item floatingLabel
                                              style={[styles.item, styles.position_R, styles.overHidden]}>
                                            <Input
                                                placeholder={i18n.t('phone')}
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

                                    <View
                                        style={[styles.viewPiker, styles.flexCenter, styles.marginVertical_15, styles.Width_100, styles.borderBold]}>
                                        <Item style={styles.itemPiker} regular>
                                            <Picker
                                                mode="dropdown"
                                                style={styles.Picker}
                                                placeholderStyle={[styles.textRegular, {
                                                    color: "#7C7C7C",
                                                    writingDirection: 'rtl',
                                                    width: '100%',
                                                    fontSize: 14
                                                }]}
                                                selectedValue={this.state.chooseUser}
                                                onValueChange={this.onValueUser.bind(this)}
                                                textStyle={[styles.textRegular, {
                                                    color: "#7C7C7C",
                                                    writingDirection: 'rtl'
                                                }]}
                                                placeholder={i18n.t('viewgest')}
                                                itemTextStyle={[styles.textRegular, {
                                                    color: "#7C7C7C",
                                                    writingDirection: 'rtl'
                                                }]}
                                            >

                                                <Picker.Item style={[styles.Width_100]} label={i18n.t('viewgest')}
                                                             value={null}/>

                                                <Picker.Item style={[styles.Width_100]} label={i18n.t('user')}
                                                             value="user"/>
                                                <Picker.Item style={[styles.Width_100]} label={i18n.t('provider_matgar')}
                                                             value="provider"/>
                                                {/*<Picker.Item style={[styles.Width_100]} label={i18n.t('delegat')}*/}
                                                {/*             value="delegate"/>*/}

                                            </Picker>
                                        </Item>
                                        <Icon style={styles.iconPicker} type="AntDesign" name='down'/>
                                    </View>

                                    <View
                                        style={[styles.viewPiker, styles.flexCenter, styles.marginVertical_15, styles.Width_100, styles.borderBold]}>
                                        <Item style={styles.itemPiker} regular>
                                            <Picker
                                                mode="dropdown"
                                                style={styles.Picker}
                                                placeholderStyle={[styles.textRegular, {
                                                    color: "#7C7C7C",
                                                    writingDirection: 'rtl',
                                                    width: '100%',
                                                    fontSize: 14
                                                }]}
                                                selectedValue={this.state.country}
                                                onValueChange={this.onValueCountry.bind(this)}
                                                textStyle={[styles.textRegular, {
                                                    color: "#7C7C7C",
                                                    writingDirection: 'rtl',
                                                    width: '100%',
                                                }]}
                                                placeholder={i18n.translate('city')}
                                                itemTextStyle={[styles.textRegular, {
                                                    color: "#7C7C7C",
                                                    writingDirection: 'rtl',
                                                    width: '100%',
                                                }]}
                                            >

                                                <Picker.Item style={[styles.Width_100]} label={i18n.t('city')}
                                                             value={null}/>
                                                {
                                                    this.props.citys.map((city, i) => (
                                                        <Picker.Item style={styles.Width_100} key={i}
                                                                     label={city.name}
                                                                     value={city.id}/>
                                                    ))
                                                }

                                            </Picker>
                                        </Item>
                                        <Icon style={styles.iconPicker} type="AntDesign" name='down'/>
                                    </View>

                                    {
                                        this.state.chooseUser === 'provider' ?

                                            <View
                                                style={[styles.viewPiker, styles.flexCenter, styles.marginVertical_15, styles.Width_100, styles.borderBold]}>
                                                <Item style={styles.itemPiker} regular>
                                                    <Picker
                                                        mode="dropdown"
                                                        style={styles.Picker}
                                                        placeholderStyle={[styles.textRegular, {
                                                            color: "#7C7C7C",
                                                            writingDirection: 'rtl',
                                                            width: '100%',
                                                            fontSize: 14
                                                        }]}
                                                        selectedValue={this.state.category_id}
                                                        onValueChange={this.onValueCategory.bind(this)}
                                                        textStyle={[styles.textRegular, {
                                                            color: "#7C7C7C",
                                                            writingDirection: 'rtl',
                                                            width: '100%',
                                                        }]}
                                                        placeholder={i18n.translate('category')}
                                                        itemTextStyle={[styles.textRegular, {
                                                            color: "#7C7C7C",
                                                            writingDirection: 'rtl',
                                                            width: '100%',
                                                        }]}
                                                    >

                                                        <Picker.Item style={[styles.Width_100]}
                                                                     label={i18n.t('category')} value={null}/>
                                                        {
                                                            this.props.categories.map((cate, i) => (
                                                                <Picker.Item style={styles.Width_100} key={i}
                                                                             label={cate.name} value={cate.id}/>
                                                            ))
                                                        }

                                                    </Picker>
                                                </Item>
                                                <Icon style={styles.iconPicker} type="AntDesign" name='down'/>
                                            </View>

                                            :
                                            <View/>
                                    }

                                    <TouchableOpacity
                                        style={[styles.borderBold, styles.marginVertical_15, styles.Width_100, styles.height_50, styles.rowGroup, styles.paddingHorizontal_10]}
                                        onPress={() => this.props.navigation.navigate('MapLocation', {pageName: this.props.navigation.state.routeName})}>
                                        <Text style={[styles.textRegular, styles.text_black, styles.width_200]}
                                              numberOfLines={1} prop with ellipsizeMode="tail">
                                            {this.state.city_name}
                                        </Text>
                                        <View style={[styles.overHidden]}>
                                            <Icon style={[styles.text_black, styles.textSize_16]} type="Feather"
                                                  name='map-pin'/>
                                        </View>
                                    </TouchableOpacity>

                                    {
                                        this.state.chooseUser === 'delegate' ?

                                            <TouchableOpacity
                                                style={[styles.borderBold, styles.marginVertical_15, styles.Width_100, styles.height_50, styles.rowGroup, styles.paddingHorizontal_10]}
                                                onPress={() => this._pickImage('ID')}>
                                                <Text
                                                    style={[styles.textRegular, styles.text_black, styles.width_200]}
                                                    numberOfLines={1} prop with ellipsizeMode="tail">
                                                    {this.state.PhotoID}
                                                </Text>
                                                <View style={[styles.overHidden]}>
                                                    <Icon style={[styles.text_black, styles.textSize_16]}
                                                          type="Feather"
                                                          name='camera'/>
                                                </View>
                                            </TouchableOpacity>

                                            :
                                            <View/>
                                    }

                                    {
                                        this.state.chooseUser === 'delegate' ?

                                            <TouchableOpacity
                                                style={[styles.borderBold, styles.marginVertical_15, styles.Width_100, styles.height_50, styles.rowGroup, styles.paddingHorizontal_10]}
                                                onPress={() => this._pickImage('Car')}>
                                                <Text
                                                    style={[styles.textRegular, styles.text_black, styles.width_200]}
                                                    numberOfLines={1} prop with ellipsizeMode="tail">
                                                    {this.state.PhotoCar}
                                                </Text>
                                                <View style={[styles.overHidden]}>
                                                    <Icon style={[styles.text_black, styles.textSize_16]}
                                                          type="Feather"
                                                          name='camera'/>
                                                </View>
                                            </TouchableOpacity>

                                            :
                                            <View/>
                                    }

                                    {
                                        this.state.chooseUser === 'delegate' ?

                                            <TouchableOpacity
                                                style={[styles.borderBold, styles.marginVertical_15, styles.Width_100, styles.height_50, styles.rowGroup, styles.paddingHorizontal_10]}
                                                onPress={() => this._pickImage('License')}>
                                                <Text
                                                    style={[styles.textRegular, styles.text_black, styles.width_200]}
                                                    numberOfLines={1} prop with ellipsizeMode="tail">
                                                    {this.state.PhotoLicense}
                                                </Text>
                                                <View style={[styles.overHidden]}>
                                                    <Icon style={[styles.text_black, styles.textSize_16]}
                                                          type="Feather"
                                                          name='camera'/>
                                                </View>
                                            </TouchableOpacity>

                                            :
                                            <View/>
                                    }

                                    <View
                                        style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                        <Item floatingLabel
                                              style={[styles.item, styles.position_R, styles.overHidden]}>
                                            <Input
                                                placeholder={i18n.t('password')}
                                                style={[styles.input, styles.height_50, (this.state.passwordStatus === 1 ? styles.Active : styles.noActive)]}
                                                onChangeText={(password) => this.setState({password})}
                                                onBlur={() => this.unActiveInput('password')}
                                                onFocus={() => this.activeInput('password')}
                                                secureTextEntry
                                            />
                                        </Item>
                                        <View
                                            style={[styles.position_A, styles.bg_White, styles.flexCenter, styles.iconInput, (this.state.passwordStatus === 1 ? styles.left_0 : styles.leftHidLeft)]}>
                                            <Icon style={[styles.text_darkBrown, styles.textSize_22]} type="AntDesign"
                                                  name='lock1'/>
                                        </View>
                                    </View>

                                    <View
                                        style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter]}>
                                        <Item floatingLabel
                                              style={[styles.item, styles.position_R, styles.overHidden]}>
                                            <Input
                                                placeholder={i18n.t('confirmPassword')}
                                                style={[styles.input, styles.height_50, (this.state.rePasswordStatus === 1 ? styles.Active : styles.noActive)]}
                                                onChangeText={(confirmpassword) => this.setState({confirmpassword})}
                                                onBlur={() => this.unActiveInput('rePasswordStatus')}
                                                onFocus={() => this.activeInput('rePasswordStatus')}
                                                secureTextEntry
                                            />
                                        </Item>
                                        <View
                                            style={[styles.position_A, styles.bg_White, styles.flexCenter, styles.iconInput, (this.state.rePasswordStatus === 1 ? styles.left_0 : styles.leftHidLeft)]}>
                                            <Icon style={[styles.text_darkBrown, styles.textSize_22]} type="AntDesign"
                                                  name='lock1'/>
                                        </View>
                                    </View>

                                    <View style={[styles.rowRight, styles.marginVertical_20]}>
                                        <TouchableOpacity style={[styles.rowRight, styles.marginVertical_10]}>
                                            <CheckBox
                                                style={[styles.checkBox, styles.Border, styles.bg_darkBrown]}
                                                color={styles.text_gray}
                                                selectedColor={styles.text_White}
                                                onPress={() => this.setState({checked: !this.state.checked})}
                                                checked={this.state.checked}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Terms')}>
                                            <Text
                                                style={[styles.textRegular, styles.text_black, styles.textSize_16, styles.paddingHorizontal_15, styles.textDecoration]}>
                                                {i18n.t('agreTe')}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity
                                        style={[
                                            styles.bg_darkBrown,
                                            styles.width_150,
                                            styles.flexCenter,
                                            styles.marginVertical_15,
                                            styles.height_40
                                        ]}
                                        onPress={() => this.onRegisterPressed()}>
                                        <Text style={[styles.textRegular, styles.textSize_14, styles.text_White]}>
                                            {i18n.t('doHaveAcc')}
                                        </Text>
                                    </TouchableOpacity>


                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                                        <Text
                                            style={[styles.textRegular, styles.text_black, styles.textSize_16, styles.paddingHorizontal_15, styles.textDecoration]}>
                                            {i18n.t('have_account')}
                                        </Text>
                                    </TouchableOpacity>

                                </Form>
                            </KeyboardAvoidingView>
                            <View
                                style={[styles.bg_White, styles.SelfLeft, styles.paddingHorizontal_10, styles.height_100, styles.centerContext, styles.marginVertical_25]}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}
                                                  style={[styles.bg_lightBrown, styles.paddingHorizontal_10, styles.height_40, styles.centerContext]}>
                                    <Text style={[styles.textRegular, styles.textSize_14, styles.text_darkBrown]}>
                                        {i18n.t('login')}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                </Content>
                    </ImageBackground>
            </Container>
        );
    }
}


const mapStateToProps = ({lang, cities, register, categoryHome}) => {
    return {
        lang: lang.lang,
        citys: cities.cities,
        loader: register.loader,
        categories: categoryHome.categories,
    };
};
export default connect(mapStateToProps, {getCities, register, categoryHome})(Register);
