import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  Image,
  AppState,
} from 'react-native';
import { Button } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Portal } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import ActionButton from './../components/buttons/ActionButton';
import LorylistIcon from './../components/LorylistIcon';

import {
  check,
  PERMISSIONS,
  RESULTS,
  checkNotifications,
} from 'react-native-permissions';

// Assets
import colors from './../assets/styles/colors.js';

// Redux and Hooks
import { useSelector, useDispatch } from 'react-redux';
import { helpOperations, helpSelectors } from './../state/ducks/help';
import { productOperations } from './../state/ducks/product';

const SCREEN_SIZES = Dimensions.get('window');

const IntroView = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const slider = useRef();
  const [activeSlide, setActiveSlide] = useState(0);

  Animatable.initializeRegistryWithDefinitions({
    hovering: {
      // Combined slideInDown & slideInLeft
      from: { translateY: -20 },
      to: { translateY: 0 },
    },
  });

  const [isCameraPermission, setCameraPermission] = useState(false);
  const [isCameraPermissionBlocked, setCameraPermissionBlocked] = useState(
    false,
  );
  const [isLocationPermission, setLocationPermission] = useState(false);
  const [isLocationPermissionBlocked, setLocationPermissionBlocked] = useState(
    false,
  );
  const [isNotificationsPermission, setNotificationsPermission] = useState(
    false,
  );
  const [
    isNotificationsPermissionBlocked,
    setNotificationsPermissionBlocked,
  ] = useState(false);

  const checkPermissions = () => {
    // Camera
    check(PERMISSIONS.IOS.CAMERA).then(result => {
      setCameraPermission(result == RESULTS.GRANTED);
      setCameraPermissionBlocked(result == RESULTS.BLOCKED);
    });
    check(PERMISSIONS.ANDROID.CAMERA).then(result => {
      setCameraPermission(result == RESULTS.GRANTED);
      setCameraPermissionBlocked(result == RESULTS.BLOCKED);
    });

    // Location
    check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
      setLocationPermission(result == RESULTS.GRANTED);
      setLocationPermissionBlocked(result == RESULTS.BLOCKED);
    });
    check(PERMISSIONS.ANDROID.LOCATION_WHEN_IN_USE).then(result => {
      setLocationPermission(result == RESULTS.GRANTED);
      setLocationPermissionBlocked(result == RESULTS.BLOCKED);
    });

    // Notifications
    checkNotifications().then(({ status, settings }) => {
      setNotificationsPermission(status == RESULTS.GRANTED);
      setNotificationsPermissionBlocked(status == RESULTS.BLOCKED);
    });
  };

  useEffect(checkPermissions, []);
  AppState.addEventListener('change', checkPermissions);

  const slides = [
    {
      isStandalone: true,
      backgroundColor: '#E8F5CC',
      image: require('./../assets/images/in-app-logo.png'),
      imageSize: {
        width: 113,
        height: 30,
      },
      title: 'Erste Schritte',
      subtitle: 'in deiner veganen Shoppingwelt.',
      text:
        'Erlebe die bunte Welt veganer Produkte nur einen Fingerschnips weit entfernt in deiner Hosentasche.',
      startButton: true,
    },
    {
      backgroundColor: '#FFF6E6',
      image: require('./../assets/images/intro/search-online-shops.png'),
      imageSize: {
        width: 285,
        height: 256,
      },
      title: 'Suche',
      subtitle: 'in bekannten Online-Shops.',
      text:
        'Finde und kaufe in bekannten Online-Shops in einer einzigen App. Wir machen dir das Shoppen von veganen Produkten einfach.',
    },
    {
      backgroundColor: '#FCE4EA',
      image: require('./../assets/images/intro/favorite-list.png'),
      imageSize: {
        width: 274,
        height: 187,
      },
      title: 'Merkliste',
      subtitle: 'für alles, was dir gefällt.',
      text:
        'Merke dir interessante Produkte für den späteren Vergleich oder Kauf.',
    },
    {
      backgroundColor: '#E8F5CC',
      image: require('./../assets/images/intro/user-profile-intro.png'),
      imageSize: {
        width: 274,
        height: 217,
      },
      title: 'Datenschutz und Feedback',
      subtitle: 'Damit du die Kontrolle behältst.',
      text:
        'Bestimme selbst, welche Infos gespeichert werden sollen oder gib uns Feedback zu Dingen, welche wir besser machen können.',
    },
    // {
    //   backgroundColor: '#FCE4EA',
    //   image: require('./../assets/images/intro/shopping-lists.png'),
    //   imageSize: {
    //     width: 189,
    //     height: 205,
    //   },
    //   title: 'Einkaufslisten',
    //   subtitle: 'privat oder gemeinsam nutzen.',
    //   text:
    //     'Bereite deinen Einkauf mit der Einkaufsliste vor, damit du nie wieder was vergisst. Du kannst deine Einkaufsliste auch mit mehreren Leuten teilen.',
    // },
    // {
    //   backgroundColor: '#E3E2EA',
    //   image: require('./../assets/images/intro/scanner.png'),
    //   imageSize: {
    //     width: 189,
    //     height: 187,
    //   },
    //   title: 'Scanner',
    //   subtitle: '- smoother geht’s nicht.',
    //   text:
    //     'Prüfe direkt im Supermarkt, ob ein Produkt zu dir passt, indem du es einfach den Barcode mit der Kamera erfasst.',

    //   // Action button
    //   actionTitle: !isCameraPermissionBlocked
    //     ? 'Kamera aktivieren'
    //     : 'Einstellungen öffnen',
    //   action: () => {
    //     request(PERMISSIONS.IOS.CAMERA).then(result => {
    //       setCameraPermission(result == RESULTS.GRANTED);
    //       setCameraPermissionBlocked(result == RESULTS.BLOCKED);
    //     });

    //     request(PERMISSIONS.ANDROID.CAMERA).then(result => {
    //       setCameraPermission(result == RESULTS.GRANTED);
    //       setCameraPermissionBlocked(result == RESULTS.BLOCKED);
    //     });

    //     if (!isCameraPermission && isCameraPermissionBlocked) {
    //       openSettings().catch(() => console.warn('cannot open settings'));
    //     }
    //   },
    //   actionSuccessText: 'Perfekt, der Scanner steht bereit!',
    //   isActionSuccess: isCameraPermission,
    // },
    // {
    //   backgroundColor: '#FFF6E6',
    //   image: require('./../assets/images/intro/shops.png'),
    //   imageSize: {
    //     width: 195,
    //     height: 197,
    //   },
    //   title: 'Märkte',
    //   subtitle: 'in deiner Nähe entdecken.',
    //   text:
    //     'Wir haben bereits über 35.000 Märkte für dich in der App verfügbar. Speichere dir deine Favoriten unter „Meine Märkte“.',

    //   // Action button
    //   actionTitle: !isLocationPermissionBlocked
    //     ? 'Standort verwenden'
    //     : 'Einstellungen öffnen',
    //   action: () => {
    //     request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
    //       setLocationPermission(result == RESULTS.GRANTED);
    //       setLocationPermissionBlocked(result == RESULTS.BLOCKED);
    //     });

    //     request(PERMISSIONS.ANDROID.LOCATION_WHEN_IN_USE).then(result => {
    //       setLocationPermission(result == RESULTS.GRANTED);
    //       setLocationPermissionBlocked(result == RESULTS.BLOCKED);
    //     });

    //     if (!isLocationPermission && isLocationPermissionBlocked) {
    //       openSettings().catch(() => console.warn('cannot open settings'));
    //     }
    //   },
    //   actionSuccessText: 'Yeah! Wir können dir Märkte in der Nähe zeigen.',
    //   isActionSuccess: isLocationPermission,
    // },
    // {
    //   backgroundColor: '#E8F5CC',
    //   image: require('./../assets/images/intro/vegan-score.png'),
    //   imageSize: {
    //     width: 189,
    //     height: 187,
    //   },
    //   titleImage: require('./../assets/images/intro/vegan-score-examples.png'),
    //   title: 'Vegan-Score',
    //   subtitle: 'von Euch und Herstellern verifiziert.',
    //   text:
    //     'Gemeinsam mit Euch und Herstellern können wir alle Produkte klassifizieren.',
    // },
    // {
    //   backgroundColor: '#E9EAEE',
    //   image: require('./../assets/images/intro/notifications.png'),
    //   imageSize: {
    //     width: 310,
    //     height: 240,
    //   },
    //   title: 'Mitteilungen aktivieren',
    //   subtitle: 'Bleibe stets informiert.',
    //   text:
    //     'Wir informieren dich über den Status deiner Bestellungen und schlagen dir interessante Produkte vor, welche zu dir passen.',
    //   subinfo:
    //     'Solltest du die App nicht regelmäßig nutzen, so erhältst du nahezu keine Mitteilungen.',

    //   // Action button
    //   actionTitle: !isNotificationsPermissionBlocked
    //     ? 'Aktivieren'
    //     : 'Einstellungen öffnen',
    //   action: () => {
    //     requestNotifications(['alert', 'badge', 'sound']).then(
    //       ({status, settings}) => {
    //         setNotificationsPermission(status == RESULTS.GRANTED);
    //         setNotificationsPermissionBlocked(status == RESULTS.BLOCKED);
    //       },
    //     );

    //     if (!isNotificationsPermission && isNotificationsPermissionBlocked) {
    //       openSettings().catch(() => console.warn('cannot open settings'));
    //     }
    //   },
    //   actionSuccessText: 'Du bist starklar!',
    //   isActionSuccess: isNotificationsPermission,
    // },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={[
          s.item,
          {
            backgroundColor: item.backgroundColor,
          },
        ]}>
        <View
          style={[
            s.textContainer,
            !item.image || item.isStandalone ? s.standaloneContainer : {},
          ]}>
          {item.titleImage && (
            <Image style={s.titleImage} source={item.titleImage} />
          )}
          <Text style={s.title}>{item.title}</Text>
          <Text style={s.subtitle}>{item.subtitle}</Text>
          <Text style={s.text}>{item.text}</Text>

          {/* Start button */}
          {item.startButton && (
            <Button
              title="Starten"
              containerStyle={[s.nextButtonContainer, { marginTop: 20 }]}
              buttonStyle={s.nextButton}
              titleStyle={s.nextButtonTitle}
              onPress={() => {
                if (slider.current) {
                  slider.current.snapToNext();
                }
              }}
            />
          )}

          {/* Action */}
          {item.action && !item.isActionSuccess && (
            <ActionButton
              style={s.actionButton}
              title={item.actionTitle}
              onPress={item.action}
            />
          )}
          {item.action && item.isActionSuccess && (
            <View style={s.actionContainer}>
              <LorylistIcon
                name="small-check"
                size={14}
                style={s.actionSuccessIcon}
              />
              <Text style={s.actionSuccessText}>{item.actionSuccessText}</Text>
            </View>
          )}

          {/* Subinfo */}
          {typeof item.subinfo === 'string' && (
            <Text style={s.subinfo}>{item.subinfo}</Text>
          )}
        </View>
        <View style={s.imageContainer}>
          {item.image && (
            <Animatable.Image
              width={item.imageSize.width}
              height={item.imageSize.height}
              source={item.image}
              animation="hovering"
              iterationCount={'infinite'}
              direction="alternate"
              duration={1500}
            />
          )}
        </View>
      </View>
    );
  };

  // Beta
  const [showBeta, setShowBeta] = useState(false);


  return (
    <Portal>
      {showBeta && (
        <ScrollView style={s.betaContainer} vertical={true}>
          <Text style={s.betaTitle}>Hallo lieber Beta-Tester,</Text>
          <Text style={s.betaText}>
            endlich darfst du die neue lorylist vorab ausprobieren.
          </Text>
          <Text style={s.betaText}>
            In dieser Beta-Version haben wir extra für dich ganz geheime
            Funktionen (böse Zungen sagen "Fehler") eingebaut, die selbst wir
            nicht kennen, so geheim sind die. Falls du diese findest, kannst du
            uns über deine Entdeckung sehr gerne berichten. Dazu tippe einfach
            auf der Startseite oben rechts auf "Benutzer" --&gt; "Einstellungen"
            --&gt; "Feedback" und schreibe uns so oft du magst dein Feedback, gerne
            inkl. Screenshot.
          </Text>
          <Text style={s.betaText}>
            Falls dir wichtige Funktionen fehlen oder du Ideen mit uns teilen
            möchtest, kannst du das ebenfalls über das Feedback-Formular tun.
            Erwartest du eine Antwort auf eine Frage, solltest du uns deinen
            Namen und eine Kontaktmöglichkeit dazu schreiben. Roschan wird sich
            dann bei dir melden.
          </Text>
          <Text style={s.betaText}>
            Kleiner Tipp: Lege dir einen Account an und teile eine Einkaufsliste
            mit deinem Partner.
          </Text>

          <ActionButton
            title="Okay"
            style={s.betaButton}
            color="primary"
            onPress={() => setShowBeta(false)}
          />
        </ScrollView>
      )}

      {!showBeta && (
        <View style={s.container}>
          {/* Beta testers */}

          <Carousel
            ref={slider}
            data={slides}
            renderItem={renderItem}
            sliderWidth={SCREEN_SIZES.width}
            sliderHeight={SCREEN_SIZES.height}
            itemWidth={SCREEN_SIZES.width}
            itemHeight={SCREEN_SIZES.height}
            onSnapToItem={index => {
              setActiveSlide(index)
            }}
          />

          <View style={s.bottomControl}>
            {activeSlide < slides.length - 1 && (
              <Button
                title="Überspringen"
                containerStyle={s.skipButtonContainer}
                buttonStyle={s.skipButton}
                titleStyle={s.skipButtonTitle}
                onPress={() => {
                  dispatch(helpOperations.doSkipIntro());
                  dispatch(productOperations.doFetchHome());
                }}
              />
            )}

            {activeSlide === slides.length - 1 && (
              <View style={s.skipPlaceholder} />
            )}

            <Pagination
              dotsLength={slides.length}
              activeDotIndex={activeSlide}
              containerStyle={s.pagination}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: colors.primary,
              }}
              inactiveDotStyle={
                {
                  // Define styles for inactive dots here
                }
              }
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />

            {activeSlide < slides.length - 1 && (
              <Button
                title="Weiter"
                containerStyle={s.nextButtonContainer}
                buttonStyle={s.nextButton}
                titleStyle={s.nextButtonTitle}
                onPress={() => {
                  if (slider.current) {
                    slider.current.snapToNext();
                  }
                }}
              />
            )}

            {activeSlide === slides.length - 1 && (
              <Button
                title="Los geht's"
                containerStyle={s.finishButtonContainer}
                buttonStyle={s.finishButton}
                titleStyle={s.finishButtonTitle}
                onPress={() => {
                  dispatch(helpOperations.doDoneIntro());
                  dispatch(productOperations.doFetchHome());
                }}
              />
            )}
          </View>
        </View>
      )}
    </Portal>
  );
};

export default IntroView;

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  // Bottom control
  bottomControl: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },

  // Pagination
  pagination: {
    backgroundColor: colors.white,
    // width: SCREEN_SIZES.width - 240,
    width: 40,
  },

  // Skip button
  skipPlaceholder: {
    width: 100,
  },
  skipButtonContainer: {
    marginTop: 15,
    width: 100,
  },
  skipButton: {
    backgroundColor: colors.lightBackground,
    height: 34,
    borderRadius: 17,
  },
  skipButtonTitle: {
    fontFamily: 'CircularStd-Bold',
    fontSize: 12,
    color: colors.gray,
  },

  // Next button
  nextButtonContainer: {
    width: 100,
    marginTop: 12,
  },
  nextButton: {
    backgroundColor: colors.primary,
    height: 44,
    borderRadius: 22,
  },
  nextButtonTitle: {
    fontFamily: 'CircularStd-Bold',
    fontSize: 14,
  },

  // Finish button
  finishButtonContainer: {
    width: 100,
    marginTop: 12,
  },
  finishButton: {
    backgroundColor: colors.primary,
    height: 44,
    borderRadius: 22,
  },
  finishButtonTitle: {
    fontFamily: 'CircularStd-Bold',
    fontSize: 14,
  },

  // Item
  item: {
    flexDirection: 'column-reverse',
    flex: 1,
  },
  imageContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {},
  textContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 64,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  standaloneContainer: {
    height: '70%',
  },
  titleImage: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontFamily: 'CircularStd-Bold',
    color: colors.black,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'CircularStd-Book',
    color: colors.black,
  },
  text: {
    marginTop: 30,
    fontSize: 15,
    fontFamily: 'CircularStd-Book',
    color: colors.gray,
  },
  subinfo: {
    marginTop: 60,
    marginBottom: -60,
    fontSize: 12,
    fontFamily: 'CircularStd-Book',
    color: colors.gray,
  },

  // Action
  actionButton: {
    marginTop: 20,
    marginBottom: 10,
  },
  actionContainer: {
    marginBottom: -30,
    marginTop: 40,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  actionSuccessIcon: {
    marginRight: 5,
    marginTop: 5,
    color: colors.success,
  },
  actionSuccessText: {
    textAlign: 'center',
    fontFamily: 'CircularStd-Medium',
    fontSize: 14,
    color: colors.success,
  },

  // Beta
  betaContainer: {
    paddingHorizontal: 40,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,

    backgroundColor: colors.white,
    zIndex: 99,
  },
  betaTitle: {
    marginTop: 70,
    fontFamily: 'CircularStd-Book',
    color: colors.black,
    fontSize: 20,
    marginBottom: 10,
  },
  betaText: {
    fontFamily: 'CircularStd-Book',
    color: colors.black,
    fontSize: 16,
    marginTop: 15,
  },
  betaButton: {
    marginTop: 30,
    marginBottom: 40,
  },
});
