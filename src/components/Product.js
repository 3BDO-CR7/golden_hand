import React, {Component} from "react";
import {
	View,
	Text,
	Image,
	ImageBackground,
	Share,
	TouchableOpacity,
	FlatList,
	I18nManager,
	ScrollView,
	Animated
} from "react-native";
import {Container, Content, Icon, Header, Left, Button, Body, Title, Right, Textarea} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import {DoubleBounce} from "react-native-loader";
import * as Animatable from 'react-native-animatable';
import {connect} from "react-redux";
import COLORS from '../../src/consts/colors'
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import Modal from "react-native-modal";
import ImageViewer from 'react-native-image-zoom-viewer';

import {NavigationEvents} from "react-navigation";
import {productDetails, favorite, addCart, addComment, deletProduct} from '../actions';

class Product extends Component {
	constructor(props) {
		super(props);

		this.state = {
			desc: '',
			starCount: '',
			value: 1,
            isImageViewVisible: false,
            value2: 1,
			status: null,
            isFav:  this.props.user && this.props.user.type == 'user' && this.props.products && this.props.products.is_fav == 1 ? true : false,
			isHidden: true,
			fading: false,
			isModalVisible: false,
			bounceValue: new Animated.Value(400),  //This is the initial position of the subview
			isSubmitted: false,
		}
	}

	componentWillMount() {
		this.props.productDetails(this.props.lang, this.props.navigation.state.params.id, this.props.user ? this.props.user.token : null);
	}


	renderAddToCart(){
		if (this.state.isSubmitted){
			return(
				<View style={[{ justifyContent: 'center', alignItems: 'center' , width:'45%', paddingHorizontal: 15, paddingVertical: 7,}]}>
					<DoubleBounce size={20} color={COLORS.darkBrown} style={{ alignSelf: 'center' }} />
				</View>
			)
		}
		return (
			<TouchableOpacity style={[styles.cartBtn]}
				onPress={() => this.addToCart(this.props.products.id)}>
				<Text
					style={[styles.textRegular, styles.text_White, styles.textSize_14, styles.textLeft]}>{i18n.t('addToCart')}</Text>
			</TouchableOpacity>
		);
	}

	addToCart(id) {
		this.setState({ isSubmitted: true });
		const token = this.props.user ? this.props.user.token : null;
		this.props.addCart(this.props.lang, id, token, this.state.value , this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({isSubmitted: false});

	}

	toggleModal = () => {
		this.setState({isModalVisible: !this.state.isModalVisible});
	};

	deletProduct() {
		this.props.deletProduct(this.props.lang, this.props.navigation.state.params.id, (this.props.user) ? this.props.user.token : null, this.props);
	}

	_toggleSubview() {
		var toValue = 400;

		if (this.state.isHidden) {
			toValue = 0;
		}

		Animated.spring(
			this.state.bounceValue,
			{
				toValue: toValue,
				velocity: 3,
				tension: 2,
				friction: 8,
			}
		).start();

		// isHidden = !isHidden;

		this.setState({isHidden: !this.state.isHidden});

	}

	onShare = async () => {
		try {
			const result = await Share.share({
				message:
					'Chifz App',
			});

			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			alert(error.message);
		}
	};

	increment() {
		this.setState({value: this.state.value + 1})
	}

	decrement() {
		if (this.state.value > 1)
			this.setState({value: this.state.value - 1})
	}

	increment2() {
		if (this.state.value2 < 5)
			this.setState({value2: this.state.value2 + 1})
	}

	decrement2() {
		if (this.state.value2 > 1)
			this.setState({value2: this.state.value2 - 1})
	}

	toggleFavorite(id) {
		this.setState({isFav: !this.state.isFav});
		const token = this.props.user ? this.props.user.token : null;
		this.props.favorite(this.props.lang, id, token);
	}

	editProdect() {
		this.props.navigation.navigate('updateProduct', {data: this.props.products , product_id: this.props.navigation.state.params.id});
	}

	addComment(id) {

		// if (this.state.desc === '') {
		//
		// 	this.setState({fading: true});
		//
		// } else {

			const token = this.props.user ? this.props.user.token : null;
			this.props.addComment(this.props.lang, id, token, this.state.desc, this.state.value2);
			this.setState({
				isModalVisible: !this.state.isModalVisible,
				desc: '',
				value2: 1,
			});

			this.props.productDetails(this.props.lang, this.props.navigation.state.params.id);

		// }

	}


	_keyExtractor = (item, index) => item.id;

	renderItems = (item) => {
		return (
			<View style={[styles.notiBlock, styles.paddingHorizontal_10]}>
				<Image source={{uri: item.avatar}} style={styles.restImg}/>
				<View style={[styles.directionColumn, {flex: 1}]}>
					<View style={[styles.directionRowSpace]}>
						<Text
							style={[styles.textRegular, styles.text_bold_gray, styles.textSize_14, styles.textLeft, {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>
							{item.user}
						</Text>
					</View>
					<View style={[styles.directionRowSpace]}>
						<StarRating
							disabled={true}
							maxStars={5}
							rating={item.rate}
							fullStarColor={COLORS.light_red}
							starSize={15}
							starStyle={styles.starStyle}
						/>
						<Text
							style={[styles.textRegular, styles.text_bold_gray, styles.textSize_14, styles.textLeft, {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>
							{item.time}
						</Text>
					</View>
				</View>
			</View>
		);
	};

	onFocus() {
		this.componentWillMount();
	}

	render() {

		return (
			<Container>

				<NavigationEvents onWillFocus={() => this.onFocus()}/>

				<Header style={styles.headerView}>
					<Left style={styles.leftIcon}>
						<Button style={styles.Button} transparent
							onPress={() => this.props.navigation.goBack()}>
							<Icon style={[styles.text_midBrown, styles.textSize_22]} type="AntDesign" name='right'/>
						</Button>
					</Left>
					<Body style={styles.bodyText}>
					{
						this.props.products ?
							<Title style={[styles.textRegular, styles.text_midBrown, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>
								{this.props.products.name}
							</Title>:
							<View/>
					}
					</Body>
					<Right style={styles.rightIcon}>
						<Button style={[styles.bg_lightBrown, styles.Radius_0, styles.iconHeader, styles.flexCenter]}
							transparent onPress={() => this.onShare()}>
							<Image style={[styles.ionImage]} source={require('../../assets/images/share.png')}/>
						</Button>
					</Right>
				</Header>
				<ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>
				<Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>
						{
							this.props.products ?
								<View>
									<View style={styles.viewBlock}>
										<Swiper
											containerStyle={[styles.Width_95, styles.marginVertical_15, styles.swiper, styles.viewBlock]}
											autoplay={true}
											paginationStyle={{
												alignSelf: "flex-end",
												paddingHorizontal: 30,
												position: 'absolute',
												transform: [{rotate: '90deg'}],
												right: -330,
												zIndex: 999
											}}
											dotStyle={{backgroundColor: '#fff'}}
											activeDotStyle={{backgroundColor: '#F00', width: 20,}}
											animated={true}
											loop={true}
											autoplayTimeout={2}
										>

											{
												this.props.images ?
													this.props.images.map((img) => (

														<View style={[styles.viewBlock]}>
                                                            <TouchableOpacity  onPress={() => { this.setState({ isImageViewVisible: true })}}>
															<Image style={[styles.Width_95, styles.swiper]}
																source={{uri: img.image}} resizeMode={'cover'}/>
                                                            </TouchableOpacity>

															{
                                                                this.props.user && (this.props.user == null || this.props.user.type === 'user') ?
																	<Animatable.View animation="fadeInRight"
																		easing="ease-out" delay={500}
																		style={[styles.blockContent, { backgroundColor : "#ffffff6b"}]}>
																		<View
																			style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>
																			<TouchableOpacity
																				onPress={() => this.toggleFavorite(this.props.products.id)}>
																				{
																					this.state.isFav ?
																						<Icon
																							style={[styles.text_red, styles.textSize_20]}
																							type="AntDesign"
																							name='heart'/>
																						:
																						<Icon
																							style={[styles.text_red, styles.textSize_20]}
																							type="AntDesign"
																							name='hearto'/>
																				}
																			</TouchableOpacity>
																		</View>
																	</Animatable.View>
																	:
																	<View/>
															}



															{
																this.props.user && (this.props.user == null || this.props.user.type === 'provider')?
																	<Animatable.View animation="fadeInRight"
																		easing="ease-out" delay={500}
																		style={[styles.blockContent, { backgroundColor : "#ffffff6b"}, styles.top_5, styles.marginVertical_10]}>
																		<View
																			style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>
																			<TouchableOpacity
																				onPress={() => this.editProdect()}>
																				<Icon
																					style={[styles.text_midBrown, styles.textSize_20]}
																					type="AntDesign" name='edit'/>
																			</TouchableOpacity>
																		</View>
																	</Animatable.View>
																	:
																	<View/>
															}

															{
                                                                this.props.user && (this.props.user == null || this.props.user.type === 'provider') ?
																	<Animatable.View animation="fadeInRight"
																		easing="ease-out" delay={500}
																		style={[styles.blockContent, { backgroundColor : "#ffffff6b"}, styles.top_35, styles.marginVertical_25]}>
																		<View
																			style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>
																			<TouchableOpacity
																				onPress={() => this.deletProduct()}>
																				<Icon
																					style={[styles.text_midBrown, styles.textSize_20]}
																					type="AntDesign" name='close'/>
																			</TouchableOpacity>
																		</View>
																	</Animatable.View>
																	:
																	<View/>
															}
														</View>

													)) :
													<View/>
											}

										</Swiper>
									</View>

									<View
										style={[styles.Width_90, styles.marginVertical_15, styles.marginHorizontal_10, styles.SelfCenter]}>
										<View style={[styles.lightOverlay, styles.Border]}/>
										<View
											style={[styles.Width_100, styles.overHidden, styles.bg_White, styles.Border, styles.bgFullWidth, styles.paddingHorizontal_7, styles.paddingVertical_7]}>
											<View style={[styles.overHidden]}>
												<View style={[styles.rowGroup]}>
													<Text
														style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft,styles.width_150]}
														numberOfLines={1} prop with ellipsizeMode="tail">
														{this.props.products.name}
													</Text>
													<View style={{width: 70}}>
														<StarRating
															disabled={true}
															maxStars={5}
															rating={this.props.products.rates}
															fullStarColor={COLORS.light_red}
															starSize={15}
															starStyle={styles.starStyle}
														/>
													</View>
												</View>
												<Text
													style={[styles.textRegular, styles.text_bold_gray, styles.Width_100, styles.textSize_12, styles.textLeft, styles.width_150]}
													numberOfLines={1} prop with ellipsizeMode="tail">
													{this.props.products.category} - {this.props.products.sub_category}
												</Text>
												<View style={[styles.directionRow]}>
													<View style={[styles.Width_93]}>
														<Text
															style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.writing , styles.width_150, {alignSelf:'flex-start'}]}
															numberOfLines={1} prop with ellipsizeMode="tail">
															{i18n.t('productSpec')}
														</Text>
														<Text
															style={[styles.textRegular, styles.text_bold_gray, styles.textSize_12 , styles.writing , styles.width_150, {alignSelf:'flex-start'}]}>
															{this.props.products.description}
														</Text>
													</View>

													{
                                                        this.props.user && (this.props.user == null || this.props.user.type === 'user') ?
															<View style={styles.counterParent}>
																<TouchableOpacity onPress={() => this.increment()}
																	style={styles.touchPlus}>
																	<Icon type={'Entypo'} name={'plus'}
																		style={styles.plus}/>
																</TouchableOpacity>
																<View
																	style={[styles.directionColumn, styles.countText]}>
																	<Text
																		style={[styles.text_midBrown, styles.textRegular, styles.textSize_14]}>
																		{this.state.value}
																	</Text>
																</View>
																<TouchableOpacity onPress={() => this.decrement()}
																	style={styles.touchMinus}>
																	<Icon type={'Entypo'} name={'minus'}
																		style={styles.minus}/>
																</TouchableOpacity>
															</View>
															:
															<View/>
													}

												</View>
												<View style={[styles.rowGroup, styles.marginVertical_15]}>
													<View style={[styles.rowGroup]}>
														<Text
															style={[styles.textRegular, styles.text_bold_gray, styles.textSize_14, styles.textLeft]}>
															{i18n.t('productPrice')}
														</Text>
														<Text style={[styles.textRegular, styles.text_midBrown, styles.textSize_14, styles.textLeft, {
																borderRightWidth: 2,
																borderRightColor: COLORS.midBrown,
																paddingRight: 5,
																marginLeft: 5
															}]}>
															{this.props.products.discount_price * this.state.value } {i18n.t('RS')}</Text>

														<Text style={[styles.textRegular, styles.text_midBrown, styles.textSize_14, styles.textLeft, {
															borderRightWidth: 2,
															borderRightColor: COLORS.midBrown,
															paddingRight: 5,
															marginLeft: 5,
															textDecorationLine: 'line-through'
														}]}>
															{this.props.products.price * this.state.value } {i18n.t('RS')}</Text>
													</View>
												</View>
												{
													this.props.user == null || this.props.user.type === 'user' ?
														<View style={{ alignSelf: 'center' }}>
															{
																(this.props.user)?
																this.renderAddToCart()
																	:null

															}
														</View> : <View/>
												}
												<TouchableOpacity onPress={() => this._toggleSubview()} style={[styles.SelfCenter, styles.marginVertical_10]} >
													<Text style={[styles.textRegular , styles.text_midBrown, styles.textSize_16, styles.paddingHorizontal_15, styles.textDecoration]}>
														{i18n.translate('seeRates')}
													</Text>
												</TouchableOpacity>
											</View>
										</View>
									</View>
								</View>
								:
								<View/>
						}

				</Content>
				</ImageBackground>

				<Animated.View style={[styles.subView, styles.Width_90, {transform: [{translateY: this.state.bounceValue}]}, { alignSelf : 'center', }]}>
					<View style={[styles.lightOverlay, styles.Border]}/>

					<TouchableOpacity onPress={() => { this._toggleSubview() }} style={[styles.bg_White, styles.Border, styles.Width_100]}>
						<View style={[styles.rowGroup,]}>

							<TouchableOpacity onPress={() => { this._toggleSubview() }} style={[ styles.Width_100, styles.height_40, { flexDirection: 'row', justifyContent: 'space-between' }]}>
								{
									this.props.products ?
										<Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft, styles.marginVertical_10, styles.paddingHorizontal_10]}>
											{i18n.t('rates')} <Text style={[styles.textRegular, styles.text_bold_gray, styles.textSize_14]}>
												( {this.props.products.comments_count} )
											</Text>
										</Text> : <View />
								}

								<View style={[styles.height_40, styles.width_40, styles.Radius_30, styles.bg_midBrown, { top: -10, zIndex: 99, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', position: 'absolute', right: '44%' }]}>
									<Icon type={'AntDesign'} name={this.state.isHidden ? 'up' : 'down'} style={[styles.text_White, styles.textSize_16 ]}/>
								</View>

								{
									this.props.user &&  this.props.user.type == 'user' ?
										<TouchableOpacity onPress={() => this.toggleModal()} style={[styles.rowGroup]}>
											<Text style={[styles.textRegular, styles.text_midBrown, styles.textSize_14, {marginRight: 5}]}>
												{i18n.t('addRate')}
											</Text>
											<View style={[styles.touchPlus]}>
												<Icon type={'Entypo'} name={'plus'}
													style={[styles.plus, styles.textSize_16]}/>
											</View>
										</TouchableOpacity>
										:
										<TouchableOpacity style={[styles.rowGroup]} />
								}
							</TouchableOpacity>

						</View>

						{
							this.props.comments.length !== 0 ?
								<ScrollView showsHorizontalScrollIndicator={false}>
									<TouchableOpacity onPress={() => { this._toggleSubview() }}>
										{
											this.props.comments ?
												<FlatList
													data={this.props.comments}
													renderItem={({item}) => this.renderItems(item)}
													numColumns={1}
													keyExtractor={this._keyExtractor}
												/>
												:<View/>
										}

									</TouchableOpacity>
								</ScrollView>
								:
								<View />

						}
					</TouchableOpacity>

				</Animated.View>

				<Modal style={{}} isVisible={this.state.isModalVisible} onBackdropPress={() => this.toggleModal()}>
					<View style={[styles.commentModal, {padding: 15}]}>
						<Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textCenter , {marginBottom:10}]}>
							{i18n.t('productRate')}
						</Text>
						<View style={[styles.directionRow]}>

							<View style={[styles.counterParent , {flexDirection:'row'}]}>
								<TouchableOpacity onPress={() => this.increment2()} style={[styles.touchPlus,{height:30, width:30}]}>
									<Icon type={'Entypo'} name={'plus'} style={styles.plus}/>
								</TouchableOpacity>
								<View style={[styles.directionRowCenter, styles.countText2]}>
									<Text
										style={[styles.darkBrown, styles.textRegular, styles.textSize_14]}>{this.state.value2}</Text>
									<Icon style={[styles.text_midBrown, styles.textSize_14]} type="AntDesign"
										name='star'/>
								</View>
								<TouchableOpacity onPress={() => this.decrement2()} style={[styles.touchMinus,{height:30, width:30}]}>
									<Icon type={'Entypo'} name={'minus'} style={styles.minus}/>
								</TouchableOpacity>
							</View>
						</View>
						<TouchableOpacity onPress={() => this.addComment(this.props.products.id)}
							style={[styles.cartBtn, styles.SelfCenter, {marginTop: 20}]}>
							<Text
								style={[styles.textRegular, styles.text_White, styles.textSize_14, styles.textLeft]}>{i18n.t('rate')}</Text>
						</TouchableOpacity>
					</View>
				</Modal>

                <Modal onBackdropPress={() => this.setState({ isImageViewVisible: false })} avoidKeyboard={ false} visible={this.state.isImageViewVisible} transparent={true} enableImageZoom={true}  enableSwipeDown={true} >
                    <ImageViewer style={{backgroundColor:'transparent'}}  imageUrls={this.props.images}/>
                    <TouchableOpacity  style={{ position:'absolute' , top : 30 , right : 20}} onPress={() => this.setState({isImageViewVisible: false})}>
                        <Icon name="close" style={{fontSize:30,color : 'white'   }}/>
                    </TouchableOpacity>
                </Modal>
			</Container>

		);
	}
}

const mapStateToProps = ({lang, productsDetail, addComment, profile}) => {
	return {
		lang: lang.lang,
		products: productsDetail.products,
		images: productsDetail.images,
		comments: productsDetail.comments,
		addComments: addComment.comment,
		user: profile.user
	};
};
export default connect(mapStateToProps, {productDetails, favorite, addCart, addComment, deletProduct})(Product);

