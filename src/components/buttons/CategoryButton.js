import React from 'react';
import {Button as ElementsButton} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import CategoryIcon from './../CategoryIcon'

import {SvgUri} from 'react-native-svg';

// Assets
import Colors from './../../assets/styles/colors.js';
import {useNavigation} from '@react-navigation/native';

export default function CategoryButton(props) {
  const {navigate} = useNavigation();
  const {style, category} = props;
  const wrapperStyle = style
    ? {...styles.container, ...style}
    : styles.container;

  return (
    <ElementsButton
      icon={<CategoryIcon name={category.icon} size={20} style={styles.icon} />}
      title={category.name}
      type="outline"
      buttonStyle={styles.button}
      titleStyle={styles.buttonTitle}
      onPress={() =>
        navigate('Search', {
          category: category,
        })
      }
    />
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    borderStyle: 'solid',
    paddingLeft: 10,
    paddingRight: 20,
    height: 46,
    marginRight: 10,
  },
  buttonTitle: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'CircularStd-Book',
    marginLeft: 8,
  },
  icon: {
    marginTop: 3,
    marginLeft: 5,
  },
});
