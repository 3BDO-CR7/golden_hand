import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Body, Title} from 'native-base'
import styles from '../../assets/style'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import i18n from "../../locale/i18n";

class CommissionPayment extends Component {
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
                            <Icon style={[styles.text_midBrown, styles.textSize_22]} type="AntDesign" name='right' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_midBrown, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>
                            { i18n.t('pay') }
                        </Title>
                    </Body>
                </Header>
                <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>
                    <Content  contentContainerStyle={styles.bgFullWidth} style={styles.bgFullWidth}>
                        <View style={[styles.rowGroup , styles.paddingHorizontal_10, styles.marginVertical_10]}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('bankAccounts' , {
                                // provider_id             : this.props.navigation.state.params.provider_id,
                                payment_type            : 0,
                            })} style={[styles.bg_White , styles.Border, styles.Width_100, styles.flexCenter, styles.Radius_5, styles.height_120, styles.marginVertical_10]}>
                                <Image
                                    style       = {[styles.width_70 , styles.height_70, styles.flexCenter]}
                                    source      = {require('../../assets/images/cash.png')} resizeMode={'cover'}
                                />
                                <Text
                                    style={[styles.textBold, {color:'#ed8928'}, styles.marginHorizontal_5]}>{i18n.translate('bankTransfer')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('FormPayment' , {
                                routeName             : this.props.navigation.state.params.routeName,
                                // provider_id             : this.props.navigation.state.params.provider_id,
                                payment_type            : 1,
                            })} style={[styles.bg_White , styles.Border, styles.Width_100, styles.flexCenter, styles.Radius_5, styles.height_120, styles.marginVertical_10]}>
                                <Image
                                    style       = {[styles.width_70 , styles.height_70, styles.flexCenter]}
                                    source      = {require('../../assets/images/electronicPay.png')} resizeMode={'cover'}
                                />
                                <Text
                                    style={[styles.textBold, {color:'#0d6bb4'}, styles.marginHorizontal_5]}>{i18n.translate('electronicPay')}</Text>
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
export default connect(mapStateToProps, { })(CommissionPayment);