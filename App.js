import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Splash from './src/HomeScreens/Splash';
import LoginScreen from './src/HomeScreens/LoginScreen';
import RegisterScreen from './src/HomeScreens/RegisterScreen';
import PasswordResetScreen from './src/HomeScreens/PasswordResetScreen';
import ProductScreen from './src/HomeScreens/ProductScreen';
import ProductDetailScreen from './src/HomeScreens/ProductDetailScreen';
import ViewCartScreen from './src/HomeScreens/ViewCartScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckoutScreen from './src/HomeScreens/CheckoutScreen';
import PaymentScreen from './src/HomeScreens/PaymentScreen';
import OrderListScreen from './src/OrderScreens/OrderListScreen';
import OrderDetailScreen from './src/OrderScreens/OrderDetailScreen';
import ProfileScreen from './src/SettingScreens/ProfileScreens/ProfileScreen';
import EditProfileScreen from './src/SettingScreens/ProfileScreens/EditProfileScreen';
import SettingScreen from './src/SettingScreens/SettingScreen';
import WishListScreen from './src/WishlistScreen/Wishlist';
import AccountSettingScreen from './src/SettingScreens/AccountScreens/AccountSetting';
import AboutScreen from './src/SettingScreens/AboutScreen';
import SearchScreen from './src/HomeScreens/SearchScreen';

import { EventRegister } from 'react-native-event-listeners';
import theme from './src/config/theme';
import themeContext from './src/config/themeContext';
import { Provider } from 'react-redux';
import store from './src/redux/store/Store';
import HelpSupportScreen from './src/SettingScreens/Help&SupportScreen';
import { LanguageProvider } from './src/LanguageContext';
import { LanguageContext } from './src/LanguageContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {

  const { translate } = useContext(LanguageContext);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Product"
        component={ProductStackNavigator}
        options={({ navigation }) => ({
          // headerRight: () => (
          //     <TouchableOpacity
          //         title="Logout"
          //         onPress={() => navigation.navigate('Login')}
          //     >
          //         <MaterialCommunityIcons name="logout" size={30} color="black" />
          //     </TouchableOpacity>
          // ),
          headerShown: false,
          tabBarLabel: translate('products'),
          tabBarLabelStyle: {
            color: '#fff',
            fontSize: 12,
          },
          tabBarStyle: {
            backgroundColor: '#04144F',
          },
          tabBarActiveTintColor: '#fff',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shopping" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Searches"
        component={SearchStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: translate('search'),
          tabBarLabelStyle: {
            color: '#fff',
            fontSize: 12,
          },
          tabBarStyle: {
            backgroundColor: '#04144F',
          },
          tabBarActiveTintColor: '#fff',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ViewCart"
        component={ViewCartStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: translate('cart'),
          tabBarLabelStyle: {
            color: '#fff',
            fontSize: 12,
          },
          tabBarStyle: {
            backgroundColor: '#04144F',
          },
          tabBarActiveTintColor: '#fff',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: translate('wishlist'),
          tabBarLabelStyle: {
            color: '#fff',
            fontSize: 12,
          },
          tabBarStyle: {
            backgroundColor: '#04144F',
          },
          tabBarActiveTintColor: '#fff',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingStackNavigator}
        options={{
          headerShown:false,
          tabBarLabel: translate('setting'),
          tabBarLabelStyle: {
            color: '#fff',
            fontSize: 12,
          },
          tabBarStyle: {
            backgroundColor: '#04144F',
          },
          tabBarActiveTintColor: '#fff',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MainStackNavigator = () => {

  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PasswordReset"
        component={PasswordResetScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={({ navigation }) => ({
          title: 'Home',
          headerShown: false,
          headerBackVisible: false,
          // headerRight: () => (
          //     <TouchableOpacity
          //         title="Logout"
          //         onPress={() => navigation.navigate('Login')}
          //     >
          //         <MaterialCommunityIcons name="logout" size={30} color="black" />
          //     </TouchableOpacity>
          // ),
        })}
      />
    </Stack.Navigator>
  );
};

const ProductStackNavigator = () => {

  const { translate } = useContext(LanguageContext);

  return(
    <Stack.Navigator>
      <Stack.Screen
        name="Products"
        component={ProductScreen}
        options={{
          title: translate('products'),
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailScreen}
        options={{
          title: translate('detail'),
        }}
      />
    </Stack.Navigator>
  );
};

const SearchStackNavigator = () => {

  const { translate } = useContext(LanguageContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: translate('search'),
        }}
      />
    </Stack.Navigator>
  );
};

const ViewCartStackNavigator = () => {

  const { translate } = useContext(LanguageContext);

  return(
    <Stack.Navigator>
      <Stack.Screen
        name="Cart"
        component={ViewCartScreen}
        options={{
          title: translate('cart'),
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          title: translate('checkout'),
        }}
      />
    </Stack.Navigator>
  )
}

const WishlistStackNavigator =() => {

  const { translate } = useContext(LanguageContext);

  return(
    <Stack.Navigator>
      <Stack.Screen
        name='WishLists'
        component={WishListScreen}
        options={{
          title: translate('wishlist'),
        }}
      />
    </Stack.Navigator>
  )
}

const SettingStackNavigator = () => {

  const { translate } = useContext(LanguageContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          title: translate('setting'),
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={{
          title: translate('profile'),
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: translate('edit'),
        }}
      />
      <Stack.Screen
        name="OrderLists"
        component={OrderListScreen}
        options={{
          title: translate('order_lists'),
        }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailScreen}
        options={{
          title: translate('detail'),
        }}
      />
      <Stack.Screen
        name="Account"
        component={AccountSettingScreen}
        options={{
          title: translate('account_setting'),
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: translate('about'),
        }}
      />
      <Stack.Screen
        name="Help"
        component={HelpSupportScreen}
        options={{
          title: translate('help_support'),
        }}
      />
    </Stack.Navigator>
  )
}

const App = () => {

  const [mode, setMode] = useState(false);

  useEffect(() => {
    let eventListenter = EventRegister.addEventListener('ChangeTheme', data => {
      setMode(data);
    });
    return () => {
      EventRegister.removeAllListeners(eventListenter);
    };
  }, [mode]);

  return (
    <LanguageProvider>
      <Provider store={store}>
        <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
          <NavigationContainer>
            <MainStackNavigator />
          </NavigationContainer>
        </themeContext.Provider>
      </Provider>
    </LanguageProvider>
  );
};

export default App;
