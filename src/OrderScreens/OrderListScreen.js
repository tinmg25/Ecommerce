import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList
} from 'react-native';
import OrderItemCard from '../common/OrderItemCard';

const OrderListScreen = ({ navigation }) => {

    const [orderList, setOrderList] = useState({});

    useEffect(() => {

        const getOrder = async () => {
            try {
                const response = await fetch('http://192.168.64.91:8087/api/order', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify()
                });
                const data = await response.json();
                setOrderList(data);
            }
            catch (e) {
                console.error('Something went wrong!', e)
            }
        };
        getOrder();
    }, []);
    return (
        <View style={styles.container}>
            <FlatList
                data={orderList}
                renderItem={({ item, index }) => {
                    return (
                        <OrderItemCard
                            item={item}
                        />
                    );
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    }
});

export default OrderListScreen;