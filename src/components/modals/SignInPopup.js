import React, {useState} from 'react';

// Components
import TextInput from './../form/TextInput';
import ActionButton from './../buttons/ActionButton';

// Assets
import LorylistIcon from './../LorylistIcon';
import colors from '../../assets/styles/colors';

// Dependencies
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {Button as ElementsButton} from 'react-native-elements';
import {Modalize} from 'react-native-modalize';

// Redux
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {userOperations} from '../../state/ducks/user';
import {useNavigation} from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;

/**
 * Loader
 */
const useDataLoader = () => {
  const dispatch = useDispatch();

  const {
    // User
    isLoadingSignIn,
    isSuccessSignIn,
    signInError,
    user,
  } = useSelector(state => state.user, shallowEqual);

  return {
    isLoadingSignIn,
    isSuccessSignIn,
    signInError,
    user,
  };
};

const SignInPopup = ({
  onClosed,
  reference,
  signUpReference,
  forgotPasswordReference,
  onSuccess,
  withSettings = false,
}) => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  const {user, isLoadingSignIn, isSuccessSignIn, signInError} = useDataLoader();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Modalize
      ref={reference}
      modalStyle={[styles.modal]}
      scrollViewProps={{showsVerticalScrollIndicator: false}}
      adjustToContentHeight={true}
      onOpen={() => {
        dispatch(userOperations.doResetSignIn());
      }}
      HeaderComponent={
        isSuccessSignIn === false && (
          <View style={{paddingBottom: 10}}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>Einloggen</Text>

              <ElementsButton
                icon={<LorylistIcon name={'times'} size={12} color={'black'} />}
                iconContainerStyle={{marginLeft: 10}}
                buttonStyle={styles.bCloseButton}
                onPress={onClosed}
              />
            </View>
            <Text style={styles.subtitle}>
              Bitte gib deine E-Mail-Adresse und Passwort ein.
            </Text>
          </View>
        )
      }
      children={
        <View>
          {isSuccessSignIn === false && (
            <View>
              <View style={styles.contentWrapper}>
                {signInError.length > 0 && (
                  <Text style={styles.errorMessage}>{signInError}</Text>
                )}

                <TextInput
                  label="E-Mail-Adresse"
                  onChangeText={text => setEmail(text)}
                  autoCompleteType={'email'}
                />

                <TextInput
                  label="Passwort"
                  autoCompleteType={'password'}
                  secureTextEntry={true}
                  onChangeText={text => setPassword(text)}
                  containerStyle={{marginTop: 10}}
                />

                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <ElementsButton
                    title="Passwort vergessen?"
                    type="clear"
                    buttonStyle={styles.signUpButton}
                    titleStyle={styles.signUpButtonTitle}
                    onPress={() => {
                      reference.current.close();
                      forgotPasswordReference.current.open();
                    }}
                  />
                </View>

                <ActionButton
                  title="Einloggen"
                  style={{marginTop: 20, flex: 0}}
                  color="secondary"
                  loading={isLoadingSignIn}
                  disabled={
                    isLoadingSignIn ||
                    email.length === 0 ||
                    password.length === 0
                  }
                  onPress={() =>
                    dispatch(userOperations.doSignIn(email, password))
                  }
                />

                <View style={{flexDirection: 'row', marginTop: 20}}>
                  <Text style={styles.signUpText}>Noch kein Konto?</Text>

                  <ElementsButton
                    title="Jetzt registrieren"
                    type="clear"
                    buttonStyle={styles.signUpButton}
                    titleStyle={styles.signUpButtonTitle}
                    onPress={() => {
                      dispatch(userOperations.doOpenSignUp(true));
                      reference.current.close();
                      signUpReference.current.open();
                    }}
                  />
                </View>
              </View>
            </View>
          )}

          {isSuccessSignIn === true && user.name && (
            <View style={styles.successWrapper}>
              <View style={styles.successTitleRow}>
                <ElementsButton
                  icon={
                    <LorylistIcon name={'times'} size={12} color={'black'} />
                  }
                  iconContainerStyle={{marginLeft: 10}}
                  buttonStyle={styles.bCloseButton}
                  onPress={onClosed}
                />
              </View>

              <View style={{alignItems: 'center'}}>
                <Image
                  style={styles.checkIcon}
                  source={require('./../../assets/images/big-success-check.png')}
                />

                <Text style={styles.successTitle}>
                  Hallo {user.name.split(' ')[0]}
                </Text>
                <Text style={styles.successSubtitle}>
                  Du hast dich erfolgreich eingeloggt.
                </Text>
              </View>

              <ActionButton
                title="OK"
                style={{marginTop: 30, flex: 0}}
                color="primary"
                onPress={() => {
                  onClosed();

                  if (onSuccess !== undefined) {
                    onSuccess();
                  }
                }}
              />
            </View>
          )}
        </View>
      }
    />
  );
};
export default SignInPopup;

const styles = StyleSheet.create({
  modal: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // paddingHorizontal: 20,
    paddingBottom: 100,
    maxHeight: screenHeight * 0.63,
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    paddingHorizontal: 20,
    fontSize: 14,
    color: colors.lightGray,
  },
  contentWrapper: {
    padding: 20,
  },

  // Error
  errorMessage: {
    color: colors.secondary,
    fontWeight: '500',
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
    paddingBottom: 12,
    backgroundColor: 'rgba(237, 56, 103, 0.1)',
    borderRadius: 8,
    overflow: 'hidden',
  },

  // Success
  successWrapper: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  checkIcon: {},
  successTitleRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: 26,
    // marginBottom: 10,
    paddingHorizontal: 0,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  successSubtitle: {
    paddingHorizontal: 20,
    fontSize: 14,
    color: colors.lightGray,
    textAlign: 'center',
    marginTop: 5,
  },

  // Sign up
  signUpText: {
    fontSize: 16,
    color: colors.black,
  },
  signUpButton: {
    marginTop: -10,
  },
  signUpButtonTitle: {
    color: colors.secondary,
    fontWeight: '500',
    fontSize: 16,
  },
});
