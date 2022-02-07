import React, { useState } from 'react';

// Components
import TextInput from './../form/TextInput'
import ActionButton from './../buttons/ActionButton'
import ListDivider from './../content/ListDivider'

// Assets
import LorylistIcon from './../LorylistIcon';
import colors from '../../assets/styles/colors';

// Dependencies
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { Button as ElementsButton } from 'react-native-elements';
import { Modalize } from 'react-native-modalize';

// Redux
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { userOperations } from '../../state/ducks/user';

const screenHeight = Dimensions.get('window').height;

/**
 * Loader
 */
const useDataLoader = () => {
    const dispatch = useDispatch();

    const {
        // User
        isLoadingForgotPassword,
        isConfirmForgotPassword,
        isSuccessForgotPassword,
        forgotPasswordError,
    } = useSelector(state => state.user, shallowEqual);

    return {
        isLoadingForgotPassword,
        isConfirmForgotPassword,
        isSuccessForgotPassword,
        forgotPasswordError,
    };
};

const ForgotPasswordPopup = ({
    onClosed,
    reference,
    signInReference,
    onSuccess,
}) => {
    const dispatch = useDispatch();

    const {
        isLoadingForgotPassword,
        isConfirmForgotPassword,
        isSuccessForgotPassword,
        forgotPasswordError,
    } = useDataLoader();

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Modalize
            ref={reference}
            modalStyle={[styles.modal]}
            adjustToContentHeight={true}
            onOpen={() => {
                dispatch(userOperations.doResetForgotPassword())
            }}
        >
            {isSuccessForgotPassword === false && isConfirmForgotPassword === false && (
                <View>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>Passwort vergessen</Text>

                        <ElementsButton
                            icon={<LorylistIcon name={'times'} size={12} color={'black'} />}
                            iconContainerStyle={{ marginLeft: 10 }}
                            buttonStyle={styles.bCloseButton}
                            onPress={onClosed}
                        />
                    </View>
                    <Text style={styles.subtitle}>Bitte gib deine E-Mail-Adresse ein. Wir senden dir anschließend einen Bestätigungscode zu, mit welchem du im nächsten Schritt dein Passwort zurücksetzen kannst.</Text>

                    <View style={styles.contentWrapper}>
                        {forgotPasswordError.length > 0 && <Text style={styles.errorMessage}>{forgotPasswordError}</Text>}

                        <TextInput
                            label='E-Mail-Adresse'
                            onChangeText={(text) => setEmail(text)}
                            autoCompleteType={'email'}
                        />

                        <ActionButton
                            title="Passwort zurücksetzen"
                            style={{ marginTop: 20, flex: 0 }}
                            color='secondary'
                            loading={isLoadingForgotPassword}
                            disabled={email.length === 0}

                            onPress={() => dispatch(userOperations.doForgotPassword(email))}
                        />

                        <ListDivider simple={true} />

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.signInText}>Du kennst dein Passwort?</Text>

                            <ElementsButton
                                title="Jetzt einloggen"
                                type="clear"
                                buttonStyle={styles.signInButton}
                                titleStyle={styles.signInButtonTitle}

                                onPress={() => {
                                    reference.current.close()
                                    signInReference.current.open()
                                }}
                            />
                        </View>
                    </View>
                </View>
            )}

            {isSuccessForgotPassword === false && isConfirmForgotPassword === true && (
                <View>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>Neues Passwort</Text>

                        <ElementsButton
                            icon={<LorylistIcon name={'times'} size={12} color={'black'} />}
                            iconContainerStyle={{ marginLeft: 10 }}
                            buttonStyle={styles.bCloseButton}
                            onPress={onClosed}
                        />
                    </View>
                    <Text style={styles.subtitle}>Bitte gib den Bestätigungscode und dein neues Passwort ein.</Text>

                    <View style={styles.contentWrapper}>
                        {forgotPasswordError.length > 0 && <Text style={styles.errorMessage}>{forgotPasswordError}</Text>}

                        <TextInput
                            label='Bestätigungscode'
                            onChangeText={(text) => setCode(text)}
                            autoCompleteType={'tel'}
                        />

                        <TextInput
                            label='Neues Passwort'
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            autoCompleteType={'password'}
                            containerStyle={{ marginTop: 10 }}
                        />

                        <ActionButton
                            title="Passwort ändern"
                            style={{ marginTop: 20, flex: 0 }}
                            color='secondary'
                            loading={isLoadingForgotPassword}
                            disabled={email.length === 0}

                            onPress={() => dispatch(userOperations.doConfirmForgotPassword(email, code, password))}
                        />

                        <ListDivider simple={true} />

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.signInText}>Du kennst dein Passwort?</Text>

                            <ElementsButton
                                title="Jetzt einloggen"
                                type="clear"
                                buttonStyle={styles.signInButton}
                                titleStyle={styles.signInButtonTitle}

                                onPress={() => {
                                    reference.current.close()
                                    signInReference.current.open()
                                }}
                            />
                        </View>
                    </View>
                </View>
            )}

            {isSuccessForgotPassword === true && (
                <View style={styles.successWrapper}>
                    <View style={styles.successTitleRow}>
                        <ElementsButton
                            icon={<LorylistIcon name={'times'} size={12} color={'black'} />}
                            iconContainerStyle={{ marginLeft: 10 }}
                            buttonStyle={styles.bCloseButton}
                            onPress={onClosed}
                        />
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <Image style={styles.checkIcon} source={require('./../../assets/images/big-success-check.png')} />

                        <Text style={styles.successTitle}>Dein Passwort wurde zurückgesetzt!</Text>
                        <Text style={styles.successSubtitle}>Bitte überprüfe dein E-Mail-Postfach.</Text>
                    </View>

                    <ActionButton
                        title="OK"
                        style={{ marginTop: 30, flex: 0 }}
                        color='secondary'

                        onPress={() => {
                            onClosed()

                            if (onSuccess !== undefined) {
                                onSuccess()
                            }
                        }}
                    />
                </View>
            )}
        </Modalize>
    );
};
export default ForgotPasswordPopup;

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
        fontWeight: 'bold'
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
    checkIcon: {

    },
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
        marginTop: 10,
        textAlign: 'center',
    },

    // Sign up
    signInText: {
        fontSize: 16,
        color: colors.black,
    },
    signInButton: {
        marginTop: -10
    },
    signInButtonTitle: {
        color: colors.secondary,
        fontWeight: '500',
        fontSize: 16,
    },
});
