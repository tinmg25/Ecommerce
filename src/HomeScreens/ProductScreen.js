import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import SelectBox from '../SelectBox';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, addItemToWishlist } from '../redux/actions/Actions';
import { LanguageContext } from '../LanguageContext';
import { API_KEY } from '../common/APIKey';

const ProductScreen = ({ navigation }) => {

  const { translate } = useContext(LanguageContext);

  const { width } = Dimensions.get('screen');
  const imageWidth = width;

  const dispatch = useDispatch();

  useEffect(() => {
    fetchCategories();
  }, []);

  const items = useSelector(state => state);

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const categoryResponse = await fetch(`${API_KEY}/api/category`);
      const categoriesData = await categoryResponse.json();

      const productResponse = await fetch(`${API_KEY}/api/product`);
      const productsData = await productResponse.json();

      const categoriesWithProducts = categoriesData.map(category => {
        const filteredProducts = productsData.filter(product => product.category_id === category.category_id);
        return { ...category, products: filteredProducts };
      });

      setCategories(categoriesWithProducts);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  const navigateToProductDetails = product => {
    navigation.navigate('ProductDetails', { product });
  };

  const renderProduct = ({ item }) => {
    return (
      <View style={styles.product_view}>
        <TouchableOpacity onPress={() => navigateToProductDetails(item)}>
          <Image
            source={item.image ? { uri: `data:image/jpeg;base64,${item.image}` } : require('../images/no_image.png')}
            style={styles.product_img}
            resizeMode='cover'
          />
        </TouchableOpacity>
        <Text style={styles.label1}>{item.product_name}</Text>
        <View style={styles.sub_view}>
          <Text style={styles.label2}>{'$' + item.price}</Text>
          <TouchableOpacity
            style={styles.cart_btn}
            onPress={() => {
              dispatch(addItemToCart(item));
            }}>
            <Text style={{fontFamily:'NotoSerifJP-Black'}}>{translate('add_to_cart')}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            dispatch(addItemToWishlist(item));
          }}>
          <Image source={require('../images/like.png')} style={styles.logo_img} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderCategoryItem = ({ item }) => {

    return (
      <View>
        <Text style={styles.title}>{item.category_name}</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={item.products}
          renderItem={renderProduct}
          keyExtractor={product => product.product_id}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        style={[styles.img,{width:imageWidth}]}
        resizeMode='contain'
        source={require('../images/background_img.png')} />
      <View style={styles.category_view}>
        <FlatList
          style={styles.category_list}
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.category_id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width:'100%',
    height:'32%',
  },
  category_view: {
    flex: 1,
  },
  product_view: {
    marginLeft: 10,
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
    marginVertical: 5,
    marginLeft: 10,
  },
  sub_label: {
    fontSize: 15,
    color: '#000',
    fontWeight: '600',
    marginVertical: 5,
    marginLeft: 20,
  },
  product_img: {
    width: 200,
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cart: {
    alignSelf: 'flex-end',
    borderRadius: 20,
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
    width: 100,
    backgroundColor: '#04144F',
    color: '#fff',
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 5,
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo_img: {
    width: 30,
    height: 30,
  },
  label1: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    marginTop: 10,
    fontFamily: 'NotoSerifJP-Black'
  },
  sub_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  label2: {
    fontSize: 18,
    fontWeight: '600',
  },
  cart_btn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    fontFamily: 'NotoSerifJP-Black'
  },
  category_list: {
    marginVertical: 10,
  },
});

export default ProductScreen;
