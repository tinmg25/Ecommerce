import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductDetailScreen = ({ route, navigation }) => {

    const { productId,productName,productPrice,productDesc } = route.params;

    return (
        <View>
            <View style={styles.view1}>
                <TouchableOpacity 
                    style={{alignSelf:'flex-end',marginRight:10,marginTop:5}}
                    onPress={()=>navigation.navigate('ViewCart',
                    {
                        productId,
                        productName,
                        productPrice,
                        productDesc
                    })}>
                    <MaterialCommunityIcons
                        style={styles.cart}
                        name='cart'
                        size={30} />
                </TouchableOpacity>
                <Text style={{fontSize:50}}>Image</Text>
            </View>
            <View style={styles.view2}>
                <Text style={styles.stock}>Remaining Stock - </Text>
                <Text style={styles.title}>{productDesc}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view1: {
        alignItems: 'center',
    },
    cart: {
        color: 'black',
        alignSelf: 'center',
    },
    image: {
        width: 300,
        height: 300,
    },
    view2: {
        alignItems: 'center',
    },
    stock: {
        color: 'black',
    },
    title: {
        fontSize: 30,
        color: 'black',
    }
});

export default ProductDetailScreen;