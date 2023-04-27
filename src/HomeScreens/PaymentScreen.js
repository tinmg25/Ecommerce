import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';

const PaymentScreen = ({ navigation }) => {
    return (
        <View>
            <Text style={styles.title}>Choose Payment Method</Text>
            <View style={styles.image_view}>
                <TouchableOpacity>
                    <Image style={styles.image} source={{ uri: 'https://img.icons8.com/color/48/null/jcb.png' }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.image} source={{ uri: 'https://img.icons8.com/color/48/null/visa.png' }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.image} source={{ uri: 'https://img.icons8.com/color/48/null/mastercard.png' }} />
                </TouchableOpacity>
            </View>
            <View style={styles.form_view}>
                <Text style={styles.label}>Card Number</Text>
                <TextInput style={styles.textbox} />
                <Text style={styles.label}>Name</Text>
                <TextInput style={styles.textbox} />
                <View style={styles.sub_view}>
                    <View>
                        <Text style={styles.label}>Expire Date</Text>
                        <TextInput style={styles.small_textbox} />
                    </View>
                    <View>
                        <Text style={styles.label}>Security Code</Text>
                        <TextInput style={styles.small_textbox} />
                    </View>
                </View>
            </View>
            <TouchableOpacity>
                <Text>Image</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                <Text style={styles.payment}>Pay Now</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        padding: 10,
    },
    image_view: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    image: {
        width: 100,
        height: 115,
        borderRadius: 10,
    },
    form_view: {
        marginHorizontal: 10,
    },
    sub_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 20,
        color: '#000',
    },
    textbox: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#000000',
        marginVertical: 10,
    },
    small_textbox: {
        width: 150,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#000000',
        marginVertical: 10,
    },
    paypal: {
        alignSelf: 'center',
        width: 300,
        height: 100,
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
    }
});

export default PaymentScreen;