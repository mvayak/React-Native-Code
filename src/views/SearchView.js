import React, {useState, useEffect, useRef, useCallback} from 'react';
import {StyleSheet, View, Animated, Platform, Dimensions} from 'react-native';

// Components
import IntroView from './IntroView.js';
import {SafeAreaView} from 'react-native-safe-area-context';

import SignInPopup from './../components/modals/SignInPopup.js';
import ForgotPasswordPopup from './../components/modals/ForgotPasswordPopup.js';
import SignUpPopup from './../components/modals/SignUpPopup.js';
// import UserMenu from './../components/modals/UserMenu.js';
import ErrorAlert from './../components/content/ErrorAlert';
import LastSeen from './../components/content/LastSeen';
import _ from 'lodash';

// Assets
import {useDispatch, useSelector} from 'react-redux';
import {productOperations} from '../state/ducks/product';
import {helpOperations} from './../state/ducks/help';
import {helpSelectors} from './../state/ducks/help';
import {userOperations} from './../state/ducks/user';
import SearchInput from '../components/form/SearchInput.js';
import colors from '../assets/styles/colors.js';
import HomeSectionList from '../components/content/HomeSectionList.js';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const SearchView = ({route, navigation}) => {
  const dispatch = useDispatch();

  // Redux data
  const {
    product: {
      // Home
      isHomeLoading,
      homeCollections,
      homeTotal,
      homeError: error,
    },
    help: helpState,
  } = useSelector(state => state);
  const showIntro = useSelector(state => helpSelectors.showIntro(state));

  const homeLoadMore = () => {
    // Prevent when completely loaded
    if (homeCollections.length > 0 && homeCollections.length >= homeTotal) {
      return;
    }

    dispatch(productOperations.doFetchHome(true));
  };

  useEffect(() => {
    hideLastSeen();
    dispatch(productOperations.doFetchHome());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Home logic
  const signInModal = useRef(null);
  const forgotPasswordModal = useRef(null);
  const signUpModal = useRef(null);
  // const userMenuModal = useRef(null);

  const refresh = () => {
    hideLastSeen();
    dispatch(productOperations.doFetchHome());
  };

  /**
   * Home header
   */
  const homeFlatList = useRef(null);
  const headerLogoHeight = 44 + 10;
  const statusBarHeight = Platform.select({ios: 45, android: 0});
  const scrollAnim = new Animated.Value(0);
  const offsetAnim = new Animated.Value(0);
  const [lastSeenAnimation] = useState(new Animated.Value(0));

  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      offsetAnim,
    ),
    0,
    headerLogoHeight - statusBarHeight,
  );

  const navbarTranslate = clampedScroll.interpolate({
    inputRange: [0, headerLogoHeight - statusBarHeight],
    outputRange: [0, -(headerLogoHeight - statusBarHeight)],
    extrapolate: 'clamp',
  });

  const refreshLabelOpacity = scrollAnim.interpolate({
    inputRange: [-60, -20, 0, 1],
    outputRange: [1, 0, 0, 0],
    extrapolate: 'clamp',
  });

  const refreshChevronRotation = scrollAnim.interpolate({
    inputRange: [-120, -40, 0, 1],
    outputRange: [40, 0, 0, 0],
    extrapolate: 'clamp',
  });

  const navbarOpacity = clampedScroll.interpolate({
    inputRange: [0, headerLogoHeight - statusBarHeight],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const showLastSeen = () => {
    Animated.timing(lastSeenAnimation, {
      toValue: 1,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };

  const hideLastSeen = () => {
    Animated.timing(lastSeenAnimation, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };

  const HomeHeader = () => (
    <Animated.View
      style={[
        s.header,
        {
          transform: [{translateY: navbarTranslate}],
          opacity: navbarOpacity,
        },
      ]}>
      <SearchInput
        placeholder="lorylist durchsuchen"
        onSubmit={value => {
          navigation.navigate('SearchResultView', {
            query: value,
            resultBy: 'search',
          });

          hideLastSeen();
        }}
        onSearching={state => {
          state === true ? showLastSeen() : hideLastSeen();
        }}
      />
    </Animated.View>
  );

  return (
    <SafeAreaView style={s.container} edges={['right', 'left', 'top']}>
      {/* Intro view */}
      {showIntro && <IntroView />}

      <View style={s.contentWrapper}>
        <HomeSectionList
          ref={homeFlatList}
          isLoading={isHomeLoading}
          header={HomeHeader}
          data={homeCollections}
          loadMore={homeLoadMore}
          refresh={refresh}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollAnim}}}],
            {useNativeDriver: true},
          )}
          refreshLabelOpacity={refreshLabelOpacity}
          refreshChevronRotation={refreshChevronRotation}
        />
        {/* Last seen */}
        <Animated.View
          style={[
            s.lastSeenContainer,
            {
              transform: [
                {
                  translateY: lastSeenAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [SCREEN_HEIGHT, 0],
                  }),
                },
              ],
              opacity: lastSeenAnimation,
            },
          ]}>
          <LastSeen navigation={navigation} />
        </Animated.View>

        {/* Erorr */}
        {error && (
          <ErrorAlert
            containerStyle={{marginTop: 20}}
            title="Fehler beim Aktualisieren"
            info="Beim Laden der Startseite ist ein Fehler aufgetreten. Bitte überprüfe deine Internetverbindung und versuche es später erneut."
            onPressAgain={() => {
              refresh();
            }}
          />
        )}
      </View>
      <SignInPopup
        reference={signInModal}
        signUpReference={signUpModal}
        forgotPasswordReference={forgotPasswordModal}
        onClosed={() => {
          dispatch(userOperations.doOpenSignIn(false));
          signInModal.current.close();
        }}
      />
      <ForgotPasswordPopup
        reference={forgotPasswordModal}
        signInReference={signInModal}
        onClosed={() => {
          forgotPasswordModal.current.close();
        }}
      />
      <SignUpPopup
        reference={signUpModal}
        signInReference={signInModal}
        onClosed={() => {
          dispatch(userOperations.doOpenSignUp(false));
          signUpModal.current.close();
        }}
      />
      {/* <UserMenu reference={userMenuModal} /> */}
    </SafeAreaView>
  );
};

export default SearchView;

const s = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.white,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  contentWrapper: {
    flex: 1,
  },

  // Header
  header: {
    backgroundColor: colors.white,
    flexDirection: 'column',
    paddingHorizontal: 10,
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 10,
  },

  // Last seen
  lastSeenContainer: {
    position: 'absolute',
    top: 49,
    backgroundColor: colors.white,
    bottom: -34,
    left: 0,
    right: 0,
  },
});
