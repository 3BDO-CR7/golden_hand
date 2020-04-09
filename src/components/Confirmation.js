import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Body, Title,} from 'native-base'
import styles from '../../assets/style'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import i18n from "../../locale/i18n";
import * as Animatable from "react-native-animatable";

class Confirmation extends Component {
    constructor(props){
        super(props);

        this.state={
        }
    }

    componentWillMount() {
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
    render() {

        return (
            <Container>

                <NavigationEvents onWillFocus={() => this.onFocus()} />

                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={[styles.text_black, styles.textSize_22]} type="AntDesign" name='right' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                    <Title style={[styles.textRegular , styles.text_black, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>
                        { i18n.t('confirmation') }
                    </Title>
                    </Body>
                </Header>
                <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>
                <Content  contentContainerStyle={styles.bgFullWidth} style={styles.bgFullWidth}>

                        <View style={[styles.overHidden, styles.marginVertical_25, styles.paddingHorizontal_20]}>
                            <View style={[styles.overHidden, styles.SelfRight]}>
                                <Animatable.View animation="fadeInLeft" easing="ease-out" delay={500} style={[styles.flexCenter]}>
                                    <Image
                                        style       = {[styles.sizeImage , styles.flexCenter]}
                                        source      = {require('../../assets/images/accepted.png')}
                                    />
                                </Animatable.View>
                            </View>

                            <View style={[styles.overHidden, styles.flexCenter, styles.marginVertical_25, styles.Width_80]}>
                                <Text style={[styles.textRegular , styles.textSize_18, styles.text_black, styles.textCenter]}>
                                    { i18n.t('confirmationText') }
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.bg_darkBrown,
                                    styles.width_150,
                                    styles.flexCenter,
                                    styles.marginVertical_15,
                                    styles.height_40
                                ]}
                                onPress={() => this.props.navigation.navigate('drawerNavigator')}>
                                <Text style={[styles.textBold , styles.textSize_14, styles.text_White]}>
                                    {i18n.translate('gohome')}
                                </Text>
                            </TouchableOpacity>
                        </View>

                </Content>
                </ImageBackground>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang }) => {
    return {
        lang        : lang.lang,
    };
};
export default connect(mapStateToProps, { })(Confirmation);