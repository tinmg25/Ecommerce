import React, { useState, useContext, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    Linking
} from 'react-native';
import { LanguageContext } from '../LanguageContext';
import { API_KEY } from '../common/APIKey';

const PasswordResetScreen = ({ navigation }) => {
    
    const { translate } = useContext(LanguageContext);

    const [email, setEmail] = useState('');

    const comment = 'your password';

    const url = `mailto:${email}?body=${comment}`;

    const handlePassword = async () => {
        try{
            const mEmail = email;
            const emailResponse = await fetch(`${API_KEY}/api/users/${mEmail}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({mEmail})
            });
            if(emailResponse.ok){
                handleEmailSend();
            } else {

            }
        }catch(e){
            ToastAndroid.show('Email does not exist',ToastAndroid.SHORT);
        }
    };

    const handleEmailSend = useCallback(async () => {
        console.log(url);
        const supported = await Linking.canOpenURL(url);

        if(supported){
            await Linking.openURL(url);
        }
    },[url]);

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
                <TouchableOpacity onPress={() => handlePassword()}>
                    <Text style={styles.reg_btn}>{translate('get_pwd')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.login_btn}>{translate('already')}</Text>
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
        fontSize: 15,
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
    login_btn: {
        textDecorationLine:'underline',
        textDecorationColor:'#000',
        alignSelf:'center',
        fontSize:15,
        color:'#000',
    },
});

export default PasswordResetScreen;