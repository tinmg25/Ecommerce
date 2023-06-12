import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import OrderItemCard from '../common/OrderItemCard';
import { API_KEY } from '../common/APIKey';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageContext } from '../LanguageContext';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { auth, db } from '../config/firebase-config';

const OrderListScreen = () => {

    const { translate } = useContext(LanguageContext);

    const [orderList, setOrderList] = useState({});
    const [orderId, setOrderId] = useState('');
    const [userData, setUserData] = useState(null);
    const [userDataFetched, setUserDataFetched] = useState(false);

    // useEffect(()=>{

    //     const getUserData = async () => {
    //         try{
    //             const mEmail = await AsyncStorage.getItem('EMAIL');
    //             if (mEmail !== null) {
    //                 const response = await fetch(`${API_KEY}/api/users/${mEmail}`, {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                     },
    //                     body: JSON.stringify({ mEmail })
    //                 });
    //                 const data = await response.json();
    //                 setUserData(data);
    //                 setUserDataFetched(true);
    //             }
    //         }catch(e){
    //             console.error(e);
    //         }
    //     }

    //     getUserData();
    // },[]);

    useEffect(() => {

        // const getOrder = async () => {
        //     if(userDataFetched){
                
        //         const userId = userData.user_id;
        //         try {
        //             const response = await fetch(`${API_KEY}/api/order/${userId}`, {
        //                 method: 'GET',
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                 },
        //                 body: JSON.stringify()
        //             });
        //             const data = await response.json();
        //             setOrderList(data);
        //         }
        //         catch (e) {
        //             console.error('Something went wrong!', e)
        //         }
        //     }
        // };

        // getOrder();

        const unsubscribe = auth.onAuthStateChanged(async(user)=>{
            if(user){
                const userEmail = user.email;
                const userQuery = query(collection(db,"user_mst"),where("email","==",userEmail));
                const userSnapshot = await getDocs(userQuery)
                const userId = userSnapshot.docs[0].id;
                const orderQuery = query(collection(db,"order_tbl"),where("user_id","==",userId));
                const orderSnapshot = await getDocs(orderQuery);
                const orderId = orderSnapshot.docs[0].id;
                setOrderId(orderId);
                if(!orderSnapshot.empty){
                    const orderData = orderSnapshot.docs.map((doc)=>doc.data());
                    setOrderList(orderData);
                }
                else {
                    setOrderList([]);
                }
            }
        })
    }, []);
    return (
        <View style={styles.container}>
            {!orderList ? (
                <Text style={styles.text}>{translate('no_order')}</Text>
            ) : (
                <FlatList
                    data={orderList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                        return (
                            <OrderItemCard
                                item={item}
                                orderId={orderId}
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
        alignSelf:'center',
        fontSize:20,
        color:'#000',
        fontWeight:'600',
    }
});

export default OrderListScreen;