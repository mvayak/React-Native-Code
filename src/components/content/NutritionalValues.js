import React, {useRef} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {Button as ElementsButton} from 'react-native-elements';
import {Portal} from 'react-native-paper';
import NutritionalValuesModal from './../modals/NutritionalValuesModal';

// Assets
import Colors from './../../assets/styles/colors.js';

export default function NutritionalValues({style, name, items, unit}) {
  const containerStyle = style
    ? {...styles.container, ...style}
    : styles.container;

  const tableModal = useRef();

  return (
    <View style={containerStyle}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text style={styles.sectionText}>{name}</Text>
          <Text style={styles.baseUnit}>pro 100 {unit}</Text>
        </View>

        <ElementsButton
          title="Tabelle anzeigen"
          type="clear"
          buttonStyle={styles.showAllButton}
          titleStyle={styles.showAllButtonTitle}
          onPress={() => {
            tableModal.current.open();
          }}
        />
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {items.map(item => {
          return (
            <View
              key={item.id}
              // style={[styles.valueWrapper, { backgroundColor: Colors.lightWarning }]}>
              style={styles.valueWrapper}>
              <View style={styles.valueInnerWrapper}>
                <Text style={styles.value}>{item.value}</Text>
                {item.unit && (
                  <Text style={styles.unit}>{item.unit.shortcode}</Text>
                )}
              </View>
              <View style={styles.labelWrapper}>
                <Text
                  adjustsFontSizeToFit
                  style={styles.label}
                  ellipsizeMode={'tail'}
                  numberOfLines={2}>
                  {item.display_name}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <Portal>
        <NutritionalValuesModal ref={tableModal} items={items} />
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  sectionText: {
    fontSize: 16,
    fontFamily: 'CircularStd-Bold',
    color: Colors.black,
  },
  baseUnit: {
    fontSize: 10,
    fontFamily: 'CircularStd-Book',
    color: Colors.gray,
    marginBottom: 10,
  },

  // Value
  valueWrapper: {
    backgroundColor: Colors.lightSuccess,
    width: 68,
    height: 120,
    borderRadius: 34,
    marginRight: 10,
  },
  valueInnerWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 6,
    marginTop: 6,
    backgroundColor: Colors.white,
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
  },
  value: {
    textAlign: 'center',
    paddingTop: 3,
    fontSize: 18,
    fontFamily: 'CircularStd-Bold',
    color: Colors.black,
  },

  // Label
  labelWrapper: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -10,
  },
  label: {
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    color: Colors.black,
    textAlign: 'center',
    paddingHorizontal: 5,
    lineHeight: 14,
  },

  // Unit
  unit: {
    marginTop: -3,
    fontSize: 12,
    fontFamily: 'CircularStd-Book',
    color: 'rgba(0, 0, 0, 0.4)',
    textAlign: 'center',
  },

  // Show all button
  showAllButton: {
    marginTop: -10,
    paddingRight: 20,
  },
  showAllButtonTitle: {
    color: Colors.primary,
    fontWeight: '500',
    fontSize: 14,
  },
});
