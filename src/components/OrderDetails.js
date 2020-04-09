import React, {Component} from "react";
import {
	View,
	Text,
	Image,
	ImageBackground,
	Dimensions,
	TouchableOpacity,
	I18nManager,
	Animated
} from "react-native";
import {Container, Content, Icon, Header, Left, Button, Body, Title, Textarea} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import {DoubleBounce} from "react-native-loader";
import {connect} from "react-redux";
import COLORS from '../../src/consts/colors'
import Swiper from 'react-native-swiper';
import Modal from "react-native-modal";
import {NavigationEvents} from "react-navigation";
import {getOrderDetails , getCancelOrder , getDeleteOrder , getAcceptOrder , getFinishOrder } from '../actions'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class OrderDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: null,
			isModalVisible: false,
			loader: true,
			reason: '',
			isSubmitted: false,
		}
	}

	toggleModal = () => {
		this.setState({isModalVisible: !this.state.isModalVisible});
	};

	cancelOrder(){
		this.setState({isModalVisible: !this.state.isModalVisible});
		this.props.getCancelOrder(this.props.lang, this.props.navigation.state.params.order_id , this.state.reason , this.props.user.token , this.props )
	}

	renderAcceptOrder(){
		if (this.state.isSubmitted){
			return(
				<View style={[{ justifyContent: 'center', alignItems: 'center' , marginBottom:20 , alignSelf:'center' }]}>
					<DoubleBounce size={20} color={COLORS.darkBrown} style={{ alignSelf: 'center' }} />
				</View>
			)
		}

		return (
			<View style={[styles.Width_100 , styles.directionRowSpace , styles.paddingHorizontal_10, styles.marginVertical_15]}>
				<TouchableOpacity
					onPress={() => this.acceptOrder()}
					style={[styles.cartBtn, styles.SelfCenter, {marginBottom: 20}]}>
					<Text
						style={[styles.textRegular, styles.text_White, styles.textSize_14, styles.textLeft]}>{i18n.t('ok')}</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => this.cancelProviderOrder()}
					style={[styles.cartBtn, styles.SelfCenter, {
						marginBottom: 20,
						backgroundColor: '#8f8f8f96',
					}]}>
					<Text
						style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft]}>{i18n.t('refuse')}</Text>
				</TouchableOpacity>
			</View>
		);
	}

	acceptOrder(){
		this.setState({ isSubmitted: true });
		this.props.getAcceptOrder(this.props.lang, this.props.navigation.state.params.order_id , this.props.user.token ,null,'لقد تم قبول طلبك بنجاح ^ ^'  , this.props )
	}


	cancelProviderOrder(){
		this.setState({ isSubmitted: true });
		this.props.getCancelOrder(this.props.lang, this.props.navigation.state.params.order_id , null , this.props.user.token , this.props )
	}


	renderDeleteOrder(){
		if (this.state.isSubmitted){
			return(
				<View style={[{ justifyContent: 'center', alignItems: 'center' , marginBottom:20 }]}>
					<DoubleBounce size={20} color={COLORS.darkBrown} style={{ alignSelf: 'center' }} />
				</View>
			)
		}

		return (
			<TouchableOpacity
				onPress={() => this.deleteOrder()}
				style={[styles.cartBtn, styles.SelfCenter, {marginBottom: 20}]}>
				<Text
					style={[styles.textRegular, styles.text_White, styles.textSize_14, styles.textLeft]}>{i18n.t('deleteOrder')}</Text>
			</TouchableOpacity>
		);
	}

	deleteOrder(){
		this.setState({ isSubmitted: true });
		this.props.getDeleteOrder(this.props.lang, this.props.navigation.state.params.order_id , this.props.user.token  , this.props )
	}

	renderFinishOrder(){
		if (this.state.isSubmitted){
			return(
				<View style={[{ justifyContent: 'center', alignItems: 'center' , marginBottom:20 }]}>
					<DoubleBounce size={20} color={COLORS.darkBrown} style={{ alignSelf: 'center' }} />
				</View>
			)
		}

		return (
			<TouchableOpacity
				onPress={() => this.finishOrder()}
				style={[styles.cartBtn, styles.SelfCenter, {marginBottom: 20}]}>
				<Text
					style={[styles.textRegular, styles.text_White, styles.textSize_14, styles.textLeft]}>{i18n.t('finishOrder')}</Text>
			</TouchableOpacity>
		);
	}

	finishOrder(){
		this.setState({ isSubmitted: true });
		this.props.getFinishOrder(this.props.lang, this.props.navigation.state.params.order_id , this.props.user.token  , this.props )
	}

	componentWillReceiveProps(nextProps) {
		this.setState({loader: false , isSubmitted: false});

	}

	componentWillMount(){
		this.setState({loader: true});
		setTimeout(() => this.props.getOrderDetails(this.props.lang, this.props.navigation.state.params.order_id), 2000)
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
					style={{marginVertical:7, alignSelf: 'center'}}
					width={width - 20}
					height={100}
					colorShimmer={['#ffffff75', COLORS.lightBrown, '#ffffff75']}
				/>
			)
		}

		return (
			<View >
				{shimmerRows}
			</View>
		)
	}


	renderBtns(){
		if(this.props.user.type === 'provider' ){
			return(

				this.props.orderDetails.order_status === 0  ?
					this.renderAcceptOrder()
					:

					this.props.orderDetails.order_status === 1  ?

						this.renderFinishOrder()

						:
						<View/>
			)
		}

		return(
			this.props.orderDetails.order_status === 0 ?
				<TouchableOpacity onPress={() => this.toggleModal()}
					style={[styles.cartBtn, styles.SelfCenter, {marginBottom: 20}]}>
					<Text
						style={[styles.textRegular, styles.text_White, styles.textSize_14, styles.textLeft]}>{i18n.t('cancelOrder')}</Text>
				</TouchableOpacity>
				:
				<View/>
		)
	}

	onFocus() {
		this.componentWillMount();
	}

	render() {
		this.loadingAnimated = [];

		return (
			<Container>
				<Header style={styles.headerView}>
					<Left style={styles.leftIcon}>
						<Button style={styles.Button} transparent
							onPress={() => this.props.navigation.navigate('MyOrders')}>
							<Icon style={[styles.text_midBrown, styles.textSize_22]} type="AntDesign" name='right'/>
						</Button>
					</Left>
					<Body style={styles.bodyText}>
					<Title
						style={[styles.textRegular, styles.text_midBrown, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>{i18n.t('orderDet')}</Title>
					</Body>
				</Header>
				<ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>
				<Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>
						<NavigationEvents onWillFocus={() => this.onFocus()}/>
						{
							this.state.loader ?
								this._renderRows(this.loadingAnimated, 5, '5rows') :
								this.props.orderDetails ?
									<View>
										<View style={styles.viewBlock}>
											<Swiper
												containerStyle={[styles.Width_100, styles.marginVertical_15, {height: 400}, styles.viewBlock]}
												autoplay={true}
												paginationStyle={{
													top: -150,
													paddingHorizontal: 30,
													position: 'absolute',
													transform: [{rotate: '90deg'}],
													right: -340,
													zIndex: 999
												}}
												dotStyle={{backgroundColor: COLORS.opcity_gray}}
												activeDotStyle={{backgroundColor: '#F00', width: 20,}}
												animated={true}
												loop={true}
												autoplayTimeout={2}
											>
												{
													this.props.orderDetails.products.map((product, i) => {
														return (
															<View key={i} style={[styles.viewBlock]}>
																<Image style={[styles.Width_95, styles.swiper]}
																	source={{uri: product.product_info.image}}
																	resizeMode={'cover'}/>
																<View
																	style={[styles.Width_95, styles.marginVertical_15, styles.marginHorizontal_10, styles.SelfCenter]}>
																	<View style={[styles.lightOverlay, styles.Border]} />
																	<View
																		style={[styles.Width_100, styles.overHidden, styles.bg_White, styles.Border, styles.bgFullWidth, styles.paddingHorizontal_7, styles.paddingVertical_7]}>
																		<View style={[styles.overHidden]}>
																			<View style={[styles.rowGroup]}>
																				<Text
																					style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft]}
																					numberOfLines={1} prop with
																					ellipsizeMode="head">{product.product_info.product_name}</Text>

																				<View style={[styles.rowGroup]}>
																					<Text
																						style={[styles.textRegular, styles.text_bold_gray, styles.textSize_14, styles.textLeft]}>{i18n.t('productPrice')}</Text>
																					<Text
																						style={[styles.textRegular, styles.text_midBrown, styles.textSize_14, styles.textLeft, {
																							borderRightWidth: 2,
																							borderRightColor: COLORS.midBrown,
																							paddingRight: 5,
																							marginLeft: 5
																						}]}>{product.product_info.total_price} {i18n.t('RS')}</Text>
																				</View>
																			</View>
																			<Text
																				style={[styles.textRegular, styles.text_bold_gray, styles.Width_100, styles.textSize_12, styles.textLeft]}
																				numberOfLines={1} prop with
																				ellipsizeMode="head">{product.product_info.product_category} - {product.product_info.product_sub_category}</Text>
																			<Text
																				style={[styles.textRegular, styles.text_bold_gray, styles.Width_100, styles.textSize_12, styles.textLeft]}
																				numberOfLines={1} prop with
																				ellipsizeMode="head">{i18n.t('productNum')} : {product.product_info.product_count}</Text>
																		</View>
																		<View style={[styles.Width_100]}>
																			<Text
																				style={[styles.textRegular, styles.text_black, styles.textSize_14]}
																				numberOfLines={1} prop with
																				ellipsizeMode="head">{i18n.t('productSpec')}</Text>
																			<Text
																				style={[styles.textRegular, styles.text_bold_gray, styles.textSize_12, styles.writing, {alignSelf: 'flex-start'}]}>{product.product_info.product_description}</Text>
																		</View>
																	</View>
																</View>
															</View>
														)
													})
												}
											</Swiper>
										</View>

										<View style={[styles.Width_95, { marginTop: 5, marginBottom: 15 }, styles.marginHorizontal_10, styles.SelfCenter]}>
											<View style={[styles.lightOverlay, styles.Border]} />
											<View style={[styles.Width_100, styles.overHidden, styles.bg_White, styles.Border, styles.bgFullWidth, styles.paddingHorizontal_7, styles.paddingVertical_7]}>
												<View
													style={[styles.directionRowSpace, styles.Border, styles.paddingHorizontal_10, styles.paddingVertical_10, {marginTop: 15}]}>
													<Text
														style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft]}>{i18n.t('productNum')}</Text>
													<Text
														style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft]}>{this.props.orderDetails.total_quantity}</Text>
												</View>
												<View
													style={[styles.directionRowSpace, styles.Border, styles.paddingHorizontal_10, styles.paddingVertical_10, {marginTop: 10}]}>
													<Text
														style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft]}>{i18n.t('deliveredPrice')}</Text>
													<Text
														style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft]}>{this.props.orderDetails.shipping_price} {i18n.t('RS')}</Text>
												</View>
												<View
													style={[styles.directionRowSpace, styles.Border, styles.paddingHorizontal_10, styles.paddingVertical_10, {
														marginTop: 10,
														backgroundColor: COLORS.midBrown
													}]}>
													<Text
														style={[styles.textRegular, styles.text_White, styles.textSize_14, styles.textLeft]}>{i18n.t('total')}</Text>
													<Text
														style={[styles.textRegular, styles.text_White, styles.textSize_14, styles.textLeft]}>{this.props.orderDetails.total_price} {i18n.t('RS')}</Text>
												</View>
											</View>
										</View>
										<View
											style={[styles.position_R, styles.Width_95, styles.marginVertical_15, styles.marginHorizontal_10, styles.SelfCenter]}>
											<View style={[styles.lightOverlay, styles.Border]}></View>
											<View
												style={[styles.position_R, styles.Width_100, styles.overHidden, styles.bg_White, styles.bgFullWidth, styles.paddingHorizontal_7, styles.paddingVertical_7
													, {
														borderWidth: 1,
														borderTopColor: COLORS.lightWhite,
														borderBottomColor: COLORS.lightWhite,
														borderRightColor: COLORS.lightWhite,
														borderLeftWidth: 5,
														borderLeftColor: COLORS.midBrown
													}]}>
												<View style={[styles.directionColumn, {flex: 1}]}>
													<Text
														style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft, {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{i18n.t('orderStatus')}</Text>
													<Text
														style={[styles.textRegular, styles.text_midBrown, styles.textSize_14, styles.textLeft, {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{this.props.orderDetails.status_text}</Text>
												</View>
											</View>
										</View>


										{
											this.renderBtns()
										}


										{
											this.props.orderDetails.order_status === 2 || this.props.orderDetails.order_status === 3 ?
												<View>

													{
														this.renderDeleteOrder()
													}
												</View>
												:
												<View/>
										}
									</View> :
									<View/>
						}

				</Content>
				</ImageBackground>
				<Modal style={{}} isVisible={this.state.isModalVisible} onBackdropPress={() => this.toggleModal()}>
					<View style={[styles.commentModal, {padding: 15, height: 250}]}>
						<Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft]}>
							{i18n.t('cancelOrder')}
						</Text>
						<View style={[styles.directionRow]}>
							<View style={[styles.Width_100, {marginTop: 20}]}>
								<View style={[styles.lightOverlay, styles.Border]}/>
								<Textarea placeholder={i18n.t('cancelOrderReason')}
									placeholderTextColor={COLORS.bold_gray} autoCapitalize='none'
									value={this.state.reason} onChangeText={(reason) => this.setState({reason})}
									style={[styles.textarea, styles.textRegular, styles.Width_100, styles.overHidden, styles.bg_White, styles.Border, styles.paddingHorizontal_7, styles.paddingVertical_7]}/>
							</View>
						</View>
						<TouchableOpacity onPress={() => this.cancelOrder()}
							style={[styles.cartBtn, styles.SelfCenter, {marginTop: 20}]}>
							<Text
								style={[styles.textRegular, styles.text_White, styles.textSize_14, styles.textLeft]}>{i18n.t('cancelOrder')}</Text>
						</TouchableOpacity>
					</View>
				</Modal>
			</Container>

		);
	}
}


const mapStateToProps = ({lang , orderDetails , profile}) => {
	return {
		lang: lang.lang,
		orderDetails: orderDetails.orderDetails,
		user: profile.user,
	};
};
export default connect(mapStateToProps, {getOrderDetails , getCancelOrder , getDeleteOrder , getAcceptOrder , getFinishOrder})(OrderDetails);
