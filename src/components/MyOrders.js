import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground, Animated, Dimensions} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Body, Title} from 'native-base'
import styles from '../../assets/style'
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import COLORS from '../../src/consts/colors'
import i18n from "../../locale/i18n";
import {getUserOrders} from '../actions'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'

const width 			= Dimensions.get('window').width;
const height 			= Dimensions.get('window').height;
let newOrderStatus 		= 1;


class MyOrders extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeType		: 0,
			loader			: true
		}

	}


	static navigationOptions = () => ({
		header: null,
		drawerLabel: (
			<Text style={[styles.textRegular, styles.text_midBrown, styles.textSize_18]}>{i18n.t('myorder')}</Text>),
		drawerIcon: (<Image style={[styles.smImage]} source={require('../../assets/images/orders.png')}/>)
	});

	renderNoData() {
		if (this.props.userOrders && (this.props.userOrders).length <= 0) {
			return (
				<View style={[styles.directionColumnCenter, {height: '85%'}]}>
					<Image source={require('../../assets/images/no-data.png')} resizeMode={'contain'}
						style={{alignSelf: 'center', width: 200, height: 200}}/>
				</View>
			);
		}

		return <View/>
	}

	componentWillMount() {
		this.getOrders(this.state.activeType)
	}

	componentWillReceiveProps(nextProps) {
		this.setState({loader: false,});
	}

	getOrders(type) {
 		this.setState({activeType: type, loader: true});
		const token = this.props.user.token;
		setTimeout(() => {
			this.props.getUserOrders(this.props.lang, type, token)
		}, 2000)
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
					style={{marginBottom: 7, alignSelf: 'center'}}
					width={width - 20}
					height={100}
					colorShimmer={['#ffffff75', COLORS.lightBrown, '#ffffff75']}
					duration = {600}
				/>
			)
		}

		return (
			<View style={{position: 'absolute', zIndex: 10, height: height - 175, bottom: 0, alignSelf: 'center'}}>
				<ImageBackground source={require('../../assets/images/bg_img.png')}
					style={[styles.bgFullWidth, {height: '100%', flex: 1}]}>
					{shimmerRows}
				</ImageBackground>
			</View>
		)
	}

	onFocus() {

		this.componentWillMount();
	}

	componentWillUnmount() {
		newOrderStatus  = this.props.user.type === 'delegate' ? 1 : 0;
		this.setState({
			activeType	:   this.props.user.type === 'delegate' ? 1 : 0
		}, () => {
		});
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
						{i18n.t('myorder')}
					</Title>
					</Body>
				</Header>
				<ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>
				<Content contentContainerStyle={styles.bgFullWidth} style={styles.bgFullWidth}>


						<View
							style={[styles.rowGroup, styles.paddingHorizontal_15, styles.marginVertical_15, styles.overlay_white, styles.Border]}>
							<TouchableOpacity onPress={() => this.getOrders(0)} style={[{
								borderTopWidth: 3,
								borderTopColor: this.state.activeType === 0 ? COLORS.midBrown : 'transparent'
							}, styles.paddingVertical_10]}>
								<Text
									style={[styles.textRegular, this.state.activeType === 0 ? styles.text_midBrown : styles.text_black, styles.textSize_16]}>
									{i18n.t('underProssess')}
								</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => this.getOrders(1)} style={[{
								borderTopWidth: 3,
								borderTopColor: this.state.activeType === 1 ? COLORS.midBrown : 'transparent'
							}, styles.paddingVertical_10]}>
								<Text
									style={[styles.textRegular, this.state.activeType === 1 ? styles.text_midBrown : styles.text_black, styles.textSize_16]}>
									{i18n.t('accepted')}
								</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => this.getOrders(2)} style={[{
								borderTopWidth: 3,
								borderTopColor: this.state.activeType === 2 ? COLORS.midBrown : 'transparent'
							}, styles.paddingVertical_10]}>
								<Text
									style={[styles.textRegular, this.state.activeType === 2 ? styles.text_midBrown : styles.text_black, styles.textSize_16]}>
									{i18n.t('done')}
								</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => this.getOrders(3)} style={[{
								borderTopWidth: 3,
								borderTopColor: this.state.activeType === 3 ? COLORS.midBrown : 'transparent'
							}, styles.paddingVertical_10]}>
								<Text
									style={[styles.textRegular, this.state.activeType === 3 ? styles.text_midBrown : styles.text_black, styles.textSize_16]}>
									{i18n.t('canceled')}
								</Text>
							</TouchableOpacity>
						</View>

						{
							this.state.loader ?

								this._renderRows(this.loadingAnimated, 5, '5rows')

								:

								<View>
									{this.renderNoData()}

									{
										this.props.userOrders.map((order, i) => {
											const myOrders = this.props.user.type === 'provider' ? order.order_user : order.order_provider
											return (
												<TouchableOpacity key={i}
													onPress={() => this.props.navigation.navigate(this.props.user.type === 'delegate' ? 'delegateOrderDetails' : 'orderDetails', { order_id: order.order_info.order_id })}
													style={[styles.position_R, styles.flexCenter, styles.Width_90, {marginTop: 20}]}>
													<View style={[styles.lightOverlay, styles.Border]} />
													<View
														style={[styles.rowGroup, styles.bg_White, styles.Border, styles.paddingVertical_10, styles.paddingHorizontal_10]}>
														<View style={[styles.icImg, styles.flex_30]}>
															<Image style={[styles.icImg]}
																source={{uri: myOrders.avatar}}/>
														</View>
														<View style={[styles.flex_70]}>
															<View style={[styles.rowGroup]}>
																<Text
																	style={[styles.textRegular, styles.text_black]}>{myOrders.name}</Text>
															</View>
															<View style={[styles.overHidden]}>
																<Text
																	style={[styles.textRegular, styles.text_gray, styles.Width_100, styles.textLeft]}>{order.order_info.category}</Text>
															</View>
															<View style={[styles.overHidden, styles.rowGroup]}>
																<Text
																	style={[styles.textRegular, styles.text_midBrown,{borderRightWidth: 2,
																		borderRightColor: COLORS.midBrown,
																		paddingRight: 5,}]}>{order.order_info.price} {i18n.t('RS')}</Text>
																<Text
																	style={[styles.textRegular, styles.text_gray,]}>{order.order_info.date}</Text>
															</View>
														</View>
														<TouchableOpacity
															style={[styles.width_40, styles.height_40, styles.flexCenter, styles.bg_lightBrown,  styles.marginVertical_5, styles.position_A, styles.top_5, styles.right_0]}>
															<Text
																style={[styles.textRegular, styles.text_midBrown]}>{order.order_info.order_items}</Text>
														</TouchableOpacity>
													</View>
												</TouchableOpacity>
											)
										})
									}

								</View>

						}

				</Content>
				</ImageBackground>
			</Container>

		);
	}
}

const mapStateToProps = ({lang, profile, userOrders}) => {
	return {
		lang: lang.lang,
		user: profile.user,
		userOrders: userOrders.userOrders,
	};
};
export default connect(mapStateToProps, {getUserOrders})(MyOrders);
