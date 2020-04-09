import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {Container, Content,} from 'native-base';
import styles from '../../assets/style';

import i18n from "../../locale/i18n";
import * as Animatable from 'react-native-animatable';

import { connect } from 'react-redux';
import { chooseLang } from '../actions';

class Language extends Component {
    constructor(props){
        super(props);
        this.state          = {};
        this.onChooseLang   = this.onChooseLang.bind(this)
    }

    onChooseLang(lang) {
        console.log(lang);
        this.props.chooseLang(lang);
        this.props.navigation.navigate('ChooseUser');
    };

    render() {

        return (
            <Container>
                <Content contentContainerStyle={styles.bgFullWidth}>



                </Content>

            </Container>

        );
    }
}

// export default Language;

const mapStateToProps = ({ lang }) => {
    return {
        lang    : lang.lang
    };
};

export default connect(mapStateToProps, { chooseLang })(Language);