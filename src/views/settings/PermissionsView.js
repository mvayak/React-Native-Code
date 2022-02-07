import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  AppState,
} from 'react-native';
import {Input, Image, Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';

// Components
import ActionButton from './../../components/buttons/ActionButton';
import LorylistIcon from './../../components/LorylistIcon';
import SwitchItem from './../../components/items/SwitchItem';
import ListDivider from './../../components/content/ListDivider';

// Assets
import colors from './../../assets/styles/colors.js';

// Redux
import {useSelector, useDispatch, shallowEqual} from 'react-redux';

// Notification permissions
import {
  request,
  check,
  PERMISSIONS,
  RESULTS,
  openSettings,
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';
import {Divider} from 'react-native-paper';

const SCREEN_WIDTH = Dimensions.get('window').width;

const PermissionsView = ({navigation}) => {
  const dispatch = useDispatch();

  const [isCameraPermission, setCameraPermission] = useState(false);
  const [isCameraPermissionBlocked, setCameraPermissionBlocked] = useState(
    false,
  );
  const [isLocationPermission, setLocationPermission] = useState(false);
  const [isLocationPermissionBlocked, setLocationPermissionBlocked] = useState(
    false,
  );
  const [isPhotoLibraryPermission, setPhotoLibraryPermission] = useState(false);
  const [
    isPhotoLibraryPermissionBlocked,
    setPhotoLibraryPermissionBlocked,
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

    // Photo library
    check(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
      setPhotoLibraryPermission(result == RESULTS.GRANTED);
      setPhotoLibraryPermissionBlocked(result == RESULTS.BLOCKED);
    });
    check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {
      setPhotoLibraryPermission(result == RESULTS.GRANTED);
      setPhotoLibraryPermissionBlocked(result == RESULTS.BLOCKED);
    });
  };
  useEffect(checkPermissions, []);
  AppState.addEventListener('change', checkPermissions);

  return (
    <ScrollView style={s.container}>
      <Text style={s.sectionTitle}>Kamera & Fotos</Text>

      <SwitchItem
        title="Live-Scanner"
        subtitle="Scanne Produkte mit deiner Kamera, um mehr über sie zu erfahren."
        state={isCameraPermission}
        onToggle={() => {
          if (!isCameraPermission) {
            request(PERMISSIONS.IOS.CAMERA).then(result => {
              setCameraPermission(result == RESULTS.GRANTED);
              setCameraPermissionBlocked(result == RESULTS.BLOCKED);
            });

            request(PERMISSIONS.ANDROID.CAMERA).then(result => {
              setCameraPermission(result == RESULTS.GRANTED);
              setCameraPermissionBlocked(result == RESULTS.BLOCKED);
            });

            if (!isCameraPermission && isCameraPermissionBlocked) {
              openSettings().catch(() => console.warn('cannot open settings'));
            }
          } else {
            openSettings().catch(() => console.warn('cannot open settings'));
          }
        }}
      />

      <SwitchItem
        title="Eigene Produktbilder"
        subtitle="Zugriff auf deine Fotos, damit du Fotos zu Produkten hochladen kannst."
        state={isPhotoLibraryPermission}
        onToggle={() => {
          if (!isPhotoLibraryPermission) {
            request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
              setPhotoLibraryPermission(result == RESULTS.GRANTED);
              setPhotoLibraryPermissionBlocked(result == RESULTS.BLOCKED);
            });

            request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {
              setPhotoLibraryPermission(result == RESULTS.GRANTED);
              setPhotoLibraryPermissionBlocked(result == RESULTS.BLOCKED);
            });

            if (!isPhotoLibraryPermission && isPhotoLibraryPermissionBlocked) {
              openSettings().catch(() => console.warn('cannot open settings'));
            }
          } else {
            openSettings().catch(() => console.warn('cannot open settings'));
          }
        }}
      />

      <Text style={s.sectionTitle}>Standort</Text>

      <SwitchItem
        title="Märkte in der Nähe"
        subtitle="Dein Standort wird nur bei Verwendung der App abgerufen, um dir Märkte in deiner Nähe zu zeigen."
        state={isLocationPermission}
        onToggle={() => {
          if (!isLocationPermission) {
            request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
              setLocationPermission(result == RESULTS.GRANTED);
              setLocationPermissionBlocked(result == RESULTS.BLOCKED);
            });

            request(PERMISSIONS.ANDROID.LOCATION_WHEN_IN_USE).then(result => {
              setLocationPermission(result == RESULTS.GRANTED);
              setLocationPermissionBlocked(result == RESULTS.BLOCKED);
            });

            if (!isLocationPermission && isLocationPermissionBlocked) {
              openSettings().catch(() => console.warn('cannot open settings'));
            }
          } else {
            openSettings().catch(() => console.warn('cannot open settings'));
          }
        }}
      />
    </ScrollView>
  );
};

export default PermissionsView;

const s = StyleSheet.create({
  // Container
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    width: SCREEN_WIDTH,
  },
  innerContainer: {
    marginHorizontal: -20,
  },

  // Section
  sectionTitle: {
    marginTop: 20,
    fontFamily: 'CircularStd-Bold',
    fontSize: 18,
    color: colors.black,
  },
  sectionSubtitle: {
    fontFamily: 'CircularStd-Book',
    fontSize: 14,
    color: colors.gray,
    marginBottom: 10,
  },
});
