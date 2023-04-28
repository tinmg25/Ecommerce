import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    BackHandler,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {

    const disableBackButton = () => {
        BackHandler.exitApp();
        return true;
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            disableBackButton
        );
        return () => backHandler.remove();
    },[]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://192.168.64.56:8087/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });
            await AsyncStorage.setItem('EMAIL', email);
            if (response.ok) {
                navigation.navigate('Main');
            } else {
                ToastAndroid.show('Invalid Email or Password, Try Again!', ToastAndroid.SHORT)
            }
        }
        catch (e) {

        }
    };

    return (
        <View>
            <View style={styles.view1}>
                <Text style={styles.logo}>HL</Text>
                <Image style={styles.img} source={require('../images/square.png')} />
            </View>
            <Text style={styles.login}>Login</Text>
            <View style={styles.view2}>
                <Text style={styles.email_text}>Email Address</Text>
                <View style={styles.email_view}>
                    <MaterialCommunityIcons
                        style={{ alignSelf: 'center', paddingLeft: 10, color: '#000' }}
                        name="email-outline"
                        size={25} />
                    <TextInput
                        style={styles.email_input}
                        keyboardType='email-address'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        inlineImageLeft='' />
                </View>
                <Text style={styles.pwd_text}>Password</Text>
                <View style={styles.pwd_view}>
                    <MaterialCommunityIcons
                        style={{ alignSelf: 'center', paddingLeft: 10, color: '#000', }}
                        name="lock-outline"
                        size={25} />
                    <TextInput
                        style={styles.pwd_input}
                        keyboardType='default'
                        secureTextEntry
                        value={password}
                        onChangeText={(text) => setPassword(text)} />
                </View>
            </View>
            <View style={styles.view3}>
                <TouchableOpacity onPress={() => handleLogin()}>
                    <Text style={styles.login_btn}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.reg_btn}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                    <Text style={styles.reg_btn}>Test Login</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.view4}>
                <TouchableOpacity onPress={() => navigation.navigate('PasswordReset')}>
                    <Text style={styles.forgot_pwd}>forgot password?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view1: {
        height: 250,
        backgroundColor: "#04144F",
        borderBottomStartRadius: 25,
        borderBottomEndRadius: 25,
        alignItems: 'center',
    },
    logo: {
        fontSize: 120,
        color: "#FFFFFF",
        fontStyle: "italic",
        fontWeight: "bold",
        position: "relative",
        marginVertical: 30,
    },
    img: {
        height: 30,
        width: 30,
        transform: [{ rotate: '45deg' }],
        position: "absolute",
        top: 100,
        left: 150,
    },
    view2: {
        alignSelf: 'center',
    },
    login: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#000000",
        alignSelf: 'center',
    },
    email_view: {
        flexDirection: 'row',
        width: 300,
        height: 50,
        borderColor: "#000000",
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 10,
    },
    email_text: {
        fontSize: 15,
        color: "#000000",
        marginBottom: 10,
    },
    email_input: {
        width: 250,
        fontSize: 20,
    },
    pwd_view: {
        flexDirection: 'row',
        width: 300,
        height: 50,
        borderColor: "#000000",
        borderWidth: 2,
        borderRadius: 10,
    },
    pwd_text: {
        fontSize: 15,
        color: "#000000",
        marginBottom: 10,
    },
    pwd_input: {
        width: 250,
        fontSize: 20,
    },
    view3: {
        marginTop: 20,
        alignSelf: 'center',
    },
    login_btn: {
        width: 250,
        fontSize: 20,
        padding: 15,
        backgroundColor: '#04144F',
        color: 'white',
        textAlign: 'center',
        borderRadius: 50,
        marginBottom: 10,
    },
    reg_btn: {
        width: 250,
        fontSize: 20,
        padding: 15,
        backgroundColor: '#618CFB',
        color: 'white',
        textAlign: 'center',
        borderRadius: 50,
    },
    view4: {
        alignItems: 'flex-end',
        paddingRight: 10,
        paddingTop: 20,
    },
    forgot_pwd: {
        color: '#618CFB',
        textDecorationColor: "#618CFB",
        textDecorationLine: "underline",

    },
    toast: {

    }
});

export default LoginScreen;