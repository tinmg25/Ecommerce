import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    BackHandler,
    KeyboardAvoidingView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageContext } from '../LanguageContext';
import { API_KEY } from '../common/APIKey';
import firestore from '@react-native-firebase/firestore';
import { auth } from '../config/firebase-config';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {

    const { translate } = useContext(LanguageContext)

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
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch(`${API_KEY}/api/login`, {
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
                setEmail('');
                setPassword('');
                navigation.navigate('Main');
            } else {
                ToastAndroid.show('Invalid Email or Password, Try Again!', ToastAndroid.SHORT)
            }
        }
        catch (e) {

        }
    };

    const handleFirebaseLogin = () => {
        signInWithEmailAndPassword(auth,email,password)
        .then((re)=>{
            AsyncStorage.setItem('EMAIL',email);
            ToastAndroid.show('Login Successful', ToastAndroid.SHORT)
            navigation.navigate('Main');
        })
        .catch((re)=>{
            ToastAndroid.show('Invalid Email or Password, Try Again!', ToastAndroid.SHORT)
        })
    }

    return (
        <KeyboardAvoidingView
            behavior='position' style={styles.container}>
            <View>
                <View style={styles.view1}>
                    <Image 
                    style={styles.img}
                    source={require('../images/login_logo.png')} />
                </View>
                <Text style={styles.login}>{translate('login')}</Text>
                <View style={styles.view2}>
                    <Text style={styles.email_text}>{translate('email')}</Text>
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
                    <Text style={styles.pwd_text}>{translate('password')}</Text>
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
                    <TouchableOpacity onPress={() => handleFirebaseLogin()}>
                        <Text style={styles.login_btn}>{translate('login')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.reg_btn}>{translate('register')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.view4}>
                    <TouchableOpacity onPress={() => navigation.navigate('PasswordReset')}>
                        <Text style={styles.forgot_pwd}>{translate('forgot')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    view1: {
        height: 250,
        borderBottomStartRadius: 25,
        borderBottomEndRadius: 25,
        alignItems: 'center',
    },
    img: {
        width:'100%',
        height:'100%',
    },
    view2: {
        alignSelf: 'center',
    },
    login: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#000000",
        alignSelf: 'center',
        marginVertical: 20,
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
});

export default LoginScreen;