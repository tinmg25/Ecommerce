import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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

import {EventRegister} from 'react-native-event-listeners';
import theme from './src/config/theme';
import themeContext from './src/config/themeContext';
import {Provider} from 'react-redux';
import store from './src/redux/store/Store';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Product"
        component={ProductScreen}
        options={({navigation}) => ({
          // headerRight: () => (
          //     <TouchableOpacity
          //         title="Logout"
          //         onPress={() => navigation.navigate('Login')}
          //     >
          //         <MaterialCommunityIcons name="logout" size={30} color="black" />
          //     </TouchableOpacity>
          // ),
          tabBarLabel: 'Products',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="shopping" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="OrderList"
        component={OrderStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Order List',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={ViewCartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishListScreen}
        options={{
          tabBarLabel: 'Wishlist',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({color, size}) => (
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
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PasswordReset"
        component={PasswordResetScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={({navigation}) => ({
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
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({navigation}) => ({
          title: 'Details',
          headerBackVisible: true,
        })}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          title: 'Checkout',
        }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          title: 'Payment',
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          headerShown: false,
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name="Account"
        component={AccountSettingScreen}
        options={{
          title: 'Account Setting',
        }}
      />
    </Stack.Navigator>
  );
};

const OrderStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrderLists"
        component={OrderListScreen}
        options={{
          title: 'Order List',
        }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailScreen}
        options={{
          title: 'Details',
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: 'Edit Profile',
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const [mode, setMode] = useState(false);

  useEffect(() => {
    let eventListenter = EventRegister.addEventListener('ChangeTheme', data => {
      setMode(data);
      console.log(data);
    });
    return () => {
      EventRegister.removeAllListeners(eventListenter);
    };
  }, [mode]);

  return (
    <Provider store={store}>
      <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </themeContext.Provider>
    </Provider>
  );
};

export default App;
