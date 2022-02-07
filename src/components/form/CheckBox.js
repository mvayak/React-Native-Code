import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Components
import LorylistIcon from './../LorylistIcon.js';

// Assets
import colors from '../../assets/styles/colors.js'

type Props = {};

export default class CheckBox extends Component<Props> {

    constructor(props) {
        super(props)
    }

    render() {
        const { label, state, onPress } = this.props
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.container}>
                    <View style={[styles.checkbox, state ? styles.checkedCheckbox : {}]}>
                        {state && (<LorylistIcon name={'small-check'} size={12} color={colors.white} />)}
                    </View>
                    <Text style={styles.label}>{label}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 20,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 6,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,

        // Shadow
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 5,

        elevation: 5,
    },
    checkedCheckbox: {
        backgroundColor: colors.secondary,
        borderColor: colors.secondary,
    },
    label: {
        marginTop: 3.5,
    },
});
