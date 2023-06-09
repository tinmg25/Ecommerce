import React, { useState, useContext, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    Alert,
} from 'react-native';
import { LanguageContext } from '../LanguageContext';
import { API_KEY } from '../common/APIKey';
import { auth } from '../config/firebase-config';
import { sendPasswordResetEmail } from "firebase/auth";

const PasswordResetScreen = ({ navigation }) => {

    const { translate } = useContext(LanguageContext);

    const [email, setEmail] = useState('');

    const handlePassword = async () => {
        try {
            const mEmail = email;
            console.log(mEmail);
            const emailResponse = await fetch(`${API_KEY}/api/users/${mEmail}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mEmail })
            });
            if (emailResponse.ok) {
                const data = await emailResponse.json();
                setPassword(data.password);
            } else {

            }
        } catch (e) {
            ToastAndroid.show('Email does not exist', ToastAndroid.SHORT);
        }
    };

    const handleFirebasePasswordReset = () => {
        if (email !== '') {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    Alert.alert(`Password Reset Email has sent to ${email}`)
                })
                .catch((error) => {
                    ToastAndroid.show('Email send unsuccessful!',ToastAndroid.SHORT);
                });
        } else {
            ToastAndroid.show('Please enter email address!', ToastAndroid.SHORT);
        }
    }

    return (
        <View>
            <Text style={styles.pwd_recovery}>{translate('recovery')}</Text>
            <View style={styles.view2}>
                <Text style={styles.email_text}>{translate('email')}</Text>
                <TextInput
                    style={styles.email_input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType='email-address'
                    autoCapitalize='none' />
            </View>
            <View style={styles.view3}>
                <TouchableOpacity onPress={() => handleFirebasePasswordReset()}>
                    <Text style={styles.reg_btn}>{translate('send')}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.view4}>
                <Text style={styles.label}>{translate('already')}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.login_text}>{translate('login')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pwd_recovery: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#000000",
        alignSelf: 'center',
        paddingTop: 50,
        marginBottom: 50,
    },
    view2: {
        alignSelf: 'center',
    },
    email_text: {
        fontSize: 18,
        color: "#000000",
        marginBottom: 10,
    },
    email_input: {
        width: 300,
        height: 50,
        borderColor: "#000000",
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 50,
        fontSize: 20,
    },
    view3: {
        alignSelf: 'center',
    },
    reg_btn: {
        width: 250,
        fontSize: 20,
        padding: 15,
        backgroundColor: '#04144F',
        color: 'white',
        textAlign: 'center',
        borderRadius: 50,
        marginBottom: 20,
    },
    view4: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    label: {
        fontSize: 18,
        color: '#000',
    },
    login_text: {
        textDecorationLine: 'underline',
        fontSize: 18,
        color: 'blue',
    },
});

export default PasswordResetScreen;