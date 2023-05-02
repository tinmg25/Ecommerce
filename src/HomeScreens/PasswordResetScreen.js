import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import Mailer from 'react-native-mail';

const PasswordResetScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');

    const handlePassword = () => {
        const code = generateCode();

        const body = `Your Code is ${code}`;

        Mailer.mail({
            subject: 'Test Email',
            recipients: [email],
            body: body,
            isHTML: true,
        }, (error, event) => {
            if(error){
                ToastAndroid.show('Error sending email!',ToastAndroid.SHORT)
            } else {
                ToastAndroid.show('Email sent successfully!',ToastAndroid.SHORT)
            }
        });
    }

    const generateCode = () => {
        const code = '1234';
        return code;
    }

    return (
        <View>
            <Text style={styles.pwd_recovery}>Password Recovery</Text>
            <View style={styles.view2}>
                <Text style={styles.email_text}>Email Address</Text>
                <TextInput
                    style={styles.email_input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType='email-address'
                    autoCapitalize='none' />
            </View>
            <View style={styles.view3}>
                <TouchableOpacity onPress={() => handlePassword()}>
                    <Text style={styles.reg_btn}>Get Password</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.login_btn}>Already have account?</Text>
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