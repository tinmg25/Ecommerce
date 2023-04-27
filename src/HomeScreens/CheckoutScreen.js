import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CheckoutScreen = ({ navigation }) => {

    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [addressInput, setAddressInput] = useState('');
    const [phoneInput, setPhoneInput] = useState('');
    const [townshipInput, setTownshipInput] = useState('');
    const [postalInput, setPostalInput] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [townshipError, setTownshipError] = useState('');
    const [postalError, setPostalError] = useState('');

    const handleName = (nameInput) => {
        const nameRegex = /^[a-zA-Z\s]*$/;
        return nameRegex.test(nameInput);
    };

    const handleEmail = (emailInput) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailInput);
    };

    const handleAddress = (addressInput) => {
        const addressRegex = /^[a-zA-Z0-9\s]*$/;
        return addressRegex.test(addressInput);
    };

    const handlePhone = (phoneInput) => {
        const phoneRegex = /^[0-9]{11}$/;
        return phoneRegex.test(phoneInput);
    }

    const handleTownship = (townshipInput) => {
        const townshipRegex = /^[a-zA-Z0-9\s]*$/;
        return townshipRegex.test(townshipInput);
    }

    const handlePostal = (postalInput) => {
        const postalRegex = /^[0-9]{6}$/;
        return postalRegex.test(postalInput);
    }

    const handleCheckout = () => {
        if (nameInput.trim() === '') {
            setNameError('Please Enter Name');
        } else if (!handleName(nameInput)) {
            setNameError('Please Enter Only Characters in Name');
        } else {
            setNameError('');
        }

        if (emailInput.trim() === '') {
            setEmailError('Please Enter Email');
        } else if (!handleEmail(emailInput)) {
            setEmailError('Please Enter Correct Format in Email');
        } else {
            setEmailError('');
        }

        if (addressInput.trim() === '') {
            setAddressError('Please Enter Address');
        } else if (!handleAddress(addressInput)) {
            setAddressError('Please Enter Only Characters and Numbers in Address');
        } else {
            setAddressError('');
        }

        if (phoneInput.trim() === '') {
            setPhoneError('Please Enter Phone Number');
        } else if (!handlePhone(phoneInput)) {
            setPhoneError('Please Enter Only Numbers in Phone Number');
        } else {
            setPhoneError('');
        }

        if (townshipInput.trim() === '') {
            setTownshipError('Please Enter Towhship');
        } else if (!handleTownship(townshipInput)) {
            setTownshipError('Please Enter Only Characters in Township');
        } else {
            setTownshipError('');
        }

        if (postalInput.trim() === '') {
            setPostalError('Please Enter Postal Code');
        } else if (!handlePostal(postalInput)) {
            setPostalError('Please Enter Only Numbers in Postal Code');
        } else {
            setPostalError('');
        }

        if(handleName(nameInput) && handleEmail(emailInput) && 
        handleAddress(addressInput) && handlePhone(phoneInput) && 
        handleTownship(townshipInput) && handlePostal(postalInput)){
            navigation.navigate('OrderList');
        }
    };

    return (
        <View>
            <View style={styles.view1}>
                <Text style={styles.title}>Add Shipping Address</Text>
                <TextInput
                    style={styles.textbox}
                    placeholder='Name'
                    value={nameInput}
                    onChangeText={setNameInput} />
                {nameError ? <Text style={styles.errorMessage}>{nameError}</Text> : null}
                <TextInput
                    style={styles.textbox}
                    placeholder='Email'
                    value={emailInput}
                    onChangeText={setEmailInput} />
                {emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}
                <TextInput
                    style={styles.textbox}
                    placeholder='Address'
                    value={addressInput}
                    onChangeText={setAddressInput} />
                {addressError ? <Text style={styles.errorMessage}>{addressError}</Text> : null}
                <TextInput
                    style={styles.textbox}
                    placeholder='Phone'
                    value={phoneInput}
                    onChangeText={setPhoneInput} />
                {phoneError ? <Text style={styles.errorMessage}>{phoneError}</Text> : null}
                <TextInput
                    style={styles.textbox}
                    placeholder='Township'
                    value={townshipInput}
                    onChangeText={setTownshipInput} />
                {townshipError ? <Text style={styles.errorMessage}>{townshipError}</Text> : null}
                <TextInput
                    style={styles.textbox}
                    placeholder='Postal Code'
                    value={postalInput}
                    onChangeText={setPostalInput} />
                {postalError ? <Text style={styles.errorMessage}>{postalError}</Text> : null}
            </View>
            <TouchableOpacity onPress={() => handleCheckout()}>
                <Text style={styles.payment}>Go To Payment</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    view1: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
    },
    textbox: {
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
        fontSize: 20,
    },
    payment: {
        alignSelf: 'center',
        width: 250,
        fontSize: 20,
        padding: 15,
        backgroundColor: '#04144F',
        color: 'white',
        textAlign: 'center',
        borderRadius: 50,
        marginBottom: 10,
    },
    errorMessage: {
        color:'red',
    },
});

export default CheckoutScreen;