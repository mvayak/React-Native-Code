import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ViewMoreText from 'react-native-view-more-text';

// Assets
import Colors from './../../assets/styles/colors.js';

type Props = {};
export default class Description extends Component<Props> {
  constructor(props) {
    super(props);
  }

  renderViewMore(onPress) {
    return (
      <Text style={styles.button} onPress={onPress}>
        Weiterlesen
      </Text>
    );
  }

  renderViewLess(onPress) {
    return (
      <Text style={styles.button} onPress={onPress}>
        Weniger anzeigen
      </Text>
    );
  }

  render() {
    const { style, text, title } = this.props;
    const containerStyle = style
      ? { ...styles.container, ...style }
      : styles.container;

    return (
      <View style={containerStyle}>
        {title && <Text style={styles.title}>{title}</Text>}
        <ViewMoreText
          numberOfLines={3}
          renderViewMore={this.renderViewMore}
          renderViewLess={this.renderViewLess}>
          <Text style={styles.text}>{text}</Text>
        </ViewMoreText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  title: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'CircularStd-Bold',
    marginBottom: 10,
  },
  text: {
    color: Colors.gray,
    fontSize: 14,
    fontFamily: 'CircularStd-Book',
  },
  button: {
    marginTop: 5,
    color: Colors.secondary,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
  },
});
