import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CheckoutScreen = () => {
    return (
        <View>
            <TouchableOpacity>
                <Text style={styles.payment}>Checkout Screen</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    payment: {
        width:250,
        fontSize: 20,
        padding: 15,
        backgroundColor: '#04144F',
        color: 'white',
        textAlign: 'center',
        borderRadius: 50,
        marginBottom:10,
    }
});

export default CheckoutScreen;