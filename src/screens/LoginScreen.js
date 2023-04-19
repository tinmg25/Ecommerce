import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await fetch('http://192.168.64.73:8087/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                navigation.navigate('Product');
            } else {
                Alert.alert(
                    'Invalid email or password',
                    'Please check your login credentials and try again!',
                    [
                        {
                            text: 'OK',
                        }
                    ],
                    {
                        cancelable: false,
                    }
                );
            }
        }
        catch (e) {
            setError("Something went wrong");
        }
    };

    return (
        <View>
            <View style={styles.view1}>
                <Text style={styles.logo}>HL</Text>
                <Image style={styles.img} source={require('../images/square.png')} />
            </View>
            <Text style={styles.login}>Login</Text>
            <View style={styles.view2}>
                <Text style={styles.email_text}>Email Address</Text>
                <TextInput
                    style={styles.email_input}
                    onChangeText={setEmail} />
                <Text style={styles.pwd_text}>Password</Text>
                <TextInput
                    secureTextEntry
                    style={styles.pwd_input}
                    onChangeText={setPassword} />
            </View>
            <View style={styles.view3}>
                <TouchableOpacity onPress={handleLogin}>
                    <Text style={styles.login_btn}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.reg_btn}>Register</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.view4}>
                <TouchableOpacity onPress={() => navigation.navigate('PasswordReset')}>
                    <Text style={styles.forgot_pwd}>forgot password?</Text>
                </TouchableOpacity>
            </View>
            {error && <Text>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    view1: {
        height: 250,
        backgroundColor: "#04144F",
        borderBottomStartRadius: 25,
        borderBottomEndRadius: 25,
        alignItems: 'center',
    },
    logo: {
        fontSize: 120,
        color: "#FFFFFF",
        fontStyle: "italic",
        fontWeight: "bold",
        position: "relative",
        marginVertical: 30,
    },
    img: {
        height: 30,
        width: 30,
        transform: [{ rotate: '45deg' }],
        position: "absolute",
        top: 100,
        left: 150,
    },
    view2: {
        alignSelf: 'center',
    },
    login: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#000000",
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
    },
    view3: {
        marginTop: 20,
        alignSelf: 'center',
    },
    login_btn: {
        width: 250,
        fontSize: 20,
        padding: 15,
        backgroundColor: '#04144F',
        color: 'white',
        textAlign: 'center',
        borderRadius: 50,
        marginBottom: 10,
    },
    reg_btn: {
        width: 250,
        fontSize: 20,
        padding: 15,
        backgroundColor: '#618CFB',
        color: 'white',
        textAlign: 'center',
        borderRadius: 50,
    },
    view4: {
        alignItems: 'flex-end',
        paddingRight: 10,
        paddingTop: 20,
    },
    forgot_pwd: {
        color: '#618CFB',
        textDecorationColor: "#618CFB",
        textDecorationLine: "underline",

    },
    alertContainer: {
        borderRadius:50,
        borderColor:'#04144F',
        borderWidth:2,
    }
});

export default LoginScreen;