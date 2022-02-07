import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Button} from 'react-native-elements';
import Icon from '../LorylistIcon';
import {colors} from '../../assets/styles';
// import { Container } from './styles';

/**
 * Props
 *
 *
 */
const ModalContextMenu = React.forwardRef((props, ref) => {
  const {
    title = '',
    onClose,
    onOpened,
    modalHeight,
    headerComponent,
    footerComponent,
    floatingComponent,
    closeButtonVisible = false,
    fitContent = false,
    stickyBottom,
  } = props;

  // Sticky bottom
  const stickyProps = stickyBottom ? {
    withHandle: false,
    overlayStyle: {
      backgroundColor: 'transparent',
    },
    alwaysOpen: stickyBottom,
    panGestureEnabled: false,
    // adjustToContentHeight: true,
    // modalHeight: stickyBottom,
    adjustToContentHeight: true,
  } : {
      adjustToContentHeight: fitContent
  }

  return (
    <Modalize
      {...stickyProps}
      ref={ref}
      onClose={onClose}
      onOpened={onOpened}
      modalHeight={modalHeight}
      HeaderComponent={headerComponent ? headerComponent : (
        <View>
          {title.length > 0 && (
            <View style={s.titleRow}>
              <Text style={s.title}>{title}</Text>
              {closeButtonVisible && (
                <Button
                  icon={<Icon name={'times'} size={12} color={'black'} />}
                  iconContainerStyle={{ marginLeft: 10 }}
                  buttonStyle={s.btnClose}
                  onPress={() => {
                    ref.current.close();
                  }}
                />
              )}
            </View>
          )}
        </View>
      )}
      FooterComponent={footerComponent}
      FloatingComponent={floatingComponent}>
      <View style={s.container}>
        {props.children}
      </View>
    </Modalize>
  );
});

export default ModalContextMenu;

const s = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 26,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'CircularStd-Bold',
  },

  btnClose: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.lightBackground,
  },
});
