import React, {useState} from 'react';

// Components
import TextInput from './../form/TextInput';
import ActionButton from './../buttons/ActionButton';
import ListDivider from './../content/ListDivider';
import CheckBox from './../form/CheckBox';

// Assets
import LorylistIcon from './../LorylistIcon';
import colors from '../../assets/styles/colors';

// Dependencies
import {View, Text, StyleSheet, Dimensions, Image, Linking} from 'react-native';
import {Button as ElementsButton} from 'react-native-elements';
import {Modalize} from 'react-native-modalize';

// Redux
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {userOperations} from '../../state/ducks/user';

const screenHeight = Dimensions.get('window').height;

/**
 * Loader
 */
const useDataLoader = () => {
  const {
    // User
    isLoadingSignUp,
    isConfirmSignUp,
    isSuccessSignUp,
    signUpError,
    user,
  } = useSelector(state => state.user, shallowEqual);

  return {
    isLoadingSignUp,
    isConfirmSignUp,
    isSuccessSignUp,
    signUpError,
    user,
  };
};

const SignUpPopup = ({onClosed, reference, signInReference, onSuccess}) => {
  const dispatch = useDispatch();

  const {
    user,
    isLoadingSignUp,
    isConfirmSignUp,
    isSuccessSignUp,
    signUpError,
  } = useDataLoader();

  const [isTermsOfService, setTermsOfService] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [type, setType] = useState('default');

  return (
    <Modalize
      ref={reference}
      // modalStyle={[styles.modal]}
      adjustToContentHeight={true}
      modalStyle={[styles.modal]}
      scrollViewProps={{showsVerticalScrollIndicator: false}}
      onOpen={() => {
        dispatch(userOperations.doResetSignUp());
      }}
      HeaderComponent={
        isSuccessSignUp === false &&
        isConfirmSignUp === false && (
          <View style={{paddingBottom: 10}}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>Kostenlos registrieren</Text>

              <ElementsButton
                icon={<LorylistIcon name={'times'} size={12} color={'black'} />}
                iconContainerStyle={{marginLeft: 10}}
                buttonStyle={styles.bCloseButton}
                onPress={onClosed}
              />
            </View>
            <Text style={styles.subtitle}>
              Wir freuen uns dich als Nutzer begrüßen zu dürfen!
            </Text>
          </View>
        )
      }
      children={
        <View>
          {isSuccessSignUp === false && (
            <View>
              <View style={styles.contentWrapper}>
                {signUpError.length > 0 && (
                  <Text style={styles.errorMessage}>{signUpError}</Text>
                )}

                {type === 'default' && (
                  <View>
                    <TextInput
                      label="Benutzername"
                      helpText="z.B. „Max M“ oder „ApfelLover“ - sei kreativ!"
                      required={true}
                      onChangeText={text => setUsername(text)}
                      autoCompleteType={'username'}
                    />

                    <TextInput
                      label="E-Mail-Adresse"
                      required={true}
                      containerStyle={{marginTop: 10}}
                      onChangeText={text => setEmail(text)}
                      autoCompleteType={'email'}
                    />

                    <TextInput
                      label="Passwort"
                      password={true}
                      required={true}
                      autoCompleteType={'password'}
                      secureTextEntry={true}
                      onChangeText={text => setPassword(text)}
                      containerStyle={{marginTop: 10}}
                    />

                    <CheckBox
                      state={isTermsOfService}
                      onPress={() => {
                        setTermsOfService(!isTermsOfService);
                      }}
                      label="Ich stimme den Allg. Geschäftsbedingungen zu."
                    />

                    <ActionButton
                      title="Jetzt registrieren"
                      style={{flex: 0, marginBottom: 10}}
                      color="secondary"
                      loading={isLoadingSignUp}
                      disabled={
                        !isTermsOfService ||
                        username.length === 0 ||
                        email.length === 0 ||
                        password.length === 0
                      }
                      onPress={() => {
                        dispatch(
                          userOperations.doSignUp(username, email, password),
                        );
                      }}
                    />

                    {/* <ElementsButton
                                title="Zurück"
                                type="clear"
                                onPress={() => {
                                    setType(null)
                                }}
                                buttonStyle={styles.cancelButton}
                                titleStyle={styles.cancelButtonTitle}
                            /> */}
                  </View>
                )}

                <ElementsButton
                  title="Allgemeine Geschäftsbedingungen lesen"
                  type="clear"
                  onPress={() => {
                    Linking.openURL(
                      'https://lorylist.com/allgemeine-geschaeftsbedingungen/nutzer',
                    );
                  }}
                  buttonStyle={styles.dataProtectionButton}
                  titleStyle={styles.dataProtectionButtonTitle}
                />

                <ElementsButton
                  title="Datenschutzerklärung lesen"
                  type="clear"
                  onPress={() => {
                    Linking.openURL('https://lorylist.com/datenschutz');
                  }}
                  buttonStyle={styles.dataProtectionButton}
                  titleStyle={styles.dataProtectionButtonTitle}
                />

                <ListDivider simple={true} style={{marginTop: 20}} />

                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.signUpText}>Du bist bereits Nutzer?</Text>

                  <ElementsButton
                    title="Jetzt einloggen"
                    type="clear"
                    buttonStyle={styles.signUpButton}
                    titleStyle={styles.signUpButtonTitle}
                    onPress={() => {
                      dispatch(userOperations.doOpenSignIn(true));
                      reference.current.close();
                      signInReference.current.open();
                    }}
                  />
                </View>
              </View>
            </View>
          )}

          {isConfirmSignUp === true && (
            <View>
              <View style={styles.titleRow}>
                <Text style={styles.title}>Fast geschafft!</Text>

                <ElementsButton
                  icon={
                    <LorylistIcon name={'times'} size={12} color={'black'} />
                  }
                  iconContainerStyle={{marginLeft: 10}}
                  buttonStyle={styles.bCloseButton}
                  onPress={onClosed}
                />
              </View>
              <Text style={styles.subtitle}>
                Bitte gib den Bestätigungscode ein, welchen wir dir per E-Mail
                zugesendet haben.
              </Text>

              <View style={styles.contentWrapper}>
                <TextInput
                  label="Bestätigungscode"
                  helpText={
                    'Du hast diesen per E-Mail an ' + email + ' erhalten.'
                  }
                  required={true}
                  onChangeText={text => setCode(text)}
                  autoCompleteType={'tel'}
                />

                <ActionButton
                  title="Bestätigen"
                  style={{flex: 0, marginTop: 10, marginBottom: 10}}
                  color="secondary"
                  loading={isLoadingSignUp}
                  disabled={code.length === 0}
                  onPress={() => {
                    dispatch(
                      userOperations.doConfirmSignUp(
                        username,
                        email,
                        password,
                        code,
                      ),
                    );
                  }}
                />
              </View>
            </View>
          )}

          {isSuccessSignUp === true && user.name && (
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
                  Willkommen {user.name.split(' ')[0]}!
                </Text>
                <Text style={styles.successSubtitle}>
                  Wir freuen dich in unserer Community begrüßen zu drüfen.
                  Gemeinsam möchten wir mit lorylist eine Plattform schaffen, um
                  die Vielfalt der veganen Lebensmittel für jeden zugänglich zu
                  machen.
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
export default SignUpPopup;

const styles = StyleSheet.create({
  modal: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // paddingHorizontal: 20,
    paddingBottom: 100,
    maxHeight: screenHeight * 0.8,
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
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  successSubtitle: {
    paddingHorizontal: 20,
    marginTop: 10,
    fontSize: 15,
    color: colors.lightGray,
    textAlign: 'center',
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

  // Data protection
  dataProtectionButton: {
    marginTop: 10,
  },
  dataProtectionButtonTitle: {
    fontSize: 14,
    color: colors.secondary,
  },

  // Type button
  typeButton: {
    marginTop: 10,
  },
  typeButtonFacebook: {
    backgroundColor: '#3b5998',
  },
  typeButtonGoogle: {
    backgroundColor: '#ea4335',
  },
  typeButtonApple: {
    backgroundColor: '#020202',
  },

  // Cancel button
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonTitle: {
    fontSize: 14,
    color: colors.gray,
  },
});
