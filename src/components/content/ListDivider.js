import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, Animated} from 'react-native';

// Assets
import Colors from './../../assets/styles/colors.js';
const screenWidth = Math.round(Dimensions.get('window').width);

type Props = {};
export default class ListDivider extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const {style, progress, simple = false} = this.props;
    const wrapperStyle = style ? {...styles.divider, ...style} : styles.divider;
    const leftGap = 20; // Todo: Detect offset from left side automatically
    const indicatorStyle = progress
      ? {
          ...styles.indicator,
          ...{
            marginLeft: progress.interpolate({
              inputRange: [0, 100],
              outputRange: [0, (screenWidth - leftGap - styles.indicator.width)]
            })
          },
        }
      : styles.indicator;

    return (
      <View style={wrapperStyle}>
        {!simple && <Animated.View style={indicatorStyle} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    marginTop: 30,
    marginBottom: 30,
    height: 1,
    backgroundColor: Colors.divider,
  },
  indicator: {
    height: 3,
    width: 60,
    marginTop: -1,
    backgroundColor: Colors.gray,
    borderRadius: 5,
  },
});
