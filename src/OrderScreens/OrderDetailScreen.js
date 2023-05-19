import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image
} from 'react-native';
import { API_KEY } from '../common/APIKey';

const OrderDetailScreen = ({ route }) => {

    const { orders } = route.params;

    const [orderDetailList, setOrderDetailList] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    const [orderDetailFetched, setOrderDetailFetched] = useState(false);

    useEffect(() => {

        const getOrderDetail = async () => {

            try {
                const orderId = orders.order_id;
                const orderResponse = await fetch(`${API_KEY}/api/order/detail/${orderId}`);
                const orderData = await orderResponse.json();
                setOrderDetailList(orderData);
                setOrderDetailFetched(true);
            }
            catch (e) {
                console.error('Fetch data unsuccessful!', e)
            }
        };

        getOrderDetail();

    }, []);

    useEffect(() => {
        const getProductDetail = async () => {
            if (orderDetailFetched) {
                try {
                    const productIds = orderDetailList.map((order) => order.product_id);
                    const productResponse = await Promise.all(
                        productIds.map((productId) => fetch(`${API_KEY}/api/product/detail/${productId}`))
                    );
                    const productDataArray = await Promise.all(
                        productResponse.map((response) => response.json())
                    );
                    setProductDetails(productDataArray);

                } catch (e) {
                    console.error('Fetch data unsuccesful!', e)
                }
            }
        };

        getProductDetail();
    }, [orderDetailFetched]);

    const orderDetailItem = ({ item }) => {

        const productDetail = productDetails.flat().find(
            (product) => product.product_id === item.product_id
        );

        return (
            <View style={styles.main_view}>
                <View style={styles.sub_view}>
                    {productDetail
                        ? <Text style={styles.label_text}>Name - {productDetail.product_name}</Text>
                        : <Text>Loading</Text>
                    }
                    <Text style={styles.label_text}>Qty - {item.quantity}</Text>
                    <Text style={styles.label_text}>Price - $ {item.price}</Text>
                </View>
                <View>
                    {productDetail
                        ?
                        <View style={styles.image_view}>
                            <Image
                                source={item.image ? { uri: `data:image/jpeg;base64,${item.image}` } : require('../images/no_image.png')}
                                style={styles.product_img}
                                resizeMode='cover'
                            />
                        </View>
                        : <Text>Loading</Text>
                    }
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={orderDetailList}
                renderItem={orderDetailItem}
                keyExtractor={(item) => item.order_detail_id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor:'#04144F',
    },
    sub_view: {
        justifyContent: 'space-around',
    },
    label_text: {
        fontSize: 15,
        color: '#000',
        fontWeight: '600',
    },
    product_img: {
        width: 100,
        height: 100,
    },
});

export default OrderDetailScreen;