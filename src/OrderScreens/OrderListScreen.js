import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import OrderItemCard from '../common/OrderItemCard';
import { API_KEY } from '../common/APIKey';

const OrderListScreen = () => {

    const [orderList, setOrderList] = useState({});

    useEffect(() => {

        const getOrder = async () => {
            try {
                const response = await fetch(`${API_KEY}/api/order`, {
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
            {orderList.length === 0 ? (
                <Text style={styles.text}>No Orders</Text>
            ) : (
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
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
    },
    text: {
        fontSize:20,
        color:'#000',
        fontWeight:'600',
    }
});

export default OrderListScreen;