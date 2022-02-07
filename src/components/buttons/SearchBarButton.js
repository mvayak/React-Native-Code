import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button as ElementsButton } from 'react-native-elements';

// Assets
import Colors from './../../assets/styles/colors.js'

// Components
import LorylistIcon from './../LorylistIcon';

type Props = {};
export default class SearchBarButton extends Component<Props> {

    constructor(props) {
        super(props)
    }

    render() {
        const { onPress, title, style } = this.props
        
        return (
            <ElementsButton
                icon={<LorylistIcon name="search" size={17} color={Colors.gray} style={{ marginTop: 4 }} />}
                title={title}
                buttonStyle={[styles.button, style]}
                titleStyle={styles.buttonTitle}
                onPress={onPress}
            />
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.lightBackground,
        margin: 20,
        marginBottom: 0,
        borderRadius: 8,
        justifyContent: 'flex-start',
        height: 46,
        paddingLeft: 15,
    },
    buttonTitle: {
        color: Colors.placeholder,
        fontFamily: 'CircularStd-Book',
        fontSize: 16,
        paddingLeft: 10,
    },
});
