import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Animated } from 'react-native';

// Components
import CategoryButton from './../buttons/CategoryButton';
import ListDivider from './../content/ListDivider';

// Assets
import Colors from './../../assets/styles/colors.js';
const screenWidth = Math.round(Dimensions.get('window').width);

export default class CategoryCollection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: new Animated.Value(0),
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll({ nativeEvent: { contentOffset, contentSize } }) {
    let progress = ((contentOffset.x - 20) / (contentSize.width - screenWidth)) * 100;

    if (progress < 0) progress = 0
    if (progress > 100) progress = 100

    this.state.progress.setValue(progress)
  }

  render() {
    const { style, categories, name } = this.props;
    const scrollViewStyle = style
      ? { ...styles.scrollView, ...style }
      : styles.scrollView;

    // return <View />;
    // Build category groups
    const firstRow = categories.slice(0, Math.ceil(categories.length / 2));
    const secondRow = categories.slice(
      firstRow.length - 1,
      categories.length - 1,
    );
    const data = [firstRow, secondRow];

    const show = categories && categories.length > 0;

    return (
      <View style={{ marginBottom: 20, }}>
        {show && name !== undefined && name.length > 0 && <Text style={styles.sectionText}>{name}</Text>}

        <FlatList
          data={data}
          key={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={this.handleScroll}
          scrollEventThrottle={16}
          style={styles.scrollViewStyle}
          removeClippedSubviews={true}
          contentContainerStyle={styles.scrollViewContent}
          renderItem={({ item }) => (
            <View style={styles.row}>
              {item.map((category, index) => {
                return <CategoryButton key={index} category={category} />;
              })}
            </View>
          )}
        />

        {/* {show && <ListDivider style={styles.divider} progress={this.state.progress} />} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    height: 130,
    backgroundColor: Colors.white,
  },
  scrollViewContent: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingLeft: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  sectionText: {
    marginBottom: 10,
    fontSize: 18,
    paddingLeft: 20,
    fontFamily: 'CircularStd-Bold',
  },
  divider: {
    marginLeft: 20,
  }
});
