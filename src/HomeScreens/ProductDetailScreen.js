import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

const ProductDetailScreen = ({ route }) => {

    const { product } = route.params;

    return (
        <View style={styles.container}>
            <Image
                source={product.image ? { uri: `data:image/jpeg;base64,${product.image}` } : require('../images/no_image.png')}
                style={styles.product_img}
            />
            <Text style={styles.text}>- {product.product_name}</Text>
            <Text style={styles.text}>- {product.description}</Text>
            <Text style={styles.text}>- $ {product.price}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:20,
    },
    product_img:{
        alignSelf:'center',
        width:200,
        height:200,
        marginBottom:10,
    },
    text: {
        fontSize: 20,
        color:'#000',
        marginLeft:20,
        marginBottom:10,
    },
});

export default ProductDetailScreen;