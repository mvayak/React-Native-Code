import React, {Component} from 'react';
import {
  Button as ElementsButton,
  Badge,
} from 'react-native-elements';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
// Assets
import Colors from './../../assets/styles/colors.js';

const LocationItem = ({
  location,
  onPress,
  onPressRight,
  showDeleteButton = false,
}) => {
  const isNotAvailable =
    !location.shops_count || (location.shops_count && location.shops_count == 0);
  const disabledStyle = isNotAvailable ? styles.disabled : {};

  return (
    <TouchableOpacity onPress={onPress} disabled={isNotAvailable}>
      <View style={styles.container}>
        <View style={styles.topRowContainer}>
          <View style={styles.topRowInnerContainer}>
            {/* Icon */}
            <FeatherIcon name="map-pin" color={Colors.black} size={20} />

            {/* Name */}
            <Text
              style={{...styles.locationName, ...disabledStyle}}
              numberOfLines={1}
              ellipsizeMode="tail">
              {location.name}
            </Text>

            {/* County name */}
            {location.county && (
              <Text style={styles.locationCounty}>({location.county.name})</Text>
            )}
          </View>

          {/* Delete button */}
          {showDeleteButton && (
            <ElementsButton
              containerStyle={{marginLeft: 20}}
              buttonStyle={{backgroundColor: null, padding: 0, margin: 0}}
              icon={<FeatherIcon name="x" color={Colors.black} size={20} />}
              onPress={onPressRight}
            />
          )}
        </View>

        {/* Not available info */}
        {isNotAvailable && (
          <Text style={styles.notAvailableInfo}>Keine Märkte verfügbar.</Text>
        )}

        {/* Shops */}
        {location.shops && location.shops > 0 ? (
          <Badge
            value={`${location.shops} ${
              location.shops == 1 ? 'Shop' : 'Shops'
            }`}
            containerStyle={styles.badgeContainer}
            badgeStyle={styles.badge}
          />
        ) : (
          <View />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  topRowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topRowInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    maxWidth: '100%',
    justifyContent: 'flex-start',
  },
  locationName: {
    marginLeft: 7,
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'CircularStd-Medium',
    flexShrink: 1,
  },
  locationCounty: {
    marginLeft: 5,
    color: Colors.gray,
    fontSize: 16,
    fontFamily: 'CircularStd-Book',
  },

  // BADGE
  badgeContainer: {
    marginTop: 7,
    marginLeft: 27,
  },
  badge: {
    height: 23,
    paddingHorizontal: 5,
    // paddingVertical: 10,
    backgroundColor: Colors.primary,
  },

  // Disabled
  disabled: {
    color: Colors.gray,
  },

  // Not available info
  notAvailableInfo: {
    fontSize: 12,
    fontFamily: 'CircularStd-Book',
    color: Colors.gray,
    marginTop: 0,
    marginLeft: 28,
    marginBottom: 5,
  },
});

export default LocationItem;
