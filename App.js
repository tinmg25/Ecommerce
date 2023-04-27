import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Splash from "./src/HomeScreens/Splash";
import LoginScreen from "./src/HomeScreens/LoginScreen";
import RegisterScreen from "./src/HomeScreens/RegisterScreen";
import PasswordResetScreen from "./src/HomeScreens/PasswordResetScreen";
import ProductScreen from "./src/HomeScreens/ProductScreen";
import ProductDetailScreen from "./src/HomeScreens/ProductDetailScreen";
import ViewCartScreen from "./src/HomeScreens/ViewCartScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckoutScreen from "./src/HomeScreens/CheckoutScreen";
import PaymentScreen from "./src/HomeScreens/PaymentScreen";
import OrderListScreen from "./src/OrderScreens/OrderListScreen";
import OrderDetailScreen from "./src/OrderScreens/OrderDetailScreen";
import ProfileScreen from "./src/ProfileScreens/ProfileScreen";
import SettingScreen from "./src/SettingScreens/SettingScreen";

import { EventRegister } from "react-native-event-listeners";
import themeContext from "./src/config/themeContext";
import theme from "./src/config/theme";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Product"
                component={ProductScreen}
                options={({ navigation }) => ({
                    headerRight: () => (
                        <TouchableOpacity
                            title="Logout"
                            onPress={() => navigation.navigate('Login')}
                        >
                            <MaterialCommunityIcons name="logout" size={30} color="black" />
                        </TouchableOpacity>
                    ),
                    tabBarLabel: 'Products',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name='shopping' color={color} size={size} />
                    ),
                })} />
            <Tab.Screen
                name="OrderList"
                component={OrderListScreen}
                options={{
                    tabBarLabel: 'Order List',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name='cart' color={color} size={size} />
                    )
                }} />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name='account' color={color} size={size} />
                    )
                }} />
            <Tab.Screen
                name="Setting"
                component={SettingScreen}
                options={{
                    tabBarLabel: 'Setting',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name='cog' color={color} size={size} />
                    )
                }} />
        </Tab.Navigator>
    )
}

const MainStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
                name="Splash"
                component={Splash}
                options={{ headerShown: false }} />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }} />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }} />
            <Stack.Screen
                name="PasswordReset"
                component={PasswordResetScreen}
                options={{ headerShown: false }} />
            <Stack.Screen
                name="Main"
                component={MainTabNavigator}
                options={({ navigation }) => ({
                    title: 'Home',
                    headerShown: false,
                    headerBackVisible: false,
                    headerRight: () => (
                        <TouchableOpacity
                            title="Logout"
                            onPress={() => navigation.navigate('Login')}
                        >
                            <MaterialCommunityIcons name="logout" size={30} color="black" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={({ navigation }) => ({
                    title: 'Details',
                    headerBackVisible: true,
                })}
            />
            <Stack.Screen
                name="ViewCart"
                component={ViewCartScreen}
                options={{
                    title: "View Cart",
                }} />
            <Stack.Screen
                name="Checkout"
                component={CheckoutScreen}
                options={{
                    title: "Checkout",
                }} />
            <Stack.Screen
                name="Payment"
                component={PaymentScreen}
                options={{
                    title: "Payment",
                }} />
        </Stack.Navigator>
    )
}

const App = () => {

    const [mode, setMode] = useState(false);

    useEffect(() => {
        let eventListenter = EventRegister.addEventListener(
            "changeTheme",
            (data) => {
                setMode(data);
            }
        )
    })
    return (
        <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
            <NavigationContainer>
                <MainStackNavigator />
            </NavigationContainer>
        </themeContext.Provider>
    );
}

export default App;