import React, { Component } from "react";
import {View, Text, Image, ImageBackground} from "react-native";
import styles from '../../assets/style'
import i18n from '../../locale/i18n'

class ShareApp extends Component {
    constructor(props){
        super(props);

        this.state={
            status              : null,
        }
    }

    static navigationOptions = () => ({
        header      : null,
        drawerLabel : ( <Text style={[styles.textRegular, styles.text_midBrown, styles.textSize_18]}>{ i18n.t('share') }</Text> ) ,
        drawerIcon  : ( <Image style={[styles.smImage]} source={require('../../assets/images/share.png')}/>)
    });

    render() {
        return false
    }
}

export default ShareApp;