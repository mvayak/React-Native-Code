import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

// Assets
import colors from '../assets/styles/colors.js';

const ProductDescriptionView = ({route, navigation}) => {
  const product = route.params.product;

  const wrapContent = html => `
    <html>
      <head></head>
      <body>
        <style>
          html,body {
            font-family: sans-serif;
            font-size: 34px;
            padding: 10px 20px;
            line-height: 45px;
          }
        </style>
        ${html}
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{html: wrapContent(product.description)}}
        textZoom={100}
      />
    </View>
  );
};

export default ProductDescriptionView;

const styles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
