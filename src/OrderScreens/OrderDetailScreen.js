import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderDetailScreen = ({ route }) => {

    const { item } = route.params;

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

    return (
        <View style={styles.container}>
            <View style={styles.sub_view}>
                <Text style={styles.label_head}>Order Id : </Text>
                <Text style={styles.label_text}>{item.order_id}</Text>
            </View>
            <View style={styles.sub_view}>
                <Text style={styles.label_head}>User Id : </Text>
                <Text style={styles.label_text}>{item.user_id}</Text>
            </View>
            <View style={styles.sub_view}>
                <Text style={styles.label_head}>Shipping Address : </Text>
                <Text style={styles.label_text}>{item.shipping_address_id}</Text>
            </View>
            <View style={styles.sub_view}>
                <Text style={styles.label_head}>Phone No. : </Text>
                <Text style={styles.label_text}>{item.phone_number}</Text>
            </View>
            <View style={styles.sub_view}>
                <Text style={styles.label_head}>Township : </Text>
                <Text style={styles.label_text}>{item.township}</Text>
            </View>
            <View style={styles.sub_view}>
                <Text style={styles.label_head}>Postal Code : </Text>
                <Text style={styles.label_text}>{item.postal_code}</Text>
            </View>
            <View style={styles.sub_view}>
                <Text style={styles.label_head}>Total Amount : </Text>
                <Text style={styles.label_text}>{item.total_amount}</Text>
            </View>
            <View style={styles.sub_view}>
                <Text style={styles.label_head}>Order Status : </Text>
                <Text style={styles.label_text}>{statusText}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    sub_view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        paddingBottom:10,
        marginBottom:10,
    },
    label_head: {
        fontSize: 18,
        color: '#000',
        alignSelf: 'center',
        fontWeight: '600',
    },
    label_text: {
        fontSize: 15,
        color: '#000',
        textDecorationLine: 'underline',
    }
});

export default OrderDetailScreen;