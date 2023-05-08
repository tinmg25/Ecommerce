import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderItemCard = ({ item }) => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Order Id - {item.order_id}</Text>
            <Text style={styles.label}>Order Date - {item.order_date}</Text>
            <Text style={styles.label}>Total Amount- $ {item.total_amount}</Text>
            <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('OrderDetails',{ item : item })}>
                <Image source={require('../images/detail.png')} style={styles.detail_img}/>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        elevation: 5,
        marginHorizontal: 20,
        marginVertical:10,
        backgroundColor:'#fff',
        borderRadius:10,
    },
    label: {
        fontSize: 15,
        color: '#000',
    },
    icon: {
        width: 40,
        height: 40,
        position:'absolute',
        top:'50%',
        right:10,
    },
    detail_img: {
        width:30,
        height:30,
    }
});

export default OrderItemCard;