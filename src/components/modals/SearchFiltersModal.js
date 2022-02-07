import React, {useState, useEffect, createRef} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import ModalContextMenu from './ModalContextMenu';
import {SearchBar, ListItem, Input, Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from './../../assets/styles';
import LorylistIcon from './../LorylistIcon';
import FilterItem from './../items/FilterItem';
import _, {debounce} from 'lodash';
import {productOperations} from './../../state/ducks/product';
import SimpleSearchInput from './../form/SimpleSearchInput';
import {Portal} from 'react-native-paper';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const SearchFiltersModal = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const {onSave} = props;

  const {
    isLoadingSearchFilters,
    searchFilters,
    activeSearchFilters,
  } = useSelector(state => state.product);

  const options = [
    {
      icon: 'tag',
      iconSize: 16,
      title: 'Marken',
      entity: 'brands',
      displayAttribute: 'name',
    },
    {
      icon: 'tiny-shop',
      iconSize: 16,
      title: 'Online-Shops',
      entity: 'shops',
      displayAttribute: 'name',
    },
    {
      icon: 'tag',
      iconSize: 16,
      title: 'Produktmerkmale',
      entity: 'labels',
      displayAttribute: 'name',
    },
    // {
    //   icon: 'leaf',
    //   title: 'Zutaten',
    //   entity: 'ingredients',
    //   displayAttribute: 'name',
    // },
    // {
    //   icon: 'info-circle',
    //   title: 'Allergene',
    //   entity: 'allergens',
    //   displayAttribute: 'name',
    // },
  ];

  const [currentOption, setCurrentOption] = useState(null);
  const [query, setQuery] = useState('');

  const scrollViewRef = createRef();

  useEffect(() => {
    if (currentOption) {
      if (scrollViewRef.current) {
        // console.log('SCROLL');
        setTimeout(() => {
          scrollViewRef.current.scrollTo({
            x: SCREEN_WIDTH,
            y: 0,
            animated: true,
          });
        }, 2000);
      }
    } else {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
      }
    }
  }, [currentOption, scrollViewRef]);

  useEffect(() => {
    dispatch(productOperations.doRefreshSearchFilters());
  }, [dispatch]);

  const onPressOption = option => {
    setCurrentOption(option);
    setQuery('');
  };

  const onPressBack = () => {
    if (ref.current && ref.current.scrollTo) {
      ref.current.scrollTo({
        y: 0,
        animated: false,
      });
    }

    setCurrentOption(null);
  };

  const onQueryChange = text => {
    setQuery(text);
  };

  const hasActiveFilters = () => {
    const keys = Object.keys(activeSearchFilters);

    return (
      keys.filter(
        key => activeSearchFilters[key] && activeSearchFilters[key].length > 0,
      ).length > 0
    );
  };

  return (
    <ModalContextMenu
      ref={ref}
      modalHeight={SCREEN_HEIGHT * 0.5}
      headerComponent={
        <View style={s.header}>
          <View style={s.headerButtons}>
            {/* Back button */}
            {currentOption && (
              <Button
                onPress={onPressBack}
                buttonStyle={s.backButton}
                title="Zurück"
                icon={
                  <LorylistIcon
                    name="chevron-right"
                    style={{transform: [{rotate: '180deg'}], marginRight: 5}}
                    size={16}
                    color={colors.secondary}
                  />
                }
                titleStyle={s.backButtonTitle}
              />
            )}

            {/* Reset button */}
            {!currentOption && (
              <Button
                onPress={() =>
                  dispatch(productOperations.doResetActiveSearchFilters())
                }
                buttonStyle={s.resetButton}
                title="Zurücksetzen"
                titleStyle={[
                  s.resetButtonTitle,
                  !hasActiveFilters() ? s.resetButonDisabled : null,
                ]}
              />
            )}

            {/* Close button */}
            <Button
              onPress={() => ref.current.close()}
              buttonStyle={s.closeButton}
              icon={<LorylistIcon name="times" />}
            />
          </View>

          <Text style={s.headerTitle}>Filter</Text>
        </View>
      }>
      <View style={s.container}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}>
          {!currentOption && (
            <View style={{width: SCREEN_WIDTH}}>
              {isLoadingSearchFilters && <ActivityIndicator />}

              {/* Options */}
              {options
                .filter(
                  option =>
                    searchFilters[option.entity] &&
                    searchFilters[option.entity].length > 0,
                )
                .map((option, index) => (
                  <FilterItem
                    icon={option.icon}
                    iconSize={option.iconSize}
                    title={option.title}
                    subtitle={
                      activeSearchFilters[option.entity]
                        ? activeSearchFilters[option.entity]
                            .slice(0, 10)
                            .map(item => item[option.displayAttribute])
                            .join(', ')
                        : ''
                    }
                    count={option.products_count ? option.products_count : null}
                    withChevron={true}
                    onPress={() => onPressOption(option)}
                  />
                ))}

              <Text style={s.infoText}>
                <LorylistIcon name="info-circle" /> Wähle Marken, Online-Shops
                oder Kategorien aus, um die Suchergebnisse auf diese zu
                reduzieren.
              </Text>
            </View>
          )}

          {/* Filters */}

          <View style={{width: SCREEN_WIDTH}}>
            <SimpleSearchInput
              style={{marginHorizontal: 20, marginBottom: 10}}
              placeholder="Suchen"
              isLoading={false}
              handleChange={onQueryChange}
            />
            {currentOption &&
              searchFilters[currentOption.entity]
                .filter(
                  item =>
                    !query ||
                    item[currentOption.displayAttribute]
                      .toLowerCase()
                      .includes(query.toLowerCase()),
                )
                .slice(0, 20)
                .sort((x, y) => {
                  let xActive =
                    _.findIndex(activeSearchFilters[currentOption.entity], {
                      id: x.id,
                    }) == -1
                      ? false
                      : true;
                  let yActive =
                    _.findIndex(activeSearchFilters[currentOption.entity], {
                      id: y.id,
                    }) == -1
                      ? false
                      : true;

                  if (xActive && !yActive) {
                    return -1;
                  }

                  if (!xActive && yActive) {
                    return 1;
                  }

                  return 0;
                })
                .map((item, index) => {
                  return (
                    <FilterItem
                      key={index}
                      active={
                        _.findIndex(activeSearchFilters[currentOption.entity], {
                          id: item.id,
                        }) == -1
                          ? false
                          : true
                      }
                      title={item[currentOption.displayAttribute]}
                      subtitle=""
                      onPress={() => {
                        dispatch(
                          productOperations.doToggleActiveSearchFiltersItem(
                            currentOption.entity,
                            item,
                          ),
                        );

                        onSave();
                      }}
                    />
                  );
                })}
          </View>
        </ScrollView>
      </View>
    </ModalContextMenu>
  );
});

export default SearchFiltersModal;

const s = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerButtons: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: 'CircularStd-Bold',
    fontSize: 16,
  },
  infoText: {
    marginTop: 20,
    fontFamily: 'CircularStd-Book',
    fontSize: 14,
    color: colors.gray,
    marginHorizontal: 20,
  },

  // Reset button
  resetButton: {
    backgroundColor: null,
    paddingHorizontal: 0,
  },
  resetButtonTitle: {
    color: colors.secondary,
    fontFamily: 'CircularStd-Book',
    fontSize: 16,
  },
  resetButonDisabled: {
    color: colors.gray,
  },

  // Back button
  backButton: {
    backgroundColor: null,
    paddingHorizontal: 0,
  },
  backButtonTitle: {
    color: colors.secondary,
    fontFamily: 'CircularStd-Book',
    fontSize: 16,
  },

  // Close button
  closeButton: {
    borderRadius: 40,
    backgroundColor: 'rgba(57, 54, 100, 0.05)',
    alignSelf: 'flex-end',
  },

  // Submit button
  submitButtonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  submitButton: {
    height: 56,
    backgroundColor: colors.secondary,
    borderRadius: 12,
  },
  submitButtonTitle: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 17,
  },
});
