import React from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from "./src/screens/Splash"
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import PasswordResetScreen from "./src/screens/PasswordResetScreen";
import ProductScreen from "./src/screens/ProductScreen";
import ProductDetailScreen from "./src/screens/ProductDetailScreen";
import ViewCartScreen from "./src/screens/ViewCartScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckoutScreen from "./src/screens/CheckoutScreen";
import PaymentScreen from "./src/screens/PaymentScreen";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
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
        </NavigationContainer>
    );
}

export default App;