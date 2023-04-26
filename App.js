import React from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

const Stack = createNativeStackNavigator();

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
                name="Product"
                component={ProductScreen}
                options={({ navigation }) => ({
                    title: 'Product List',
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
    return (
        <NavigationContainer>
            <MainStackNavigator />
        </NavigationContainer>
    );
}

export default App;