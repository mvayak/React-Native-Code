import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  TextInput,
} from 'react-native';
import colors from './../../assets/styles/colors.js';
import Icon from '../LorylistIcon';
import { Keyboard } from 'react-native';
import helpers from '../../helpers.js';
import { useIsFocused } from '@react-navigation/native';
const SearchInput = React.forwardRef((props, ref) => {
  const {
    containerStyle,
    onChangeText,
    placeholder,
    onSearching,
    onSubmit = null,
    initialValue = null,
    onFocusChange = null,
  } = props;

  // Local states
  const [query, setQuery] = useState(initialValue || null);

  // Animations
  // Cancel button fade in / fade out
  const [cancelButtonAnimation] = useState(new Animated.Value(0));
  const [cancelButtonWidth, setCancelButtonWidth] = useState(120);

  // Get screen focus
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getCancelButtonValue();
    }
  }, [isFocused])

  const cancelButtonShow = () => {
    Animated.timing(cancelButtonAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const cancelButtonHide = () => {
    Animated.timing(cancelButtonAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  async function showCancelButton() {
    let vala = await helpers.save_data("cancel_shown", "1");
  }

  async function getCancelButtonValue() {
    let vala = await helpers.get_data("cancel_shown");
    if (vala == '1') {
      cancelButtonShow();
    } else {
      cancelButtonHide();
    }
  }


  // State helpers
  const focus = () => {
    showCancelButton();
    cancelButtonShow();

    if (onSearching) {
      onSearching(true);
    }

    if (onFocusChange) {
      onFocusChange(true);
    }
  };

  const blur = () => {
    if (onFocusChange) {
      onFocusChange(false);
    }
  };

  async function resetCancelButton() {
    await helpers.save_data("cancel_shown", "0");
  }

  // Cancel editing
  const cancel = () => {
    resetCancelButton();
    Keyboard.dismiss();
    cancelButtonHide();
    setQuery(null);

    if (onChangeText) {
      onChangeText(null);
    }

    if (onSearching) {
      onSearching(false);
    }
  };

  return (
    <View style={[s.container, containerStyle]}>
      {/* Input */}
      <Animated.View
        style={[
          s.inputContainer,
          {
            marginRight: cancelButtonAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, cancelButtonWidth],
            }),
          },
        ]}>
        {/* Left icon */}
        <Icon name="search" size={17} color={colors.gray} style={s.leftIcon} />

        <TextInput
          ref={ref}
          placeholder={placeholder || 'lorylist durchsuchen'}
          style={s.input}
          clearButtonMode={'always'}
          onChangeText={text => {
            setQuery(text);

            if (onChangeText) {
              onChangeText(text);
            }
          }}
          value={query}
          onSubmitEditing={({ nativeEvent: { text } }) => {
            if (text.toString().trim() == '') {
              setQuery('');
            } else {
              Keyboard.dismiss();
              if (onSubmit) {
                onSubmit(text);
              }
            }
          }}
          onFocus={focus}
          onBlur={blur}
          autoComplete={'off'}
          autoCorrect={false}
          returnKeyType={'search'}
        />
      </Animated.View>

      {/* Cancel button */}
      {
        <Animated.View
          style={[
            s.cancelButtonContainer,
            {
              opacity: cancelButtonAnimation,
              right: cancelButtonAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [cancelButtonWidth * -1, 0],
              }),
            },
          ]}
          onLayout={event => {
            setCancelButtonWidth(event.nativeEvent.layout.width);
          }}>
          <TouchableOpacity style={s.cancelButton} onPress={cancel}>
            <Text style={s.cancelButtonText}>Abbrechen</Text>
          </TouchableOpacity>
        </Animated.View>
      }
    </View>
  );
});

export default SearchInput;

const s = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    marginTop: 5,
  },
  inputContainer: {
    paddingLeft: 20,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.lightBackground,
    borderRadius: 18,
    height: 44,
    flexGrow: 1,
  },
  input: {
    flexGrow: 1,
    width: "90%",
    fontFamily: 'CircularStd-Book',
    fontSize: 16,
    height: 44,
    borderColor: null,
    borderBottomWidth: 0,
  },
  leftIcon: {
    marginTop: 4,
    marginRight: 10,
  },

  // Cancel button
  cancelButton: {
    height: 44,
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonContainer: {
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 16,
  },
});
