import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductDetailScreen = ({ navigation }) => {
    return (
        <View>
            <View style={styles.view1}>
                <TouchableOpacity 
                    style={{alignSelf:'flex-end',marginRight:10,marginTop:5}}
                    onPress={()=>navigation.navigate('ViewCart')}>
                    <MaterialCommunityIcons
                        style={styles.cart}
                        name='cart'
                        size={30} />
                </TouchableOpacity>
                <Image
                    style={styles.image}
                    source={require('../images/laptop1.png')}
                    resizeMode="center" />
            </View>
            <View style={styles.view2}>
                <Text style={styles.stock}>Remaining Stock - </Text>
                <Text style={styles.title}>ASUS Vivobook S15 S530</Text>
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