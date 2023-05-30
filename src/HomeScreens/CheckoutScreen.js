import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ToastAndroid,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearCart } from '../redux/actions/Actions';
import { useDispatch } from 'react-redux';
import { LanguageContext } from '../LanguageContext';
import { API_KEY } from '../common/APIKey';

const CheckoutScreen = ({ route }) => {
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const { translate } = useContext(LanguageContext);

    const { cartData } = route.params;

    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState({});
    const [total, setTotal] = useState(0);

    useEffect(() => {

        const totalAmount = Object.values(cartData).reduce((total, item) => total + item.price, 0);
        setTotal(totalAmount);

        const getData = async () => {
            try {
                const mEmail = await AsyncStorage.getItem('EMAIL');
                if (mEmail !== null) {
                    const response = await fetch(`${API_KEY}/api/users/${mEmail}`, {
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
                    setAddressInput(data.address || '');
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
            setNameError(translate('name_error'));
        } else if (!handleName(nameInput)) {
            setNameError(translate('name_format'));
        } else {
            setNameError('');
        }

        if (emailInput.trim() === '') {
            setEmailError(translate('mail_error'));
        } else if (!handleEmail(emailInput)) {
            setEmailError(translate('mail_format'));
        } else {
            setEmailError('');
        }

        if (addressInput.trim() === '') {
            setAddressError(translate('address_error'));
        } else if (!handleAddress(addressInput)) {
            setAddressError(translate('address_format'));
        } else {
            setAddressError('');
        }

        if (phoneInput.trim() === '') {
            setPhoneError(translate('phone_error'));
        } else if (phoneInput.length < 11) {
            setPhoneError(translate('phone_format1'));
        } else if (!handlePhone(phoneInput)) {
            setPhoneError(translate('phone_format2'));
        } else {
            setPhoneError('');
        }

        if (townshipInput.trim() === '') {
            setTownshipError(translate('township_error'));
        } else if (!handleTownship(townshipInput)) {
            setTownshipError(translate('township_format'));
        } else {
            setTownshipError('');
        }

        if (postalInput.trim() === '') {
            setPostalError(translate('postal_code'));
        } else if (postalInput.length < 6) {
            setPostalError(translate('postal_format1'));
        } else if (!handlePostal(postalInput)) {
            setPostalError(translate('postal_format2'));
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

            const groupedCartData = Object.values(cartData).reduce((result, item) => {
                if (result[item.product_id]) {
                    result[item.product_id].quantity += 1;
                } else {
                    result[item.product_id] = { ...item, quantity: 1 };
                }
                return result;
            }, {});

            const orderRequest = {
                userId: userId,
                addressInput: addressInput,
                phoneInput: phoneInput,
                townshipInput: townshipInput,
                postalInput: postalInput,
                total: total,
                orderDetails: Object.values(groupedCartData),
            };

            const response = await fetch(`${API_KEY}/api/order/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderRequest),
            });

            if (response.ok) {
                navigation.navigate('Products');
            } else {
                ToastAndroid.show('Order Unsuccessful!', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Something went wrong!', error);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior='none'
            style={styles.container}>
            <ScrollView>
                <View style={styles.view1}>
                    <Text style={styles.title}>{translate('shipping_address')}</Text>
                    <TextInput
                        style={styles.textbox}
                        placeholder={translate('p_name')}
                        value={nameInput}
                        onChangeText={setNameInput} />
                    {nameError ? <Text style={styles.errorMessage}>{nameError}</Text> : null}
                    <TextInput
                        style={styles.textbox}
                        placeholder={translate('p_email')}
                        value={emailInput}
                        onChangeText={setEmailInput} />
                    {emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}
                    <TextInput
                        style={styles.textbox}
                        placeholder={translate('p_address')}
                        value={addressInput}
                        onChangeText={setAddressInput} />
                    {addressError ? <Text style={styles.errorMessage}>{addressError}</Text> : null}
                    <TextInput
                        style={styles.textbox}
                        placeholder={translate('p_phone')}
                        value={phoneInput}
                        onChangeText={setPhoneInput} />
                    {phoneError ? <Text style={styles.errorMessage}>{phoneError}</Text> : null}
                    <TextInput
                        style={styles.textbox}
                        placeholder={translate('township')}
                        value={townshipInput}
                        onChangeText={setTownshipInput} />
                    {townshipError ? <Text style={styles.errorMessage}>{townshipError}</Text> : null}
                    <TextInput
                        style={styles.textbox}
                        placeholder={translate('postal_code')}
                        value={postalInput}
                        onChangeText={setPostalInput} />
                    {postalError ? <Text style={styles.errorMessage}>{postalError}</Text> : null}
                </View>
                <TouchableOpacity onPress={() => handleCheckout()}>
                    <Text style={styles.order}>{translate('order_now')}</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    order: {
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