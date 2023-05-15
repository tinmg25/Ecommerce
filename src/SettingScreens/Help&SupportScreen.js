import React, { useContext, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Image,
    ToastAndroid,
    TouchableOpacity,
} from 'react-native';
import { LanguageContext } from "../LanguageContext";
import { launchImageLibrary } from "react-native-image-picker";
import { API_KEY } from "../common/APIKey";
import { useNavigation } from "@react-navigation/native"

const HelpSupportScreen = () => {

    const navigation = useNavigation();

    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [imageSelected, setImageSelected] = useState(false);

    const [productNameError, setProductNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [priceError, setPriceError] = useState('');

    const handleProductName = (productName) => {
        const productNameRegex = /^[a-zA-Z0-9\s]*$/;
        return productNameRegex.test(productName);
    }

    const handleDescription = (description) => {
        const descriptionRegex = /^[a-zA-Z0-9\s]*$/;
        return descriptionRegex.test(description);
    }

    const handlePrice = (price) => {
        const priceRegex = /^\d+(\.\d{1,2})?$/;
        return priceRegex.test(price);
    }

    const handleInput = () => {
        if (productName.trim() === '') {
            setProductNameError('Please enter product name');
        } else if (!handleProductName(productName)) {
            setProductNameError('Product Name must be letters and numbers');
        } else {
            setProductNameError('');
        }

        if (description.trim() === '') {
            setDescriptionError('Please enter description');
        } else if (!handleDescription(description)) {
            setDescriptionError('Description must be letters and number');
        } else {
            setDescriptionError('');
        }

        if (price.trim() === '') {
            setPriceError('Please Enter Price');
        } else if (!handlePrice(price)) {
            setPriceError('Price must be numbers');
        } else {
            setPriceError('');
        }

        if (handleProductName(productName) && handleDescription(description) &&
            handlePrice(price)) {
            handleProduct();
        }
    }

    const handleProduct = async () => {
        try {
            const formData = new FormData();
            formData.append("productName", productName);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("image", {
                uri: image.uri,
                type: image.type,
                name: "product_image.jpg",
            });

            const response = await fetch(`${API_KEY}/api/product/save`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                ToastAndroid.show('Add Product Successfully', ToastAndroid.SHORT);
                navigation.navigate('Product');
            } else {
                ToastAndroid.show('Add Product Unsuccessful!');
            }
        } catch (error) {
            console.error('Something went wrong!', error);
        }
    }

    const openGallery = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel) {
                const selectedImage = response.assets ? response.assets[0] : response;
                setImage(selectedImage);
                setImageSelected(true);
            }
        });
    };


    const { translate } = useContext(LanguageContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{translate('faq')}</Text>
            <View style={styles.border}></View>
            <TextInput
                style={styles.input}
                value={productName}
                onChangeText={setProductName}
                placeholder="product name" />
            {productNameError ? <Text>{productNameError}</Text> : null}
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="description" />
            {descriptionError ? <Text>{descriptionError}</Text> : null}
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="price"
                keyboardType="numeric" />
            {priceError ? <Text>{priceError}</Text> : null}
            <TouchableOpacity style={styles.imageContainer} onPress={openGallery}>
                {image ? (
                    <Image style={styles.image} source={{ uri: image.uri }} />
                ) : (
                    <Text>No Image Selected</Text>
                )}
            </TouchableOpacity>
            <Button
                onPress={() => handleInput()}
                title='Add'
                color='red'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 30,
        color: '#000',
        textAlign: 'center',
    },
    border: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginHorizontal: 10,
    },
    input: {
        borderWidth: 1,
        marginVertical: 10,
    },
    imageContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: 10,
    },
});

export default HelpSupportScreen;