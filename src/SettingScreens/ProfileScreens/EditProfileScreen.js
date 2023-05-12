import React, { useContext, useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    ToastAndroid,
    Alert
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from "../../config/theme";
import { useNavigation } from '@react-navigation/native'
import { LanguageContext } from "../../LanguageContext";
import { API_KEY } from "../../common/APIKey";

const EditProfileScreen = ({ route }) => {

    const { translate } = useContext(LanguageContext);

    const navigation = useNavigation();

    const { userData } = route.params;

    const [name, setName] = useState(userData.name || '');
    const [email, setEmail] = useState(userData.email || '');
    const [address, setAddress] = useState(userData.address || '');
    const [phone, setPhone] = useState(userData.phone_number || '');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const handleName = (name) => {
        const nameRegex = /^[a-zA-Z\s]+$/;
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
    }

    const handleTextbox = () => {
        if (name.trim() === '') {
            setNameError(translate('name_error'));
        } else if (!handleName(name)) {
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
            setPhoneError(translate('phone_format2'));
        } else {
            setPhoneError('');
        }

        if (handleName(name) && handleEmail(email) &&
            handleAddress(address) && handlePhone(phone)) {
            handleUpdate();
        }

    }

    const handleUpdate = async () => {
        try {
            const userId = userData.user_id;
            const response = await fetch(`${API_KEY}/api/users/update/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    address,
                    phone,
                })
            });
            if (response.ok) {
                navigation.navigate('UserProfile');
            }
            else {
                ToastAndroid.show('Update Unsuccessful!', ToastAndroid.SHORT);
            }
        } catch (e) {
            console.error('Something went wrong!', e);
        }
    };

    return (
        <View style={styles.container}>
            <MaterialCommunityIcons style={[styles.user_icon, { color: theme.color }]} name='account' size={150} />
            <View style={styles.view1}>
                <Text style={styles.label}>{translate('p_name')}</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName} />
                {nameError ? <Text style={styles.errorMessage}>{nameError}</Text> : null}
                <Text style={styles.label}>{translate('p_email')}</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail} />
                {emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}
                <Text style={styles.label}>{translate('p_address')}</Text>
                <TextInput
                    style={styles.input}
                    value={address}
                    onChangeText={setAddress} />
                {addressError ? <Text style={styles.errorMessage}>{addressError}</Text> : null}
                <Text style={styles.label}>{translate('p_phone')}</Text>
                <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone} />
                {phoneError ? <Text style={styles.errorMessage}>{phoneError}</Text> : null}
                <TouchableOpacity onPress={() => handleTextbox()}>
                    <Text style={styles.update_btn}>{translate('update')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    user_icon: {
        alignSelf: 'center',
        color: '#000',
    },
    view1: {
        padding: 10,
    },
    label: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        fontSize: 20,
    },
    update_btn: {
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

export default EditProfileScreen;