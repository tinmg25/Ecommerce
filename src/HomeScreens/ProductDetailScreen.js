import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { LanguageContext } from "../LanguageContext";
import { API_KEY } from "../common/APIKey";

const ProductDetailScreen = ({ route }) => {

    const { translate } = useContext(LanguageContext);

    const { product } = route.params;

    const [categoryName, setCategoryName] = useState('');
    const [brandName, setBrandName] = useState('');

    //category name
    useEffect(() => {
        const getCategoryName = async () => {
            const categoryResponse = await fetch(`${API_KEY}/api/category/${product.category_id}`);
            if (!categoryResponse.ok) {
                throw new Error(categoryResponse.status);
            }
            const categoryData = await categoryResponse.json();
            setCategoryName(categoryData.category_name);
        }

        getCategoryName();
    }, []);

    //brand name
    useEffect(() => {
        const getBrandName = async () => {
            const brandResponse = await fetch(`${API_KEY}/api/brand/${product.brand_id}`);
            if(!brandResponse.ok){
                throw new Error(brandResponse.status);
            }
            const brandData = await brandResponse.json();
            setBrandName(brandData.brand_name);
        }

        getBrandName();
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={product.image ? { uri: `data:image/jpeg;base64,${product.image}` } : require('../images/no_image.png')}
                style={styles.product_img}
            />
            <Text style={styles.text}>{translate('name')} - {product.product_name}</Text>
            <Text style={styles.text}>{translate('description')} - {product.description}</Text>
            <Text style={styles.text}>{translate('price')} - $ {product.price}</Text>
            <Text style={styles.text}>{translate('category')} - {categoryName}</Text>
            <Text style={styles.text}>{translate('brand')} - {brandName}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    product_img: {
        alignSelf: 'center',
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
        color: '#000',
        marginLeft: 20,
        marginBottom: 10,
    },
});

export default ProductDetailScreen;