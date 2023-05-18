import React, { useContext, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    FlatList,
    ToastAndroid
} from 'react-native';
import { addItemToCart, addItemToWishlist } from '../redux/actions/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { LanguageContext } from "../LanguageContext";
import { API_KEY } from "../common/APIKey";
import { useNavigation } from '@react-navigation/native';
import SelectBox from "../SelectBox";

const SearchScreen = () => {

    const navigation = useNavigation();

    const { translate } = useContext(LanguageContext);

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [products, setProducts] = useState([]);
    const [noItem, setNoItem] = useState(true);

    const searchProduct = async () => {
        try {
            if (name !== '') {
                const response = await fetch(`${API_KEY}/api/product/search?name=${name}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setProducts(data);
                if(data.length < 1){
                    setNoItem(true);
                } else{
                    setNoItem(false);
                }
            }
            else {
                setNoItem(true);
            }
        } catch (error) {
            console.error(error);
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
                    source={item.image ? { uri: `data:image/jpeg;base64,${item.image}` } : require('../images/no_image.png')}
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
                        onPress={() => searchProduct()}>
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
            <SelectBox/>
            <View style={styles.result_list}>
                {noItem ? (
                    <Text style={styles.no_search_text}>No Search Results</Text>
                ) : (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={products}
                        renderItem={renderProduct}
                        keyExtractor={item => item.product_id} />
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
        width: 300,
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
        elevation:5,
        backgroundColor:'#fff',
        padding: 10,
        justifyContent:'space-between',
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
        padding:10,
    },
    no_search_text: {
        alignSelf:'center',
        fontSize: 20,
        color: '#000',
    }
});

export default SearchScreen;