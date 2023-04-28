import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';

const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
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

    const handlePhone = (phone) => {
        const phoneRegex = /^[0-9]{11}$/;
        return phoneRegex.test(phone);
    }

    const handlePassword = (password) => {
        const passwordRegex = /^.{8,}$/;
        return passwordRegex.test(password);

    }

    const handleConPassword = (conPassword) => {
        return conPassword === password;
    }

    const validateForm = () => {
        if (name.trim() === '') {
            setNameError('Please Enter Username');
        } else if (!handleUserName(name)) {
            setNameError('Please Enter Only Characters in Name');
        } else {
            setNameError('');
        }

        if (email.trim() === '') {
            setEmailError('Please Enter Email');
        } else if (!handleEmail(email)) {
            setEmailError('Please Enter Correct Format in Email');
        } else {
            setEmailError('');
        }

        if (phone.trim() === '') {
            setPhoneError('Please Enter Phone No.');
        } else if (!handlePhone(phone)) {
            setPhoneError('Please Enter Only Numbers in Phone Number');
        } else {
            setPhoneError('');
        }

        if (password.trim() === '') {
            setPasswordError('Please Enter Password');
        } else if (!handlePassword(password)) {
            setPasswordError('Password must be at leaset 8 characters');
        } else {
            setPasswordError('');
        }

        if (conPassword.trim() === '') {
            setConPasswordError('Please Enter Confirm Password');
        } else if (!handleConPassword(conPassword)) {
            setConPasswordError('Password do not match');
        } else {
            setConPasswordError('');
        }

        if (handleUserName(name) && handleEmail(email) && handlePhone(phone) &&
            handlePassword(password) && handleConPassword(conPassword)) {
            handleRegister();
        }
    }


    const handleRegister = async () => {
        try {
            const response = await fetch('http://192.168.64.56:8087/api/register', {
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

    return (
        <View>
            <Text style={styles.reg}>Register</Text>
            <View style={styles.view2}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.text_input}
                    keyboardType='default'
                    value={name}
                    onChangeText={setName} />
                {nameError ? <Text style={styles.errorMessage}>{nameError}</Text> : null}
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    style={styles.text_input}
                    keyboardType='email-address'
                    value={email}
                    onChangeText={setEmail} />
                {emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}
                <Text style={styles.label}>Phone No.</Text>
                <TextInput
                    style={styles.text_input}
                    keyboardType='number-pad'
                    value={phone}
                    onChangeText={setPhone} />
                {phoneError ? <Text style={styles.errorMessage}>{phoneError}</Text> : null}
                <Text style={styles.label}>Password</Text>
                <TextInput
                    secureTextEntry
                    style={styles.text_input}
                    keyboardType='default'
                    value={password}
                    onChangeText={setPassword} />
                {passwordError ? <Text style={styles.errorMessage}>{passwordError}</Text> : null}
                <Text style={styles.label}>Confirm Password</Text>
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
                    <Text style={styles.reg_btn}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.login_btn}>Back to Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    login_btn: {
        width: 250,
        fontSize: 20,
        padding: 15,
        backgroundColor: '#618CFB',
        color: 'white',
        textAlign: 'center',
        borderRadius: 50,
    },
    errorMessage: {
        color: 'red',
        marginBottom:5,
    },
});

export default RegisterScreen;