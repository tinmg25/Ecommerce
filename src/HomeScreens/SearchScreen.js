import React, { useContext, useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { addItemToCart, addItemToWishlist } from '../redux/actions/Actions';
import { useDispatch } from 'react-redux';
import { LanguageContext } from "../LanguageContext";
import { API_KEY } from "../common/APIKey";
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from "react-native-dropdown-picker";
import { db } from '../config/firebase-config';
import { getDocs, collection, query, where } from "firebase/firestore";

const SearchScreen = () => {

    const navigation = useNavigation();

    const { translate } = useContext(LanguageContext);

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [products, setProducts] = useState([]);
    const [noItem, setNoItem] = useState(true);

    const [category, setCategory] = useState(null);
    const [categoryValue, setCategoryValue] = useState(null);
    const [categoryItems, setCategoryItems] = useState([]);

    const [brand, setBrand] = useState(null);
    const [brandValue, setBrandValue] = useState(null);
    const [brandItems, setBrandItems] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // const fetchData = async () => {
        //     const categoryResponse = await fetch(`${API_KEY}/api/category`);
        //     const categoryResult = await categoryResponse.json();
        //     setCategoryItems(categoryResult);

        //     const brandResponse = await fetch(`${API_KEY}/api/brand`);
        //     const brandResult = await brandResponse.json();
        //     setBrandItems(brandResult);
        // };

        // fetchData();
        const fetchFirebaseCategory = async () => {
            const categoryLists = await getDocs(collection(db, 'category'));
            const categoryData = categoryLists.docs.map(doc => ({
                label: doc.data().category_name,
                value: doc.id,
            }));
            setCategoryItems(categoryData);
        };
        fetchFirebaseCategory();
    }, []);

    useEffect(() => {
        const fetchFirebaseBrand = async () => {
            const brandLists = await getDocs(collection(db, 'brand'));
            const brandData = brandLists.docs.map(doc => ({
                label: doc.data().brand_name,
                value: doc.id
            }));
            setBrandItems(brandData);
        }
        fetchFirebaseBrand();
    }, []);

    const categoryItem = [
        { label: '', value: null },
        ...categoryItems.map(catItem => ({
            label: catItem.category_name,
            value: catItem.category_id,
        })),
    ];

    const brandItem = [
        { label: '', value: null },
        ...brandItems.map(bItem => ({
            label: bItem.brand_name,
            value: bItem.brand_id,
        })),
    ];

    const [categoryId, setCategoryId] = useState(null);
    const [brandId, setBrandId] = useState(null);

    useEffect(() => {
        // const searchProduct = async () => {
        //     try {

        //         if (categoryId !== null && brandId !== null) {
        //             const response = await fetch(`${API_KEY}/api/product/search?name=${name}&categoryId=${categoryId}&brandId=${brandId}`,
        //                 {
        //                     method: 'GET',
        //                     headers: {
        //                         'Content-Type': 'application/json',
        //                     },
        //                 });
        //             const data = await response.json();
        //             setProducts(data);
        //             setNoItem(data.length < 1);
        //         }
        //     } catch (error) {
        //         console.error(error);
        //     }
        // };
        // searchProduct();

    }, [name]);

    const searchProduct = async () => {
        // if (categoryValue !== null) {
        //     setCategoryId(categoryValue);
        // } else {
        //     setCategoryId('');
        // }

        // if (brandValue !== null) {
        //     setBrandId(brandValue);
        // } else {
        //     setBrandId('');
        // }
        try {
            const productQuery = query(
                collection(db, 'product_tbl')
            );
            const productSnapshot = await getDocs(productQuery);
            const productsData = productSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log('Products : ',productsData);
            const filteredProducts = productsData.filter(product =>
                product.product_name.toLowerCase().includes(name.toLowerCase())
              );
              console.log('Filtered Products:', filteredProducts);
              setProducts(filteredProducts);
              setNoItem(filteredProducts.length < 1);
        } catch (error) {
            console.log("Error Fetching Product", error);
        }
    };


    const clearProduct = () => {
        setProducts([]);
        setName('');
    };

    const navigateToProductDetails = product => {
        navigation.navigate('ProductDetails', { product });
    };

    const renderProduct = ({ item }) => (
        <View style={styles.search_item}>
            <TouchableOpacity onPress={() => navigateToProductDetails(item)}>
                <Image
                    source={item.image_url ? { uri: `data:image/jpeg;base64,${item.image}` } : require('../images/no_image.png')}
                    style={styles.product_img}
                    resizeMode='cover'
                />
            </TouchableOpacity>
            <View style={styles.text_view}>
                <Text style={styles.name_text}>{item.product_name}</Text>
                <Text style={styles.price_text}>$ {item.price}</Text>
            </View>
            <View style={styles.button_view}>
                <TouchableOpacity
                    style={styles.cart_btn}
                    onPress={() => {
                        dispatch(addItemToCart(item));
                    }}>
                    <Image source={require('../images/cart.png')} style={styles.logo_img} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => {
                        dispatch(addItemToWishlist(item));
                    }}>
                    <Image source={require('../images/like.png')} style={styles.logo_img} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.search_view}>
                <View style={styles.search_sub_view}>
                    <TextInput
                        style={styles.input}
                        placeholder={translate('search')}
                        value={name}
                        onChangeText={text => setName(text)} />
                    <TouchableOpacity
                        style={styles.search_touch}
                        onPress={searchProduct}>
                        <Image
                            style={styles.search_icon}
                            source={require('../images/search.png')} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.search_touch}
                    onPress={() => clearProduct()}>
                    <Image
                        style={styles.search_icon}
                        source={require('../images/clear.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.view2}>
                <View
                    style={{ width: 150, position: 'relative', zIndex: 1, elevation: 1 }}>
                    <DropDownPicker
                        style={{ zIndex: 2, elevation: 2 }}
                        open={category}
                        value={categoryValue}
                        items={categoryItems}
                        setOpen={setCategory}
                        setValue={setCategoryValue}
                        setItems={setCategoryItems}
                        placeholder={translate('category')}
                    />
                </View>
                <View
                    style={{ width: 150, position: 'relative', zIndex: 1, elevation: 1 }}>
                    <DropDownPicker
                        style={{ zIndex: 2, elevation: 2 }}
                        open={brand}
                        value={brandValue}
                        items={brandItems}
                        setOpen={setBrand}
                        setValue={setBrandValue}
                        setItems={setBrandItems}
                        placeholder={translate('brand')}
                    />
                </View>
            </View>
            <View style={styles.result_list}>
                {noItem ? (
                    <View style={styles.no_data}>
                        <Image style={styles.img} source={require('../images/empty_search.png')} />
                        <Text style={styles.no_search_text}>No Search Results</Text>
                    </View>
                ) : (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={products}
                        renderItem={renderProduct}
                        keyExtractor={item => item.id} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    search_view: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 10,
    },
    search_sub_view: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 30,
    },
    input: {
        width: 250,
        fontSize: 18,
        marginLeft: 10,
    },
    search_touch: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    search_icon: {
        width: 30,
        height: 30,
    },
    search_item: {
        flexDirection: 'row',
        elevation: 5,
        backgroundColor: '#fff',
        padding: 10,
        justifyContent: 'space-between',
    },
    product_img: {
        width: 100,
        height: 100,
    },
    text_view: {
        width: 100,
    },
    name_text: {
        color: '#000',
        fontSize: 20,
        fontWeight: '600',
    },
    price_text: {
        color: '#000',
        fontSize: 18,
    },
    button_view: {
        width: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    cart_btn: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        marginBottom: 5,
    },
    icon: {
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo_img: {
        width: 30,
        height: 30,
    },
    result_list: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    view2: {
        flexDirection: 'row',
        marginHorizontal: 15,
        justifyContent: 'space-around',
        position: 'relative',
        zIndex: 1,
        elevation: 1,
    },
    no_data: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    img: {
        width: 250,
        height: 250,
    },
    no_search_text: {
        fontSize: 18,
        color: '#000',
    },
});

export default SearchScreen;