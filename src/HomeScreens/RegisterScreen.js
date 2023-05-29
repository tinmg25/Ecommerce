import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import { LanguageContext } from '../LanguageContext';
import { API_KEY } from '../common/APIKey';
import { auth } from '../config/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterScreen = ({ navigation }) => {

    const { translate } = useContext(LanguageContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [conPasswordError, setConPasswordError] = useState('');

    const handleUserName = (name) => {
        const nameRegex = /^[a-zA-Z\s]*$/;
        return nameRegex.test(name);
    };

    const handleEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleAddress = (address) => {
        const addressRegex = /^[a-zA-Z0-9\s]+$/;
        return addressRegex.test(address);
    };

    const handlePhone = (phone) => {
        const phoneRegex = /^[0-9]{11}$/;
        return phoneRegex.test(phone);
    };

    const handlePassword = (password) => {
        const passwordRegex = /^.{8,}$/;
        return passwordRegex.test(password);

    };

    const handleConPassword = (conPassword) => {
        return conPassword === password;
    }

    const validateForm = () => {
        if (name.trim() === '') {
            setNameError(translate('name_error'));
        } else if (!handleUserName(name)) {
            setNameError(translate('name_format'));
        } else {
            setNameError('');
        }

        if (email.trim() === '') {
            setEmailError(translate('mail_error'));
        } else if (!handleEmail(email)) {
            setEmailError(translate('mail_format'));
        } else {
            setEmailError('');
        }

        if (address.trim() === '') {
            setAddressError(translate('address_error'));
        } else if (!handleAddress(address)) {
            setAddressError(translate('address_format'));
        } else {
            setAddressError('');
        }

        if (phone.trim() === '') {
            setPhoneError(translate('phone_error'));
        } else if (!handlePhone(phone)) {
            setPhoneError(translate('phone_format'));
        } else {
            setPhoneError('');
        }

        if (password.trim() === '') {
            setPasswordError(translate('pwd_error'));
        } else if (!handlePassword(password)) {
            setPasswordError(translate('pwd_format'));
        } else {
            setPasswordError('');
        }

        if (conPassword.trim() === '') {
            setConPasswordError(translate('con_pwd_error'));
        } else if (!handleConPassword(conPassword)) {
            setConPasswordError(translate('con_pwd_format'));
        } else {
            setConPasswordError('');
        }

        if (handleUserName(name) && handleEmail(email) && handlePhone(phone) &&
            handlePassword(password) && handleConPassword(conPassword)) {
            // handleRegister();
            handleFirebaseRegister();
        }
    }


    const handleRegister = async () => {
        try {
            const response = await fetch(`${API_KEY}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    password
                })
            });
            const data = await response.json();
            navigation.goBack();
        } catch (error) {
            console.error("Registration Failed", error);
        }
    };

    const handleFirebaseRegister = async () => {
        try {
            const authResult = await createUserWithEmailAndPassword(auth, email, password);
            const user = authResult.user;

            // if (user) {
            //     await setDoc(doc(db, "user_mst", user.uid), {
            //         name: name,
            //         email: email,
            //         address: address,
            //         phone: phone,
            //         password: password,
            //     })
            //         .then(() => {
            //             ToastAndroid.show('User Regiseter successfully!');
            //         });
            //     navigation.goBack();
            // }
        } catch (error) {
            console.error("Registration Failed", error);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior='height' style={styles.container}>
            <View>
                <Text style={styles.reg}>{translate('register')}</Text>
                <View style={styles.view2}>
                    <Text style={styles.label}>{translate('username')}</Text>
                    <TextInput
                        style={styles.text_input}
                        keyboardType='default'
                        value={name}
                        onChangeText={setName} />
                    {nameError ? <Text style={styles.errorMessage}>{nameError}</Text> : null}
                    <Text style={styles.label}>{translate('email')}</Text>
                    <TextInput
                        style={styles.text_input}
                        keyboardType='email-address'
                        value={email}
                        onChangeText={setEmail} />
                    {emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}
                    <Text style={styles.label}>{translate('p_address')}</Text>
                    <TextInput
                        style={styles.text_input}
                        value={address}
                        onChangeText={setAddress} />
                    {addressError ? <Text style={styles.errorMessage}>{addressError}</Text> : null}
                    <Text style={styles.label}>{translate('phone')}</Text>
                    <TextInput
                        style={styles.text_input}
                        keyboardType='number-pad'
                        value={phone}
                        onChangeText={setPhone} />
                    {phoneError ? <Text style={styles.errorMessage}>{phoneError}</Text> : null}
                    <Text style={styles.label}>{translate('password')}</Text>
                    <TextInput
                        secureTextEntry
                        style={styles.text_input}
                        keyboardType='default'
                        value={password}
                        onChangeText={setPassword} />
                    {passwordError ? <Text style={styles.errorMessage}>{passwordError}</Text> : null}
                    <Text style={styles.label}>{translate('password_re')}</Text>
                    <TextInput
                        secureTextEntry
                        style={styles.text_input}
                        keyboardType='default'
                        value={conPassword}
                        onChangeText={setConPassword} />
                    {conPasswordError ? <Text style={styles.errorMessage}>{conPasswordError}</Text> : null}
                </View>
                <View style={styles.view3}>
                    <TouchableOpacity onPress={() => validateForm()}>
                        <Text style={styles.reg_btn}>{translate('register')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.view4}>
                    <Text style={styles.label2}>{translate('already')}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.login_text}>{translate('login')}</Text>
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
    reg: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#000000",
        alignSelf: 'center',
        marginVertical: 20,
    },
    view2: {
        alignSelf: 'center',
    },
    label: {
        fontSize: 15,
        color: "#000000",
        marginBottom: 5,
    },
    text_input: {
        width: 300,
        height: 50,
        borderColor: "#000000",
        borderWidth: 2,
        borderRadius: 10,
        fontSize: 20,
        marginBottom: 5,
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
        marginVertical: 20,
    },
    errorMessage: {
        color: 'red',
        marginBottom: 5,
    },
    view4: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    label2: {
        fontSize: 18,
        color: '#000',
    },
    login_text: {
        textDecorationLine: 'underline',
        fontSize: 18,
        color: 'blue',
    }
});

export default RegisterScreen;