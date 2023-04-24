import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';

const RegisterScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('http://192.168.64.60:8087/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const data = await response.json();
            console.log("User Regisered", data);
        } catch (error) {
            console.error("Registration Failed", error);
        }
    };

    return (
        <View>
            <Text style={styles.reg}>Register</Text>
            <View style={styles.view2}>
                <Text style={styles.email_text}>Email Address</Text>
                <TextInput
                    style={styles.email_input}
                    value={email}
                    onChangeText={setEmail} />
                <Text style={styles.pwd_text}>Password</Text>
                <TextInput
                    secureTextEntry
                    style={styles.pwd_input}
                    value={password}
                    onChangeText={setPassword} />
                <Text style={styles.con_pwd_text}>Confirm Password</Text>
                <TextInput
                    secureTextEntry
                    style={styles.con_pwd_input} />
            </View>
            <View style={styles.view3}>
                <TouchableOpacity onPress={handleRegister}>
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
        paddingTop: 50,
        marginBottom: 20,
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
        marginBottom: 10,
        fontSize:20,
    },
    pwd_text: {
        fontSize: 15,
        color: "#000000",
        marginBottom: 10,
    },
    pwd_input: {
        width: 300,
        height: 50,
        borderColor: "#000000",
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 10,
        fontSize:20,
    },
    con_pwd_text: {
        fontSize: 15,
        color: "#000000",
        marginBottom: 10,
    },
    con_pwd_input: {
        width: 300,
        height: 50,
        borderColor: "#000000",
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 20,
        fontSize:20,
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
        width: 250,
        fontSize: 20,
        padding: 15,
        backgroundColor: '#618CFB',
        color: 'white',
        textAlign: 'center',
        borderRadius: 50,
    },
});

export default RegisterScreen;