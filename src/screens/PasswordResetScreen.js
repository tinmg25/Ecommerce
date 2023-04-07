import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const PasswordResetScreen = ({ navigation }) => {
    return(
        <View>
            <Text style={styles.pwd_recovery}>Password Recovery</Text>
            <View style={styles.view2}>
                <Text style={styles.email_text}>Email Address</Text>
                <TextInput style={styles.email_input}/>
            </View>
            <View style={styles.view3}>
                <TouchableOpacity>
                    <Text style={styles.reg_btn}>Get Password</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                    <Text style={styles.login_btn}>Back to Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pwd_recovery: {
        fontSize:35,
        fontWeight:"bold",
        color:"#000000",
        alignSelf:'center',
        paddingTop:50,
        marginBottom:50,
    },
    view2:{
        alignSelf:'center',
    },
    email_text:{
        fontSize: 15,
        color:"#000000",
        marginBottom:10,
    },
    email_input:{
        width:300,
        height:50,
        borderColor:"#000000",
        borderWidth:2,
        borderRadius:10,
        marginBottom:50,
    },
    view3:{
        alignSelf:'center',
    },
    reg_btn:{
        width:250,
        fontSize: 20,
        padding: 15,
        backgroundColor: '#04144F',
        color: 'white',
        textAlign: 'center',
        borderRadius: 50,
        marginBottom:20,
    },
    login_btn:{
        width:250,
        fontSize: 20,
        padding: 15,
        backgroundColor: '#618CFB',
        color: 'white',
        textAlign: 'center',
        borderRadius: 50,
    },
});

export default PasswordResetScreen;