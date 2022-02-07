import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

// Components
import LorylistIcon from './../LorylistIcon';

import colors from '../../assets/styles/colors';

export default function EmptyMessage({icon, title, subtitle, containerStyle}) {
  return (
    <View style={[styles.emptyWrapper, containerStyle]}>
      <Text style={styles.emptyIcon}>
        <LorylistIcon name={icon} size={24} color={colors.black} />
      </Text>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptySubtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // Empty info
  emptyWrapper: {
    flex: 1,
    padding: 20,
  },
  emptyIcon: {
    textAlign: 'center',
    marginTop: 50,
  },
  emptyTitle: {
    textAlign: 'center',
    color: colors.black,
    fontFamily: 'CircularStd-Bold',
    fontSize: 16,
    marginTop: 5,
  },
  emptySubtitle: {
    textAlign: 'center',
    fontFamily: 'CircularStd-Book',
    marginTop: 10,
    color: colors.gray,
  },
});
