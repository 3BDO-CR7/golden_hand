import React, { Component } from "react";
import {View, Text, Image, ImageBackground} from "react-native";
import {Container, Content, Icon, Header, Left, Button, Body, Title} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import {connect} from "react-redux";
import {DoubleBounce} from "react-native-loader";
import { getFaq } from '../actions'
import * as Animatable from 'react-native-animatable';
import {NavigationEvents} from "react-navigation";

class Faq extends Component {
    constructor(props){
        super(props);

        this.state={
            status              : null,
        }
    }

    componentWillMount() {
        this.props.getFaq( this.props.lang )
    }

    onFocus(){
        this.componentWillMount();
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

    static navigationOptions = () => ({
        header      : null,
        drawerLabel : ( <Text style={[styles.textRegular, styles.text_midBrown, styles.textSize_18]}>{ i18n.t('FAQs') }</Text> ) ,
        drawerIcon  : ( <Image style={[styles.smImage]} source={require('../../assets/images/questions.png')}/>)
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
                            { i18n.t('FAQs') }
                        </Title>
                    </Body>
                </Header>
                <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>
                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>
                        <View style={[styles.position_R, styles.bgFullWidth, styles.Width_90, styles.marginVertical_15, styles.SelfCenter]}>
                            <View style={[styles.lightOverlay, styles.Border]}></View>
                            <View style={[styles.position_R, styles.Width_100, styles.overHidden, styles.bg_White, styles.Border,styles.bgFullWidth,]}>
                                <Animatable.View animation="fadeInDown" easing="ease-out" delay={500} style={[styles.flexCenter]}>
                                    <Image style={[styles.icoImage]} source={require('../../assets/images/logo.png')}/>
                                </Animatable.View>
                                <View style={[styles.overHidden]}>
                                    <Animatable.View animation="fadeInRight" easing="ease-out" delay={500}>

                                        {

                                            this.props.faq.map((q, i) => (
                                                <Animatable.View animation="fadeInUp" duration={1000} style={styles.mb10} key={i}>
                                                    <Text style={[styles.textRegular , styles.text_black, styles.textLeft, styles.Width_100, styles.marginVertical_10, styles.paddingHorizontal_10]}>
                                                        {q.question}
                                                    </Text>
                                                    <Text style={[styles.textRegular , styles.text_black, styles.textLeft, styles.Width_100, styles.marginVertical_10, styles.paddingHorizontal_10]}>
                                                        {q.answer}
                                                    </Text>
                                                </Animatable.View>
                                            ))
                                        }

                                    </Animatable.View>
                                </View>
                            </View>
                        </View>
                </Content>
                </ImageBackground>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang , faq }) => {
    return {
        lang        : lang.lang,
        faq         : faq.ques,
        loader      : faq.loader
    };
};
export default connect(mapStateToProps, { getFaq })(Faq);