import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground  , FlatList, Platform} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Body, Title} from 'native-base'
import styles from '../../assets/style'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';
import i18n from "../../locale/i18n";
import { getFavs } from '../actions'
import ProductBlock from './ProductBlock'

const isIOS = Platform.OS === 'ios';

class Favorite extends Component {
	constructor(props){
		super(props);

		this.state={
			count       : 0,
			refreshed	: false
		}
	}

	componentWillMount() {
		this.props.getFavs(this.props.lang, this.props.user.token)
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ refreshed: !this.state.refreshed })
	}

	_keyExtractor = (item, index) => item.id;

	static navigationOptions = () => ({
		header      : null,
		drawerLabel : ( <Text style={[styles.textRegular, styles.text_midBrown, styles.textSize_18]}>{ i18n.t('fav') }</Text> ) ,
		drawerIcon  : ( <Image style={[styles.smImage]} source={require('../../assets/images/fav.png')}/>)
	});

	renderLoader(){
		if (this.props.loader){
			return(
				<View style={[styles.loading, styles.flexCenter]}>
					<DoubleBounce size={20} />
				</View>
			);
		}
	}

	renderNoData() {
		if (this.props.products && (this.props.products).length <= 0) {
			return (
				<View style={[styles.directionColumnCenter, {height: '85%', width: '100%'}]}>
					<Image source={require('../../assets/images/no-data.png')} resizeMode={'contain'}
						   style={{alignSelf: 'center', width: 200, height: 200}}/>
				</View>
			);
		}

		return <View/>
	}

	renderItems = (item , key) => {
		return(
			<ProductBlock item={item} key={key} fromFav={true} navigation={this.props.navigation} />
		);
	};

	onFocus(){
		this.componentWillMount();
	}

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
						{ i18n.t('fav') }
					</Title>
					</Body>
				</Header>
				<ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>
				<Content  contentContainerStyle={styles.bgFullWidth} style={styles.bgFullWidth}>
					{ this.renderLoader() }

						<View style={[ styles.rowGroup , styles.marginVertical_15 , styles.paddingHorizontal_20]}>
							{/*{*/}
							{/*	this.props.products ?*/}
							{/*		<FlatList*/}
							{/*			data                    = {this.props.products}*/}
							{/*			renderItem              = {({item}) => this.renderItems(item)}*/}
							{/*			numColumns              = {2}*/}
							{/*			keyExtractor            = {this._keyExtractor}*/}
							{/*			extraData               = {this.state.refreshed}*/}
							{/*			onEndReachedThreshold   = {isIOS ? .01 : 1}*/}
							{/*		/>*/}
							{/*		:*/}
							{/*		<View>*/}
							{/*			{this.renderNoData()}*/}
							{/*		</View>*/}
							{/*}*/}


							{this.renderNoData()}

							<FlatList
								data                    = {this.props.products}
								renderItem              = {({item}) => this.renderItems(item)}
								numColumns              = {2}
								keyExtractor            = {this._keyExtractor}
								extraData               = {this.state.refreshed}
								onEndReachedThreshold   = {isIOS ? .01 : 1}
							/>

						</View>

				</Content>
				</ImageBackground>
			</Container>

		);
	}
}

const mapStateToProps = ({ lang, profile, favorite }) => {
	return {
		lang        : lang.lang,
		user        : profile.user,
		products    : favorite.products
	};
};
export default connect(mapStateToProps, { getFavs })(Favorite);
