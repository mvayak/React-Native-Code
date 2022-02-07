import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Image, colors } from 'react-native-elements';
import _ from 'lodash';
const screenWidth = Math.round(Dimensions.get('window').width);
import ImageViewer from 'react-native-image-zoom-viewer';
import Colors from './../../assets/styles/colors.js';
import LorylistIcon from './../LorylistIcon';
import { simpleStyle } from 'react-native-image-zoom-viewer/built/image-viewer.style';


// Render Carousel Image
const RenderItem = ({ item, index, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{
        width: screenWidth,
        height: screenWidth,
      }}>
      {item.image.split('.').slice(-1)[0] === 'jpg' ? (
        <ImageBackground
          source={{
            uri:
              item.image +
              '?width=' +
              screenWidth * 0.2 +
              '&height=' +
              screenWidth * 0.2,
            cache: 'force-cache',
          }}
          style={[
            {
              height: screenWidth,
              width: screenWidth,
              justifyContent: 'flex-end',
              alignItems: 'center',
            },
          ]}
          resizeMode={'contain'}
          blurRadius={1}>
          <Image
            source={{
              uri:
                item.image +
                '?width=' +
                screenWidth * 2 +
                ((item.is_cropped && item.is_cropped === false) ||
                  !item.is_cropped
                  ? ''
                  : '&height=' + screenWidth * 2),
              cache: 'force-cache',
            }}
            style={[
              {
                height: screenWidth * (item.scale || 1),
                width: screenWidth * (item.scale || 1),
              },
              // item.color ? {backgroundColor: Colors.rgba(item.color, 0.1)} : null,
            ]}
            placeholderStyle={{ backgroundColor: 'transparent' }}
            resizeMode="contain"
            PlaceholderContent={<ActivityIndicator />}
          />
        </ImageBackground>
      ) : (
        <View
          style={[
            {
              height: screenWidth,
              width: screenWidth,
              justifyContent: 'flex-end',
              alignItems: 'center',
            },
            item.color ? { backgroundColor: Colors.rgba(item.color, 0.1) } : null,
          ]}>
          <Image
            source={{
              uri:
                item.image +
                '?width=' +
                screenWidth * 2 +
                ((item.is_cropped && item.is_cropped === false) ||
                  !item.is_cropped
                  ? ''
                  : '&height=' + screenWidth * 2),
              cache: 'force-cache',
            }}
            style={[
              {
                height: screenWidth * (item.scale || 1),
                width: screenWidth * (item.scale || 1),
              },
              // item.color ? {backgroundColor: Colors.rgba(item.color, 0.1)} : null,
            ]}
            placeholderStyle={{ backgroundColor: 'transparent' }}
            resizeMode="contain"
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};
const CarouselViewer = ({ images, onChangeImage = null }) => {
  const [isFullScreen, setFullScreen] = useState(false);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const slider = useRef();

  // Reset active slide when images changed
  useEffect(() => {
    setActiveSlide(0);

    if (slider.current) {
      slider.current.snapToItem(0);
    }
  }, [images]);

  const imageUrls = images.map(i => {
    return { url: i.image, props: { cache: 'force-cache' } };
  });

  const _showFullScreen = () => {
    setFullScreen(true);
  };
  const _hideFullScreen = () => {
    setFullScreen(false);
  };

  return (
    <View>
      <Carousel
        loop={true}
        ref={slider}
        data={images}
        renderItem={({ item, index }) => (
          <RenderItem item={item} index={index} onPress={_showFullScreen} />
        )}
        onSnapToItem={index => {
          setActiveSlide(index);

          // Call callback function when it's defined
          if (onChangeImage) {
            onChangeImage(images[index], index);
          }
        }}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
      />
      <Pagination
        dotsLength={images.length <= 12 ? images.length : 12}
        activeDotIndex={activeSlide > 11 ? 11 : activeSlide}
        dotStyle={styles.activeDot}
        dotContainerStyle={styles.dotContainer}
        inactiveDotStyle={styles.inactiveDot}
        inactiveDotOpacity={1.1}
        inactiveDotScale={0.8}
        containerStyle={{
          marginBottom: -30,
          marginTop: -15,
        }}
      />
      <Modal visible={isFullScreen} transparent={true}>
        <TouchableOpacity
          onPress={() => setFullScreen(false)}
          style={{ zIndex: 99999, position: 'absolute', top: (Platform.OS === 'ios') ? 60 : 40, right: 40 }}>
          <LorylistIcon name="times" color={colors.black} size={16} />
        </TouchableOpacity>
        <ImageViewer
          style={[simpleStyle.count = {
            position: 'absolute',
            alignSelf: 'center',
            top: (Platform.OS === 'ios') ? 58 : 38,
            zIndex: 13,
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 2,
            paddingBottom: 2,
            borderRadius: 20,
            backgroundColor: 'black'
          }, simpleStyle.countText = {
            color: 'white',
            fontSize: 16,
            backgroundColor: 'transparent',
            textShadowColor: 'rgba(0, 0, 0, 0.3)',
            textShadowOffset: {
              width: 0,
              height: 0.5
            },
            textShadowRadius: 0
          }]}

          enableSwipeDown
          imageUrls={imageUrls}
          index={activeSlide}
          loadingRender={() => <ActivityIndicator color={Colors.secondary} />}
          onSwipeDown={_hideFullScreen}
          backgroundColor="white"
          saveToLocalByLongPress={false}
        />
      </Modal>
    </View>
  );
};

export default CarouselViewer;


const styles = StyleSheet.create({
  //Pagination
  count: {
    position: 'absolute',
    alignSelf: 'center',
    top: (Platform.OS === 'ios') ? 58 : 38,
    zIndex: 13,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 20,
    backgroundColor: 'black'
  },
  countText: {
    color: 'red',
    fontSize: 16,
    backgroundColor: 'transparent',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {
      width: 0,
      height: 0.5
    },
    textShadowRadius: 0
  },
  activeDot: {
    width: 20,
    height: 4,
    marginHorizontal: 0,
    backgroundColor: Colors.primary,
  },
  dotContainer: {
    marginHorizontal: 2,
  },
  inactiveDot: {
    backgroundColor: 'rgba(231, 231, 231, 1)',
  },
});
