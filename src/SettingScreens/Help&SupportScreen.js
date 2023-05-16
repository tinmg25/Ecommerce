import React, { useContext, useState, useEffect } from "react";
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
import DropDownPicker from 'react-native-dropdown-picker';

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
            console.log(categoryValue);
            console.log(brandValue);
            const formData = new FormData();
            formData.append("categoryId",categoryValue);
            formData.append("brandId",brandValue);
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

    //category select box
    const [category, setCategory] = useState(false);
    const [categoryValue, setCategoryValue] = useState(null);
    const [categoryItems, setCategoryItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://192.168.64.91:8087/api/category');
            const result = await response.json();
            setCategoryItems(result);
        };
        fetchData();
    }, []);

    const categoryItem = [
        { label: '', value: null },
        ...categoryItems.map(catItem => ({
            label: catItem.category_name,
            value: catItem.category_id,
        })),
    ];

    //brand select box
    const [brand, setBrand] = useState(false);
    const [brandValue, setBrandValue] = useState(null);
    const [brandItems, setBrandItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://192.168.64.91:8087/api/brand');
            const result = await response.json();
            setBrandItems(result);
        };
        fetchData();
    }, []);

    const brandItem = [
        { label: '', value: null },
        ...brandItems.map(bItem => ({
            label: bItem.brand_name,
            value: bItem.brand_id,
        })),
    ];

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
            <View style={styles.select_box}>
                <View
                    style={{ width: 150, position: 'relative', zIndex: 1, elevation: 1 }}>
                    <DropDownPicker
                        style={{ zIndex: 2, elevation: 2 }}
                        open={category}
                        value={categoryValue}
                        items={categoryItem}
                        setOpen={setCategory}
                        setValue={setCategoryValue}
                        setItems={setCategoryItems}
                        placeholder="Category"
                    />
                </View>
                <View
                    style={{ width: 150, position: 'relative', zIndex: 1, elevation: 1 }}>
                    <DropDownPicker
                        style={{ zIndex: 2, elevation: 2 }}
                        open={brand}
                        value={brandValue}
                        items={brandItem}
                        setOpen={setBrand}
                        setValue={setBrandValue}
                        setItems={setBrandItems}
                        placeholder="Brand"
                    />
                </View>
            </View>
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
    select_box: {
        flexDirection: 'row',
        marginHorizontal: 15,
        justifyContent: 'space-around',
        position: 'relative',
        zIndex: 1,
        elevation: 1,
        marginBottom:20,
      },
});

export default HelpSupportScreen;