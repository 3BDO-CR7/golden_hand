import React, { Component } from "react";
import {View, Text, Image, ImageBackground, TouchableOpacity} from "react-native";
import {Container, Content, Icon, Header, Left, Button, Body, Title} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import {connect} from "react-redux";
import {DoubleBounce} from "react-native-loader";
import { getAboutApp } from '../actions'
import * as Animatable from 'react-native-animatable';
import {NavigationEvents} from "react-navigation";

class Commission extends Component {
    constructor(props){
        super(props);

        this.state={
            status              : null,
        }
    }


    componentWillMount() {
        this.props.getAboutApp( this.props.lang )
    }

    renderLoader(){
        if (this.props.loader){
            return(
                <View style={[styles.loading, styles.flexCenter]}>
                    <DoubleBounce size={20} />
                </View>
            );
        }
    }

    onFocus(){
        this.componentWillMount();
    }

    static navigationOptions = () => ({
        header      : null,
        drawerLabel : ( <Text style={[styles.textRegular, styles.text_midBrown, styles.textSize_18]}>{ i18n.t('commission') }</Text> ) ,
        drawerIcon  : ( <Image style={[styles.smImage]} source={require('../../assets/images/coin.png')}/>)
    });

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
                            { i18n.t('commission') }
                        </Title>
                    </Body>
                </Header>
                <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>
                    <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>
                        <View style={[styles.position_R, styles.bgFullWidth, styles.Width_100, styles.marginVertical_15 , styles.paddingHorizontal_15]}>
                            {/*<View style={[styles.lightOverlay, styles.Border]}></View>*/}
                            {/*<View style={[styles.position_R, styles.Width_100, styles.overHidden, styles.bg_White, styles.Border,styles.bgFullWidth,]}>*/}
                                <Animatable.View animation="fadeInDown" easing="ease-out" delay={500} >
                                    <Text style={[styles.textRegular , styles.text_midBrown,  styles.Width_100, styles.textSize_16]}>
                                        { i18n.t('goldenAcc') }
                                    </Text>
                                </Animatable.View>
                                <View style={[styles.overHidden]}>
                                    <Animatable.View animation="fadeInRight" easing="ease-out" delay={500}>
                                        <Text style={[styles.textRegular , styles.text_bold_gray,  styles.Width_100, styles.marginVertical_15]}>
                                            { this.props.aboutApp }
                                        </Text>
                                        <TouchableOpacity
                                            style={[
                                                styles.bg_midBrown,
                                                styles.width_150,
                                                styles.flexCenter,
                                                styles.marginVertical_15,
                                                styles.height_40,
                                                {marginTop:100}
                                            ]}
                                            onPress={() => this.props.navigation.navigate('commissionPayment' , {routeName:'commission'})}>
                                            <Text style={[styles.textRegular , styles.textSize_14, styles.text_White , styles.SelfCenter]}>
                                                {i18n.translate('pay')}
                                            </Text>
                                        </TouchableOpacity>
                                    </Animatable.View>

                                </View>
                            {/*</View>*/}
                        </View>
                    </Content>
                </ImageBackground>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang, aboutApp }) => {
    return {
        lang        : lang.lang,
        aboutApp    : aboutApp.aboutApp,
        loader      : aboutApp.loader
    };
};
export default connect(mapStateToProps, { getAboutApp })(Commission);