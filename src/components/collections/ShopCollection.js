import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Animated, Dimensions } from 'react-native';

// Components
import ShopCard from './../cards/ShopCard'
import ListDivider from './../content/ListDivider'

// Assets
import Colors from './../../assets/styles/colors.js'
const screenWidth = Math.round(Dimensions.get('window').width);

export default class ShopCollection extends Component {

  constructor(props) {
    super(props)

    this.state = {
      progress: new Animated.Value(0),
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll({ nativeEvent: { contentOffset, contentSize } }) {
    let progress = ((contentOffset.x - 20) / (contentSize.width - screenWidth)) * 100;

    if (progress < 0) progress = 0
    if (progress > 100) progress = 100

    this.state.progress.setValue(progress)
  }

  render() {
    const { style, name, shops } = this.props
    const containerStyle = style ? { ...styles.container, ...style } : styles.container

    return (
      <View style={containerStyle}>
        <Text style={styles.sectionText}>{name}</Text>
        <ScrollView
          horizontal={true}
          onScroll={this.handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.contentContainerStyle}>
          {shops.map((shop, index) => (
            <ShopCard key={index} shop={shop} />
          ))}
        </ScrollView>

        <ListDivider style={styles.divider} progress={this.state.progress} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
  },
  sectionText: {
    marginBottom: 10,
    fontSize: 18,
    fontFamily: 'CircularStd-Bold',
    paddingLeft: 20,
  },
  contentContainerStyle: {
    paddingLeft: 20,
  },
  divider: {
    marginLeft: 20,
  },
});
