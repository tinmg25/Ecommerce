import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const CheckoutScreen = ({ navigation }) => {
    return (
        <View>
            <View style={styles.view1}>
                <Text style={styles.title}>Add Shipping Address</Text>
                <TextInput style={styles.textbox} placeholder='Name'/>
                <TextInput style={styles.textbox} placeholder='Email'/>
                <TextInput style={styles.textbox} placeholder='Address'/>
                <TextInput style={styles.textbox} placeholder='Phone'/>
                <TextInput style={styles.textbox} placeholder='Township'/>
                <TextInput style={styles.textbox} placeholder='Postal Code'/>
            </View>
            <TouchableOpacity onPress={()=> navigation.navigate('Payment')}>
                <Text style={styles.payment}>Go To Payment</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    view1: {
        padding:10,
    },
    title: {
        fontSize:20,
        color:'#000',
        fontWeight:'bold',
    },
    textbox: {
        borderWidth:1,
        borderRadius:5,
        marginVertical:10,
        fontSize:20,
    },
    payment: {
        alignSelf:'center',
        width:250,
        fontSize: 20,
        padding: 15,
        backgroundColor: '#04144F',
        color: 'white',
        textAlign: 'center',
        borderRadius: 50,
        marginBottom:10,
    },
});

export default CheckoutScreen;