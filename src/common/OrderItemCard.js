import React from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderItemCard = ({ item }) => {

    const navigation = useNavigation();

    let statusText;
    switch (item.status) {
        case 1:
            statusText = 'Pending';
            break;
        case 2:
            statusText = 'Delivered';
            break;
        case 3:
            statusText = 'Canceled';
            break;
        default:
            statusText = 'Unknown';
    }

    const orderDate = new Date(item.order_date);

    // Get the formatted date string (dd/MM/yyyy)
    const formattedDate = orderDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Order Id - {item.order_id}</Text>
            <Text style={styles.label}>Order Date - {formattedDate}</Text>
            <Text style={styles.label}>Total Amount- $ {item.total_amount}</Text>
            <Text style={styles.label}>Order Status - {statusText}</Text>
            <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('OrderDetails',{ orders : item })}>
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
        fontWeight:'bold',
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