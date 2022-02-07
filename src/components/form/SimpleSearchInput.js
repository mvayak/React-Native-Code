import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

// Components
import { SearchBar } from 'react-native-elements';
import LorylistIcon from './../LorylistIcon'

// Assets
import Colors from '../../assets/styles/colors.js'

type Props = {};
export default class SearchInput extends Component<Props> {

    constructor(props) {
        super(props)

        this.state = {
            searchQuery: '',
        }

        this.onChange = this.onChange.bind(this)
        this.onClear = this.onClear.bind(this)
    }
    
    onChange ({ nativeEvent: { text } }) {
        this.setState({ searchQuery: text })

        const { handleChange } = this.props
        handleChange(text)
    }

    onClear() {
        this.setState({ searchQuery: '' })

        const { handleClear } = this.props
        handleClear()
    }

    render() {
        const { style, isLoading, placeholder } = this.props
        const wrapperStyle = style ? { ...styles.container, ...style } : styles.container


        return (
            <SearchBar
                placeholder={placeholder}
                lightTheme={true}
                value={this.state.searchQuery}
                showLoading={isLoading}
                containerStyle={wrapperStyle}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.searchInput}
                searchIcon={<LorylistIcon name="search" size={17} color={Colors.gray} style={{ marginTop: 4, marginRight: 0 }} />}
                onChange={this.onChange}
                onClear={this.props.handleClear ? this.onClear : () => this.setState({ searchQuery: '' })}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
        backgroundColor: Colors.lightBackground,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderRadius: 8,
    },
    inputContainer: {
        backgroundColor: Colors.lightBackground,
        borderRadius: 8,
        paddingLeft: 5,
        height: 46,
    },
    searchInput: {
        color: Colors.gray,
        fontSize: 16,
        fontFamily: 'CircularStd-Book',
    },
});
