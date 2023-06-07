import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image
} from 'react-native';
import { API_KEY } from '../common/APIKey';
import { LanguageContext } from '../LanguageContext';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useRoute } from '@react-navigation/native'

const OrderDetailScreen = () => {

    const { translate } = useContext(LanguageContext);

    const route = useRoute();
    const { orderId, orders } = route.params;

    const [orderDetailList, setOrderDetailList] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    const [orderDetailFetched, setOrderDetailFetched] = useState(false);

    // useEffect(() => {

    //     const getOrderDetail = async () => {

    //         try {
    //             const orderId = orders.order_id;
    //             const orderResponse = await fetch(`${API_KEY}/api/order/detail/${orderId}`);
    //             const orderData = await orderResponse.json();
    //             setOrderDetailList(orderData);
    //             setOrderDetailFetched(true);
    //         }
    //         catch (e) {
    //             console.error('Fetch data unsuccessful!', e)
    //         }
    //     };

    //     getOrderDetail();

    // }, []);

    useEffect(() => {
        // const getProductDetail = async () => {
        //     if (orderDetailFetched) {
        //         try {
        //             const productIds = orderDetailList.map((order) => order.product_id);
        //             const productResponse = await Promise.all(
        //                 productIds.map((productId) => fetch(`${API_KEY}/api/product/detail/${productId}`))
        //             );
        //             const productDataArray = await Promise.all(
        //                 productResponse.map((response) => response.json())
        //             );
        //             setProductDetails(productDataArray);

        //         } catch (e) {
        //             console.error('Fetch data unsuccesful!', e)
        //         }
        //     }
        // };

        // getProductDetail();

        const getFirestoreOrderDetails = async () => {

            const orderDetailsQuery = query(collection(db, "order_details"), where("order_id", "==", orderId));
            const orderDetailsSnapshot = await getDocs(orderDetailsQuery);

            if (!orderDetailsSnapshot.empty) {

                const orderDetailsData = orderDetailsSnapshot.docs.map((doc) => doc.data());
                setOrderDetailList(orderDetailsData);

                const productIds = orderDetailsData.map((order) => order.product_id);
                const productDataQuery = query(collection(db, "product_tbl"));
                const productDataSnapshot = await getDocs(productDataQuery);

                if (!productDataSnapshot.empty) {
                    const productDataArray = productDataSnapshot.docs.map((doc) => {
                        const data = doc.data();
                        return {
                            ...data,
                            document_id: doc.id,
                        };
                    });
                    setProductDetails(productDataArray);
                }
            }
        }
        getFirestoreOrderDetails();
    }, []);

    const orderDetailItem = ({ item }) => {

        const productDetail = productDetails.find(
            (product) => product.document_id === item.product_id
        );
        // console.log(productDetail);
        return (
            <View style={styles.main_view}>
                <View style={styles.sub_view}>
                    <Text style={styles.label_text}>{translate('name')} - {item.product_name}</Text>
                    <Text style={styles.label_text}>{translate('qty')} - {item.quantity}</Text>
                    <Text style={styles.label_text}>{translate('price')} - $ {item.price}</Text>
                </View>
                <View>
                    {/* {productDetail
                        ?
                        <View style={styles.image_view}>
                            <Image
                                source={productDetail.image_url ? { uri: productDetail.image_url } : require('../images/no_image.png')}
                                style={styles.product_img}
                                resizeMode='cover'
                            />
                        </View>
                        : <Text>Loading</Text>
                    } */}
                    <Image
                        style={styles.product_img}
                        source={require('../images/no_image.png')} />
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={orderDetailList}
                renderItem={orderDetailItem}
                keyExtractor={(item) => item.id}
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
        borderBottomColor: '#04144F',
    },
    sub_view: {
        justifyContent: 'space-around',
    },
    label_text: {
        fontSize: 18,
        color: '#000',
        fontWeight: '600',
    },
    product_img: {
        width: 100,
        height: 100,
    },
});

export default OrderDetailScreen;