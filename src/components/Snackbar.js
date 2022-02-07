import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { Portal } from 'react-native-paper';
import { colors } from '../assets/styles';
import Interactable from 'react-native-interactable';
import { useSelector, useDispatch } from 'react-redux';
import { commonOperations } from '../state/ducks/common';

const SCREEN_WIDTH = Dimensions.get('window').width;

let timeout = null;
export default function Snackbar() {
  const dispatch = useDispatch();
  const interactableRef = useRef();
  const [_deltaX] = useState(new Animated.Value(0));
  const [_deltaY] = useState(new Animated.Value(0));
  const [animatedFactor] = useState(new Animated.Value(0));
  const { snackbar, isSnackbarVisible } = useSelector(state => state.common);
  const [title, setTitle] = useState('');
  const [undoTitle, setUndoTitle] = useState('Rückgängig');

  useEffect(() => {
    if (isSnackbarVisible) {
      Animated.timing(animatedFactor, {
        toValue: 1,
        duration: 500,
        easing: Easing.bounce,
      }).start();

      // Set data
      if (snackbar && snackbar.title) {
        setTitle(snackbar.title);
      }
      if (snackbar && snackbar.undoTitle) {
        setUndoTitle(snackbar.undoTitle);
      }

      // Reset and start timer
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(
        () => hide(),
        snackbar && snackbar.delay ? snackbar.delay : 3000,
      );
    }

    if (!isSnackbarVisible) {
      Animated.timing(animatedFactor, {
        toValue: 0,
        duration: 400,
        easing: Easing.linear,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animatedFactor, isSnackbarVisible]);

  const onDrawerSnap = ({ nativeEvent: { index } }) => {
    // Hide
    if (index === 1) {
      interactableRef.current.snapTo({ index: 2 });
    }
  };

  const hide = useCallback(() => {
    dispatch(commonOperations.doResetSnackbar());
  });

  return (
    <Portal>
      <Interactable.View
        style={[
          s.container,
          {
            bottom: animatedFactor.interpolate({
              inputRange: [0, 1],
              outputRange: [-100, 100],
            }),
            opacity: animatedFactor.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ]}
        ref={interactableRef}
        dragEnabled={true}
        horizontalOnly={true}
        snapPoints={[{ x: 0 }, { x: SCREEN_WIDTH / 2 }, { x: SCREEN_WIDTH }]}
        onSnap={onDrawerSnap}
        dragWithSpring={{
          tension: 1000,
          damping: 0.5,
        }}
        animatedValueX={_deltaX}
        animatedValueY={_deltaY}>
        <Text style={s.title}>{title}</Text>
        <TouchableOpacity
          style={s.undoButton}
          onPress={() => {
            if (snackbar && snackbar.undo) {
              snackbar.undo();
              hide();
            } else {
              hide();
            }
          }}>
          <Text style={s.undoButtonTitle}>{undoTitle}</Text>
        </TouchableOpacity>
      </Interactable.View>
    </Portal>
  );
}

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: SCREEN_WIDTH - 40,
    backgroundColor: colors.white,

    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,

    elevation: 2,
  },

  // Title
  title: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 15,
  },

  // Undo button
  undoButton: {
    paddingVertical: 5,
  },
  undoButtonTitle: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 14,
    color: colors.secondary,
  },
});
