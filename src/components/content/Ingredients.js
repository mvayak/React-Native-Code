import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// Components
import LorylistIcon from './../LorylistIcon';

import colors from '../../assets/styles/colors';
import {useNavigation} from '@react-navigation/native';

export default function Ingredients({items}) {
  const {navigate} = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zutaten</Text>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {items.map(item => {
          return (
            // <TouchableOpacity onPress={() => {
            //   navigate('Search', {
            //     ingredient: item,
            //   })
            // }}>
            <Text style={styles.tag}>{item.name}</Text>
            // </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    color: colors.black,
    fontSize: 16,
    fontFamily: 'CircularStd-Bold',
  },

  scrollView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },

  // Tag
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    backgroundColor: 'rgba(225, 230, 231, 0.1)',
    borderColor: 'rgba(225, 230, 231, 0.5)',
    borderRadius: 15,
    borderWidth: 1.5,
    marginTop: 10,
    marginRight: 10,
  },
});
