import React, {Component} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    Platform,
    FlatList,
    Animated,
    Dimensions,
    I18nManager
} from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Left,
    Icon,
    Body,
    Title,
    Right,
    Item,
    Picker,
    CheckBox,
    Input,
} from 'native-base'
import styles from '../../assets/style'
import {DoubleBounce} from 'react-native-loader';
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import i18n from "../../locale/i18n";
import StarRating from 'react-native-star-rating';
import Modal from "react-native-modal";
import * as Animatable from 'react-native-animatable';
import {categoryProviders, searchProviders, filterProviders, getCities} from '../actions';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import COLORS from '../consts/colors'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const isIOS = Platform.OS === 'ios';

class FilterCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            country: null,
            show_modal: false,
            checked: false,
            toggle: false,
            rating: '',
            nameSearch: '',
            latitude: '',
            longitude: '',
            city_name: '',
            loader: true
        }
    }

    static navigationOptions = () => ({
        header: null,
        drawerLabel: (<Text style={styles.textLabel}>{i18n.t('home')}</Text>),
        drawerIcon: (<Icon style={styles.icon} type="SimpleLineIcons" name="home"/>)
    });

    componentWillMount() {

        this.setState({loader: true});
        // setTimeout(() => this.props.categoryProviders(this.props.lang, this.props.navigation.state.params.id), 2000);
        this.props.categoryProviders(this.props.lang, this.props.navigation.state.params.id);

        this.props.getCities(this.props.lang);

        if (this.props.navigation.getParam('latitude') || this.props.navigation.getParam('longitude')) {
            this.state.city_name = this.props.navigation.getParam('city_name');
            this.setState({latitude: this.props.navigation.getParam('latitude')});
            this.setState({longitude: this.props.navigation.getParam('longitude')});
        } else {
            this.setState({city_name: i18n.t('mapname')});
        }

    }

    componentWillReceiveProps(nextProps) {
        this.setState({loader: false});
    }


    onValueCountry(value) {
        this.setState({country: value});
    }

    selectRating(id) {
        this.setState({
            rating: id,
        });
        this.state.rating = id;
    }

    toggleModal = () => {
        this.setState({show_modal: !this.state.show_modal});
    };

    onSearch(keyword) {

        this.setState({nameSearch: keyword});
        const data = {keyword, lang: this.props.lang , category_id : this.props.navigation.state.params.id };

        this.props.searchProviders(data);
    }

    onFilter() {
        const {country, rating} = this.state;
        const data = {
            lang        : this.props.lang,
            city_id     : country,
            rate        : rating,
            category_id : this.props.navigation.state.params.id
        };

        this.props.filterProviders(data);

        this.setState({show_modal: !this.state.show_modal , loader:true});

        console.log('data filter', data);

    }

    _keyExtractor = (item, index) => item.id;

    renderItems = (item, key) => {

        return (

            <View>
                <TouchableOpacity
                    onPress={() => {
                        // if(this.props.auth){
                            this.props.navigation.navigate('provider', {id: item.id, name: item.name})
                        // }else{
                        //     this.props.navigation.navigate('Login')
                        // }
                    }}
                    style={[styles.position_R, styles.flexCenter, styles.Width_90, styles.marginVertical_15]}
                    key={key}
                >
                    <View style={[styles.lightOverlay, styles.Border]} />
                    <View
                        style={[styles.rowGroup, styles.bg_White, styles.Border, styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                        <View style={[styles.icImg, styles.flex_30]}>
                            <Image style={styles.icImg} source={{uri: item.avatar}} resizeMode={'cover'}/>
                        </View>
                        <View style={[styles.flex_70]}>
                            <View style={[styles.rowGroup]}>
                                <Text style={[styles.textRegular, styles.text_midBrown]}>
                                    {item.name}
                                </Text>
                                <StarRating
                                    disabled={true}
                                    maxStars={5}
                                    rating={item.rate}
                                    fullStarColor={COLORS.midBrown}
                                    starStyle={[styles.textSize_16, {marginHorizontal: 2}]}
                                />
                            </View>
                            <View style={[styles.overHidden]}>
                                <Text style={[styles.textRegular, styles.text_gray, styles.Width_100, styles.textLeft]}>
                                    {/*{item.category}*/}
                                </Text>
                            </View>
                            <View style={[styles.overHidden, styles.rowRight]}>
                                <Icon style={[styles.text_gray, styles.textSize_14]} type="Feather" name='map-pin'/>
                                <Text style={[styles.textRegular, styles.text_gray, styles.marginHorizontal_5, styles.flex, {textAlign : I18nManager.isRTL ? 'left' : 'right'}]}
                                      numberOfLines   = { 1 } prop with
                                      ellipsizeMode   = "tail">
                                    {item.address}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };


    renderNoData() {
        if (this.props.providers && (this.props.providers).length <= 0) {
            return (
                <View style={[styles.directionColumnCenter, {height: '95%'}]}>
                    <Image source={require('../../assets/images/no-data.png')} resizeMode={'contain'}
                           style={{alignSelf: 'center', width: 200, height: 200}}/>
                </View>
            );
        }

        return <View/>
    }

    componentDidMount() {
        this.runPlaceHolder();
    }

    runPlaceHolder() {
        if (Array.isArray(this.loadingAnimated) && this.loadingAnimated.length > 0) {
            Animated.parallel(
                this.loadingAnimated.map(animate => {
                    if (animate && animate.getAnimated) {
                        return animate.getAnimated();
                    }
                    return null;
                }),
                {
                    stopTogether: false,
                }
            ).start(() => {
                this.runPlaceHolder();
            })
        }
    }

    _renderRows(loadingAnimated, numberRow, uniqueKey) {
        let shimmerRows = [];
        for (let index = 0; index < numberRow; index++) {
            shimmerRows.push(
                <ShimmerPlaceHolder
                    key={`loading-${index}-${uniqueKey}`}
                    ref={(ref) => loadingAnimated.push(ref)}
                    style={{marginVertical: 7, alignSelf: 'center'}}
                    width={width - 20}
                    height={100}
                    colorShimmer={['#ffffff75', COLORS.lightBrown, '#ffffff75']}
                    duration = {1600}
                />
            )
        }

        return (
            <View>
                {shimmerRows}
            </View>
        )
    }

    onFocus() {
        this.componentWillMount();
    }

    render() {

        this.loadingAnimated = [];

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
                            {this.props.navigation.state.params.name}
                        </Title>
                    </Body>
                    <Right style={styles.rightIcon}>
                        <Button style={[styles.bg_lightBrown, styles.Radius_0, styles.iconHeader, styles.flexCenter]}
                                transparent onPress={this.toggleModal}>
                            <Icon style={[styles.text_midBrown, styles.textSize_20]} type="Feather" name='filter'/>
                        </Button>
                    </Right>
                </Header>
                <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>
                <Content contentContainerStyle={styles.bgFullWidth} style={styles.bgFullWidth}>

                        <View style={[styles.position_R, styles.Width_60, styles.SelfRight]}>
                            <Item floatingLabel style={styles.item}>
                                <Input
                                    placeholder={i18n.translate('sear')}
                                    style={[styles.input, styles.height_40, styles.bg_lightBrown, {right:-20}]}
                                    autoCapitalize='none'
                                    onChangeText={(nameSearch) => this.onSearch(nameSearch)}
                                />
                            </Item>
                            <TouchableOpacity
                                style={[styles.position_A, styles.iconSearch, styles.width_50, styles.height_40, styles.flexCenter,]}
                                onPress={() => this.onSearch()}
                            >
                                <Icon style={[styles.text_midBrown, styles.textSize_20]} type="AntDesign" name='search1'/>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.marginVertical_5, styles.overHidden]}>

                            {
                                this.state.loader ?
                                    this._renderRows(this.loadingAnimated, 5, '5rows') :
                                    <View>
                                        {this.renderNoData()}
                                        {
                                            this.props.providers ?
                                                <FlatList
                                                    data={this.props.providers}
                                                    renderItem={({item}) => this.renderItems(item)}
                                                    numColumns={1}
                                                    keyExtractor={this._keyExtractor}
                                                    // extraData               = {this.props.categoryProviders}
                                                    onEndReachedThreshold={isIOS ? .01 : 1}
                                                />
                                                :
                                                <View/>
                                        }
                                    </View>

                            }

                        </View>

                        <Modal
                            onBackButtonPress={() => this.setState({show_modal: false})}
                            isVisible={this.state.show_modal}
                            style={styles.bgModelFilter}
                            hasBackdrop={false}
                            animationIn={'slideInRight'}
                            animationOut={'slideOutRight'}
                            animationInTiming={500}
                            animationOutTiming={500}
                            backdropTransitionInTiming={500}
                            backdropTransitionOutTiming={500}
                            swipeDirection="Right"
                        >
                            <View style={styles.contentModel}>
                                <View style={styles.model}>

                                    <Animatable.View animation="fadeInRight" easing="ease-out" delay={500}>
                                        <View
                                            style={[styles.bg_lightBrown, styles.overHidden, styles.paddingVertical_10, styles.Width_70, styles.heightFull, styles.paddingVertical_20]}>
                                            <View style={[styles.overHidden, styles.heightFull, styles.bgFullWidth]}>

                                                <View
                                                    style={[styles.marginVertical_15, styles.Width_100, styles.height_50, styles.rowGroup, styles.paddingHorizontal_20]}>
                                                    <Text
                                                        style={[styles.textRegular, styles.text_midBrown, styles.textSize_18]}>
                                                        {i18n.translate('serad')}
                                                    </Text>
                                                    <TouchableOpacity style={[styles.overHidden]}
                                                                      onPress={this.toggleModal}>
                                                        <Icon style={[styles.text_midBrown, styles.textSize_16]}
                                                              type="AntDesign" name='close'/>
                                                    </TouchableOpacity>
                                                </View>

                                                <View style={[styles.centerColum, styles.Width_90, styles.bgFullWidth]}>

                                                    <View
                                                        style={[styles.viewPiker, styles.flexCenter, styles.marginVertical_15, styles.Width_100, styles.bg_White]}>


                                                        <Item style={styles.itemPiker} regular>
                                                            <Picker
                                                                mode="dropdown"
                                                                style={styles.Picker}
                                                                placeholderStyle={[styles.textRegular, {
                                                                    color: "#121212",
                                                                    writingDirection: 'rtl',
                                                                    width: '100%',
                                                                    fontSize: 14
                                                                }]}
                                                                selectedValue={this.state.country}
                                                                onValueChange={this.onValueCountry.bind(this)}
                                                                textStyle={[styles.textRegular, {
                                                                    color: "#121212",
                                                                    writingDirection: 'rtl',
                                                                    width: '100%',
                                                                }]}
                                                                placeholder={i18n.translate('city')}
                                                                itemTextStyle={[styles.textRegular, {
                                                                    color: "#121212",
                                                                    writingDirection: 'rtl',
                                                                    width: '100%',
                                                                }]}
                                                            >

                                                                <Picker.Item style={[styles.Width_100]}
                                                                             label={i18n.t('city')} value={null}/>
                                                                {
                                                                    this.props.citys ?
                                                                        this.props.citys.map((city, i) => (
                                                                            <Picker.Item style={styles.Width_100}
                                                                                         key={i} label={city.name}
                                                                                         value={city.id}/>
                                                                        ))
                                                                        :
                                                                        <View/>
                                                                }

                                                            </Picker>
                                                        </Item>
                                                        <Icon style={styles.iconPicker} type="AntDesign" name='down'/>
                                                    </View>

                                                    <TouchableOpacity
                                                        style={[styles.marginVertical_10, styles.Width_100, styles.height_50, styles.rowGroup, styles.paddingHorizontal_10, styles.bg_White]}
                                                        onPress={() => this.setState({checked: !this.state.checked})}>
                                                        <Text style={[styles.textRegular, styles.text_black,]}>
                                                            {i18n.translate('sallary')}
                                                        </Text>
                                                        <View style={[styles.paddingHorizontal_10]}>
                                                            <TouchableOpacity style={[styles.marginVertical_10]}>
                                                                <CheckBox
                                                                    style={[styles.checkBox, styles.Border, styles.bg_gray]}
                                                                    color={styles.text_gray}
                                                                    selectedColor={styles.text_White}
                                                                    onPress={() => this.setState({checked: !this.state.checked})}
                                                                    checked={this.state.checked}
                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </TouchableOpacity>

                                                    <View
                                                        style={[styles.marginVertical_10, styles.Width_100, styles.height_50, styles.rowGroup,]}>

                                                        <TouchableOpacity
                                                            style={[styles.marginVertical_10, styles.Width_100, styles.height_50, styles.rowGroup, styles.paddingHorizontal_10, styles.bg_White]}
                                                            onPress={() => this.selectRating(1)}>
                                                            <Text style={[styles.textRegular, styles.text_black,]}>
                                                                {i18n.translate('starrate')}
                                                            </Text>
                                                            <View style={[styles.paddingHorizontal_10]}>
                                                                <TouchableOpacity style={[styles.marginVertical_10]}>
                                                                    <CheckBox
                                                                        style={[styles.checkBox, styles.Border, styles.bg_gray]}
                                                                        color={styles.text_gray}
                                                                        selectedColor={styles.text_White}
                                                                        onPress={() => this.setState({rating: !this.state.rating})}
                                                                        checked={this.state.rating === 1}
                                                                    />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </TouchableOpacity>

                                                        <TouchableOpacity
                                                            style={[styles.marginVertical_10, styles.Width_100, styles.height_50, styles.rowGroup, styles.paddingHorizontal_10, styles.bg_White]}
                                                            onPress={() => this.selectRating(2)}>
                                                            <Text style={[styles.textRegular, styles.text_black,]}>
                                                                {i18n.translate('oldrate')}
                                                            </Text>
                                                            <View style={[styles.paddingHorizontal_10]}>
                                                                <TouchableOpacity style={[styles.marginVertical_10]}>
                                                                    <CheckBox
                                                                        style={[styles.checkBox, styles.Border, styles.bg_gray]}
                                                                        color={styles.text_gray}
                                                                        selectedColor={styles.text_White}
                                                                        onPress={() => this.setState({rating: !this.state.rating})}
                                                                        checked={this.state.rating === 2}
                                                                    />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </TouchableOpacity>

                                                    </View>

                                                    {/*<TouchableOpacity*/}
                                                    {/*    style       = {[styles.marginVertical_10, styles.Width_100, styles.height_50,styles.rowGroup,styles.paddingHorizontal_10, styles.bg_White]}*/}
                                                    {/*    onPress     = {() => this.setState({ toggle: !this.state.toggle })}>*/}
                                                    {/*    <Text style={[styles.textRegular , styles.text_black,]}>*/}
                                                    {/*        {i18n.translate('sallary')}*/}
                                                    {/*    </Text>*/}
                                                    {/*    <View style={[styles.paddingHorizontal_10]}>*/}
                                                    {/*        <TouchableOpacity style = {[]}>*/}
                                                    {/*            <Switch*/}
                                                    {/*                value                   = {this.state.toggle}*/}
                                                    {/*                onPress                 = {() => this.setState({ toggle: !this.state.toggle })}*/}
                                                    {/*            />*/}
                                                    {/*        </TouchableOpacity>*/}
                                                    {/*    </View>*/}
                                                    {/*</TouchableOpacity>*/}

                                                </View>

                                                <TouchableOpacity
                                                    style={[styles.overHidden, styles.bg_darkBrown, styles.width_120, styles.flexCenter, styles.Radius_5, styles.height_40, styles.marginVertical_25]}
                                                    onPress={() => this.onFilter()}>
                                                    <Text
                                                        style={[styles.textRegular, styles.textSize_18, styles.text_White, styles.textCenter]}>
                                                        {i18n.t('search')}
                                                    </Text>
                                                </TouchableOpacity>

                                            </View>
                                        </View>
                                    </Animatable.View>
                                </View>
                            </View>
                        </Modal>

                </Content>
                </ImageBackground>
            </Container>

        );
    }
}

const mapStateToProps = ({lang, categoryProvider, SearchProvider, cities,auth}) => {
    return {
        lang: lang.lang,
        providers: categoryProvider.categoryProviders,
        search: SearchProvider.searchProviders,
        citys: cities.cities,
        auth  : auth.user,


    };
};
export default connect(mapStateToProps, {
    categoryProviders,
    searchProviders,
    filterProviders,
    getCities
})(FilterCategory);
