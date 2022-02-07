console.disableYellowBox = true;

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
// Navigation stuff
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PortalProvider } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import linking from './linking';

// Others
import colors from './assets/styles/colors';
import LorylistHeader from './components/Header';
import TabBarItem from './components/items/TabBarItem';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Snackbar from './components/Snackbar';

// Views
import SearchView from './views/SearchView.js';
import SearchResultView from './views/SearchResultView.js';
import ProductView from './views/ProductView.js';
import ProductDescriptionView from './views/ProductDescriptionView.js';
import ShopView from './views/ShopView.js';



// Redux + Persist
import { Provider } from 'react-redux';
import store from './state/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import helpers from './helpers';

const persistor = persistStore(store);

const RootTab = createMaterialTopTabNavigator(); // Root tab, containing Tabs and Live Scanner View
const AppTab = createBottomTabNavigator(); // Tabs
const HomeStack = createStackNavigator(); // Home stack
const SearchStack = createStackNavigator(); // Search stack
const FavoriteListStack = createStackNavigator(); // Fav List stack
const UserStack = createStackNavigator(); // User stack

const headerOptions = {
  headerShown: false,
  headerLeftContainerStyle: { marginLeft: 15 },
  headerBackTitleStyle: {
    color: colors.black,
    fontFamily: 'CircularStd-Medium',
  },
  headerTitleStyle: {
    fontFamily: 'CircularStd-Bold',
    fontSize: 18,
  },
  headerTintColor: colors.black,
  headerStyle: {
    shadowColor: 'transparent',
  },
};

function RootTabScreens() {
  return (
    <RootTab.Navigator
      initialRouteName="App"
      backBehavior="initialRoute"
      lazy={true}
      tabBar={() => { }}>
      <RootTab.Screen name="App" component={AppTabScreens} />
    </RootTab.Navigator>
  );
}

function SearchStackScreens() {
  return (
    <SearchStack.Navigator headerMode="screen" screenOptions={headerOptions}>
      <SearchStack.Screen
        name="Search"
        component={SearchView}
        options={{
          headerShown: false,
          header: ({ navigation }) => {
            return (
              <LorylistHeader
                // onBackPress={() => navigation.goBack()}
                background={'transparent'}
                title={'Suchen'}
              />
            );
          },
        }}
      />
      <SearchStack.Screen
        name="SearchResultView"
        component={SearchResultView}
        options={{
          headerShown: false,
          header: ({ navigation }) => {
            return (
              <LorylistHeader
                // onBackPress={() => navigation.goBack()}
                background={'transparent'}
                title={'Suchen'}
              />
            );
          },
        }}
      />

      <SearchStack.Screen
        name="ShopSearch"
        component={SearchResultView}
        options={{
          headerShown: false,
          header: ({ navigation }) => {
            return (
              <LorylistHeader
                onBackPress={() => navigation.goBack()}
                background={'transparent'}
                title={'Suchen'}
              />
            );
          },
        }}
      />
      <SearchStack.Screen
        name="CollectionSearch"
        component={SearchResultView}
        options={{
          headerShown: false,
          header: ({ navigation }) => {
            return (
              <LorylistHeader
                onBackPress={() => navigation.goBack()}
                background={'transparent'}
                title={'Suchen'}
              />
            );
          },
        }}
      />
      <SearchStack.Screen name="Product" component={ProductView} />
      <SearchStack.Screen name="LinkedProduct" component={ProductView} />


      <SearchStack.Screen
        name="ProductDescription"
        component={ProductDescriptionView}
        options={{
          headerShown: true,
          title: 'Beschreibung',
          headerBackTitle: 'Zurück',
        }}
      />
      <SearchStack.Screen name="Shop" component={ShopView} />
    </SearchStack.Navigator>
  );
}


function AppTabScreens() {
  return (
    <AppTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <TabBarItem focused={focused} name={route.name} />
        ),
        tabBarVisible: false,
      })}
      tabBarOptions={{
        showLabel: false,
      }}>
      <AppTab.Screen name="Search" component={SearchStackScreens} />

    </AppTab.Navigator>
  );
}

const App = () => {
  const containerRef = React.useRef();

  useEffect(() => {
    resetCancelButton();
  })

  async function resetCancelButton() {
    await helpers.save_data("cancel_shown", "0");
  }

  return (
    <Provider store={store}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />

      <PersistGate
        loading={null}
        persistor={persistor}>
        <PortalProvider>
          <SafeAreaProvider>
            <>
              <Snackbar />
              <NavigationContainer linking={linking} ref={containerRef}>
                <RootTabScreens />
              </NavigationContainer>
            </>
          </SafeAreaProvider>
        </PortalProvider>
      </PersistGate>
    </Provider >
  );
};

export default App;
