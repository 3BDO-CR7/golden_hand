import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground, Linking, Animated, Dimensions} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Body, Title, Right} from 'native-base'
import styles from '../../assets/style'
import {DoubleBounce} from 'react-native-loader';
import {connect} from "react-redux";
import {getCartList} from '../actions'
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';
import COLORS from '../../src/consts/colors';
import i18n from "../../locale/i18n";
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import ReactotronConfig from '../../ReactotronConfig'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


class Basket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            starCount: 3.5,
            loader: true,
        }
    }

    componentWillMount() {
        this.props.getCartList(this.props.lang, this.props.user.token)
    }

    static navigationOptions = () => ({
        header: null,
        drawerLabel: (<Text style={styles.textLabel}>{i18n.t('basket')}</Text>),
        drawerIcon: (<Icon style={styles.icon} type="SimpleLineIcons" name="home"/>)
    });

    componentWillReceiveProps(nextProps) {
        this.setState({loader: false});
    }

    renderNoData() {
        if (this.props.cartList && (this.props.cartList).length <= 0) {
            return (
                <View style={[styles.directionColumnCenter, {height: '95%'}]}>
                    <Image source={require('../../assets/images/no-data.png')} resizeMode={'contain'}
                           style={{alignSelf: 'center', width: 200, height: 200}}/>
                </View>
            );
        }

        return <View/>
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
                    style={{marginBottom: 7, alignSelf: 'center'}}
                    width={width - 20}
                    height={100}
                    colorShimmer={['#ffffff75', COLORS.lightBrown, '#ffffff75']}
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
                            {i18n.t('basket')}
                        </Title>
                    </Body>
                </Header>
                <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>
                <Content contentContainerStyle={styles.bgFullWidth} style={styles.bgFullWidth}>
                        {
                            this.state.loader ?
                                this._renderRows(this.loadingAnimated, 5, '5rows')
                                :
								<View>
									{this.renderNoData()}
									{
										this.props.cartList ?
											this.props.cartList.map((cart, i) => (
												<TouchableOpacity
													onPress={() => this.props.navigation.navigate('DetailsBasket', {provider_id: cart.id})}
													key={i}
													style={[styles.position_R, styles.flexCenter, styles.Width_90, {marginTop: 10}]}>
													<View style={[styles.lightOverlay, styles.Border]}></View>
													<View
														style={[styles.rowGroup, styles.bg_White, styles.Border, styles.paddingVertical_10, styles.paddingHorizontal_10]}>
														<View style={[styles.icImg, styles.flex_30]}>
															<Image style={[styles.icImg]}
																source={{uri: cart.avatar}}
																resizeMode={'cover'}
                                                            />
														</View>
														<View style={[styles.flex_70]}>
															<View style={[styles.rowGroup]}>
																<Text style={[styles.textRegular, styles.text_midBrown]}>{cart.name}</Text>
															</View>
															<View style={[styles.overHidden]}>
																<Text style={[styles.textRegular, styles.text_gray, styles.Width_100, styles.textLeft]}>{cart.category}</Text>
															</View>
															<View style={[styles.overHidden, styles.rowRight]}>
																<Icon style={[styles.text_gray, styles.textSize_14]}
																	type="Feather"
																	name='map-pin'
                                                                />
																<Text style={[styles.textRegular, styles.text_gray, styles.marginHorizontal_5, styles.width_200]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">{cart.address}</Text>
															</View>
														</View>
													</View>
												</TouchableOpacity>
											))
											:
											<View/>
									}
								</View>
                        }

                </Content>
                    </ImageBackground>
            </Container>

        );
    }
}

const mapStateToProps = ({lang, cartList, profile}) => {
    return {
        lang: lang.lang,
        cartList: cartList.cartList,
        user: profile.user
    };
};
export default connect(mapStateToProps, {getCartList})(Basket);
