import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

// Assets
import Colors from './../../assets/styles/colors.js'

type Props = {};
export default class SwitchButtonGroup extends Component<Props> {

    constructor(props) {
        super(props)

        this.state = {
            selectedIndex: 0
        }

        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex(selectedIndex) {
        this.setState({ selectedIndex })

        // Call event
        const { values, handleUpdate } = this.props
        handleUpdate(values[selectedIndex].value)
    }

    render() {
        const { style, values } = this.props
        const wrapperStyle = style ? { ...styles.buttonGroup, ...style } : styles.buttonGroup
        const textStyle = style ? { ...styles.textStyle, ...textStyle } : styles.textStyle
        const { selectedIndex } = this.state

        return (
            <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={values.map((value) => value.title)}
                
                // Styles
                containerStyle={wrapperStyle}
                buttonStyle={styles.buttonStyle}
                textStyle={textStyle}
                disabledStyle={styles.disabledStyle}
                selectedButtonStyle={styles.selectedButtonStyle}
                selectedTextStyle={styles.selectedTextStyle}
                innerBorderStyle={styles.innerBorderStyle}
            />
        );
    }
}

const styles = StyleSheet.create({
    buttonGroup: {
        borderRadius: 10,
        backgroundColor: Colors.lightBackground,
        borderWidth: 0,
        height: 36,
        margin: 0,
    },
    buttonStyle: {
        margin: 2,
        backgroundColor: Colors.lightBackground,
        borderRadius: 8,
        borderWidth: 0,
    },
    textStyle: {
        fontSize: 14,
        fontWeight: "500",
        color: Colors.black,
        paddingTop: 2,
        marginTop: 0,
        borderWidth: 0,
    },
    disabledStyle: {
        borderWidth: 0,
        backgroundColor: 'red'
    },
    selectedButtonStyle: {
        borderWidth: 0,
        backgroundColor: Colors.white,
    },
    selectedTextStyle: {
        color: Colors.black,
    },
    innerBorderStyle: {
        width: 0,
    }
});
