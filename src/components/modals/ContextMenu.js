import React from 'react';

// Assets
import LorylistIcon from './../LorylistIcon';
import colors from './../../assets/styles/colors';

// Dependencies
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button as ElementsButton} from 'react-native-elements';
import {Modalize} from 'react-native-modalize';

const screenHeight = Dimensions.get('window').height;

const ContextMenu = ({
  leftImage,
  headerOnPress,
  title,
  subtitle,
  onClosed,
  reference,
  headerImage,
  additionalHeader,
  renderContent,
  searchBarComponent,
  searchBarContainerStyle,
  fitContent,
  withReactModal,
  modalHeight,
}) => {
  return (
    <Modalize
      ref={reference}
      modalStyle={styles.modal}
      withReactModal={withReactModal}
      modalHeight={modalHeight}
      adjustToContentHeight={fitContent}
      keyboardAvoidingOffset={64}>
      <View style={styles.titleRow}>
        <TouchableOpacity
          disabled={headerOnPress ? false : true}
          onPress={headerOnPress}
          style={leftImage ? {paddingLeft: 60} : {}}>
          {/* Left image */}
          {leftImage && <Image style={styles.leftImage} source={leftImage} />}

          {/* Title */}
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>

        <ElementsButton
          icon={<LorylistIcon name={'times'} size={12} color={'black'} />}
          iconContainerStyle={{marginLeft: 10}}
          buttonStyle={styles.bCloseButton}
          onPress={onClosed}
        />
      </View>
      {headerImage !== undefined && (
        <View style={styles.headerImageContainer}>{headerImage}</View>
      )}
      {subtitle && (
        <Text style={[styles.subtitle, leftImage ? {marginLeft: 60} : {}]}>
          {subtitle}
        </Text>
      )}

      {additionalHeader}

      <View style={searchBarContainerStyle}>{searchBarComponent}</View>

      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
        {renderContent}
      </ScrollView>
    </Modalize>
  );
};

export default ContextMenu;

const styles = StyleSheet.create({
  modal: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: screenHeight * 0.63,
  },
  wrapper: {
    paddingBottom: 20,
  },
  headerImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 26,
    // marginBottom: 10,
    paddingHorizontal: 20,
  },
  bCloseButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.lightBackground,
  },

  // Header
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    paddingHorizontal: 20,
    fontSize: 14,
    color: colors.lightGray,
  },
  leftImage: {
    position: 'absolute',
    left: 0,
    width: 48,
    height: 48,
    borderRadius: 27,
    marginRight: 5,
  },

  // List Item
  itemContainer: {
    paddingHorizontal: 0,
    paddingVertical: 17,
  },
});
