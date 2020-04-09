import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    FlatList,
    I18nManager,
    Animated
} from "react-native";
import {Container, Content, Icon, Header, Left, Button, Body, Title } from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import {connect} from "react-redux";
import COLORS from '../../src/consts/colors'
import { getNotifications , deleteNotifications } from '../actions'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class BankAccounts extends Component {
    constructor(props){
        super(props);

        this.state={
            status              : null,
            starCount           : 3,
            activeType          : 0,
            isFav               : false,
            refreshed           : false,
            loader: true
        }
    }

    componentWillMount() {
        this.setState({loader: true});
        setTimeout(() => this.props.getNotifications( this.props.lang , this.props.user.token ), 2000)

    }

    componentWillReceiveProps(nextProps) {
        this.setState({loader: false});
    }

    deleteNotify(notify_id){
        this.props.deleteNotifications( this.props.lang , notify_id , this.props.user.token )
    }

    _keyExtractor = (item, index) => item.id;

    renderItems = (item , index) => {
        console.log(item);
        return(
            <TouchableOpacity
                style={[styles.position_R, styles.flexCenter, styles.Width_100, styles.marginVertical_5]}
            >
                <View style={[styles.rowGroup, item.index % 2 === 0 ? styles.bg_midBrown : styles.bg_lightBrown, styles.Border, styles.paddingVertical_25, styles.paddingHorizontal_7]}>

                    <View style={[styles.flex_40 , {marginRight:3}]}>
                        <Image style={{width:'100%' , height:70 }} source={require('../../assets/images/bank.png')} resizeMode={'contain'}/>
                    </View>
                    <View>
                        <View style={[styles.overHidden]}>
                            <Text style={[styles.text_White, styles.textSize_13, styles.textRegular,styles.textLeft, styles.paddingHorizontal_5]}>
                                {i18n.t('bankName')} : {item.item.title}
                            </Text>
                            <Text style={[styles.text_White, styles.textSize_13, styles.textRegular,styles.textLeft, styles.paddingHorizontal_5]}>
                                {i18n.t('bankNum')} : {item.item.time}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    renderNoData(){
        if (this.props.notifications && (this.props.notifications).length <= 0){
            return(
                <View style={[styles.directionColumnCenter , {height:'95%'}]}>
                    <Image source={require('../../assets/images/no-data.png')} resizeMode={'contain'} style={{ alignSelf: 'center', width: 200, height: 200 }} />
                </View>
            );
        }

        return <View />
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

    onFocus() {
        this.componentWillMount();
    }
    render() {

        this.loadingAnimated = [];

        return (
            <Container>
                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={[styles.text_midBrown, styles.textSize_22]} type="AntDesign" name='right' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_midBrown, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>{i18n.t('bankAcc')}</Title>
                    </Body>
                </Header>
                <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>
                    <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>
                        <View >
                            {
                                this.state.loader ?
                                    this._renderRows(this.loadingAnimated, 5, '5rows') :
                                    <View>
                                        { this.renderNoData() }
                                        {
                                            this.props.notifications?
                                                <FlatList
                                                    data={this.props.notifications}
                                                    renderItem={(item) => this.renderItems(item)}
                                                    numColumns={1}
                                                    keyExtractor={this._keyExtractor}
                                                />
                                                :<View/>
                                        }

                                    </View>
                            }
                        </View>
                    </Content>
                </ImageBackground>
            </Container>

        );
    }
}


const mapStateToProps = ({ lang , notifications , profile}) => {
    return {
        lang                    : lang.lang,
        user                    : profile.user,
        notifications           : notifications.notifications,
    };
};
export default connect(mapStateToProps, {getNotifications , deleteNotifications})(BankAccounts);
