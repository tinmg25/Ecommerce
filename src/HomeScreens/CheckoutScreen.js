import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TextInput, 
    ToastAndroid, 
    KeyboardAvoidingView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckoutScreen = ({ route }) => {
    const navigation = useNavigation();

    const { cartData } = route.params;

    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState({});
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const totalAmount = cartData.reduce((total, item) => total + item.price, 0);
        setTotal(totalAmount);

        const getData = async () => {
            try {
                const mEmail = await AsyncStorage.getItem('EMAIL');
                if (mEmail !== null) {
                    const response = await fetch(`http://192.168.64.91:8087/api/${mEmail}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ mEmail })
                    });
                    const data = await response.json();

                    setUserData(data);
                    setUserId(data.user_id || '');
                    setNameInput(data.name || '');
                    setEmailInput(data.email || '');
                    setPhoneInput(data.phone_number || '');
                }
            }
            catch (e) {
            }
        };
        getData();
    }, []);

    const [nameInput, setNameInput] = useState(userData.name || '');
    const [emailInput, setEmailInput] = useState(userData.email || '');
    const [addressInput, setAddressInput] = useState('');
    const [phoneInput, setPhoneInput] = useState(userData.phone || '');
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
        } else if (postalInput.length < 6){
            setPostalError('Postal Code must be at least 6 characters');
        } else if (!handlePostal(postalInput)) {
            setPostalError('Please Enter Only Numbers in Postal Code');
        } else {
            setPostalError('');
        }

        if (handleName(nameInput) && handleEmail(emailInput) &&
            handleAddress(addressInput) && handlePhone(phoneInput) &&
            handleTownship(townshipInput) && handlePostal(postalInput)) {
                handleOrder();
        }
    };

    const handleOrder = async () => {
        try {
            const response = await fetch('http://192.168.64.91:8087/api/order/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId,
                    addressInput,
                    phoneInput,
                    townshipInput,
                    postalInput,
                    total
                })
            });
            const data = await response.json();
            if (response.ok) {
                navigation.navigate('OrderList');
            }
            else {
                ToastAndroid.show('Order Unsuccessful!', ToastAndroid.SHORT);
            }
        }
        catch (error) {
            console.error('Something was wrong!', error)
        }
    }

    return (
        <KeyboardAvoidingView behavior='padding'>
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
                <Text style={styles.payment}>Order now</Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
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
        color: 'red',
    },
});

export default CheckoutScreen;