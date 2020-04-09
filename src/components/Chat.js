import React, {Component} from 'react';import {View, Text, Image, TouchableOpacity, ImageBackground} from "react-native";import {Container, Content, Header, Button, Left, Icon, Body, Title} from 'native-base'import styles from "../../assets/style";import i18n from "../../locale/i18n";import {NavigationEvents} from "react-navigation";import {get_rooms} from '../actions'import {connect} from "react-redux";import axios from "axios";import CONST from "../consts";class Chat extends Component {	constructor(props){		super(props);		this.state = {            rooms : []        };	}	static navigationOptions = () => ({		header      : null,		drawerLabel : ( <Text style={[styles.textRegular, styles.text_midBrown, styles.textSize_18]}>{ i18n.t('chat') }</Text> ) ,		drawerIcon  : ( <Image style={[styles.smImage]} source={require('../../assets/images/chat_brown.png')} resizeMode={'cover'}/>)	});	onFocus(){		this.componentWillMount()	}   async componentWillMount(){        this.setState({loader: true});       axios({           url         :  CONST.url + 'rooms',           method      :  'POST',           data        :  { lang: this.props.lang },           headers     :  {Authorization: this.props.user.token}       }).then(response => {           this.setState({rooms : response.data.data , loader:  false})       })    }    componentWillReceiveProps(nextProps) {    }	render() {		return (			<Container>				<NavigationEvents onWillFocus={() => this.onFocus()}/>				<Header style={styles.headerView}>					<Left style={styles.leftIcon}>						<Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>							<Icon style={[styles.text_midBrown, styles.textSize_22]} type="AntDesign" name='right'/>						</Button>					</Left>					<Body style={styles.bodyText}>					<Title						style={[styles.textRegular, styles.text_midBrown, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>						{i18n.t('chat')}					</Title>					</Body>				</Header>				<ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>					<Content contentContainerStyle={styles.bgFullWidth} style={styles.bgFullWidth}>						<View>                            {                                this.state.rooms.map((item, i) => {                                     return (                                         <TouchableOpacity onPress={()=> {this.props.navigation.navigate('inbox',{                                             room : item.room,                                             status : item.status,                                             order_id : item.order_id,                                             token : this.props.user.token                                         })}} key={i} style={[ styles.rowGroup, styles.Width_100, styles.paddingHorizontal_10, styles.paddingVertical_10, { borderBottomWidth : 1, borderBottomColor : '#cacaca' } ]}>                                         <View style={[ styles.flex_20 ]}>                                             <Image source={{uri:item.img}} style={styles.chatAvatar} />                                         </View>                                         <View style={[ styles.overHidden, styles.flex_80 ]}>                                             <View style={[ styles.rowGroup, styles.Width_100 ]}>                                                 <Text style={[styles.textRegular , styles.textSize_16, styles.text_gray, styles.width_120]} numberOfLines = { 1 } prop with ellipsizeMode = "tail">{item.name}</Text>												 <Text style={[styles.textRegular , styles.textSize_14, styles.text_gray]}>{item.time}</Text>                                             </View>                                             <View>                                                 <Text style={[styles.textRegular, styles.chatMsg ,{alignSelf:'flex-start'}]}>{item.message}</Text>                                             </View>                                         </View>                                     </TouchableOpacity>)                                })                            }						</View>					</Content>				</ImageBackground>			</Container>		);	}}function mapStateToProps({ lang , profile })  {	return {        lang  	 : lang.lang,        user     : profile.user,    };}export default connect(mapStateToProps,{get_rooms})(Chat);