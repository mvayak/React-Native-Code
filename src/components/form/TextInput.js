import React, { Component } from 'react';
import { StyleSheet, Animated, Text, Easing, View } from 'react-native';

// Components
import { Input } from 'react-native-elements';

// Assets
import colors from '../../assets/styles/colors.js'


export default class TextInput extends Component {

    constructor(props) {
        super(props)

        this.state = {
            text: ''
        }

        this.animated = new Animated.Value(0)

        this.handleFocus = this.handleFocus.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
    }

    handleFocus() {
        Animated.timing(this.animated, {
            toValue: 1,
            duration: 300,
            easing: Easing.bounce,
            useNativeDriver: true,
        }).start()
    }

    handleBlur() {
        if (this.state.text.length === 0) {
            Animated.timing(this.animated, {
                toValue: 0,
                duration: 300,
                easing: Easing.bounce,
                useNativeDriver: true
            }).start()
        }
    }

    componentDidMount() {
        if (this.state.text.length > 0) {
            Animated.timing(this.animated, {
                toValue: 1,
                duration: 300,
                easing: Easing.bounce,
                useNativeDriver: true,
            }).start()
        }
    }

    render() {
        const selectedStyle = {
            top: this.animated.interpolate({
                inputRange: [0, 1],
                outputRange: [19, 8]
            }),
            fontSize: this.animated.interpolate({
                inputRange: [0, 1],
                outputRange: [16, 12]
            }),
        }

        if (this.props.defaultValue) {
            this.handleFocus()
        }

        return (
            <View>
                <Input
                    {...this.props}

                    label={(
                        <Animated.Text pointerEvents='none' style={[styles.inputLabel, selectedStyle]}>
                            {this.props.label}
                            {this.props.required && (
                                <Text style={styles.required}> *</Text>
                            )}
                        </Animated.Text>
                    )}
                    inputStyle={styles.input}
                    inputContainerStyle={styles.inputContainer}
                    containerStyle={[styles.container, this.props.containerStyle]}
                    errorStyle={styles.errorStyle}

                    autoFocus={false}
                    autoCapitalize='none'
                    autoCorrect={false}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onChangeText={(text) => {
                        if (this.props.onChangeText) this.props.onChangeText(text)

                        this.setState({ text: text })
                    }}
                />
                {this.props.helpText && (<Text style={styles.helpText}>{this.props.helpText}</Text>)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // Input
    input: {
        fontSize: 16,
    },
    container: {
        paddingHorizontal: 0
    },
    inputContainer: {
        position: 'relative',
        borderBottomWidth: 0,
        backgroundColor: colors.inputBackground,
        borderRadius: 8,
        height: 56,
        paddingHorizontal: 18,
        paddingTop: 17,
    },
    inputLabel: {
        position: 'absolute',
        color: colors.placeholder,
        fontSize: 16,
        fontWeight: '500',
        top: 19,
        left: 18,
        zIndex: 1,
    },
    errorStyle: {
        color: colors.secondary,
        marginTop: 10,
        fontWeight: '500',
    },
    required: {
        color: colors.secondary,
    },
    helpText: {
        color: colors.gray,
        fontSize: 12,
        marginTop: 7,
        marginLeft: 10,
        marginBottom: 10,
    },
});
