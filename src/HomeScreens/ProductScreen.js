import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch, useSelector } from 'react-redux';
import { products } from '../common/Products';
import ProductItemCard from '../common/ProductItemCard';
import { addItemToCart, addItemToWishlist } from '../redux/actions/Actions';
import { LanguageContext } from '../LanguageContext';
import { API_KEY } from '../common/APIKey';

const ProductScreen = ({ navigation }) => {

  const { translate } = useContext(LanguageContext);

  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState([]);
  const [laptopList, setLaptopList] = useState([]);
  const [phoneList, setPhoneList] = useState([]);
  const [backpackList, setBackpackList] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const items = useSelector(state => state);

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_KEY}/api/product`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const renderProduct = ({ item }) => {
    return (
      <View style={styles.product_view}>
        <Image
          source={item.image ? { uri: `data:image/jpeg;base64,${item.image}` } : require('../images/no_image.png')}
          style={styles.product_img}
        />
        <Text style={styles.title}>{item.product_name}</Text>
        <Text style={styles.sub_label}>{item.description}</Text>
        <Text style={styles.sub_label}>Price: $ {item.price}</Text>
      </View>
    );
  };

  // useEffect(() => {
  //   fetch('http://192.168.64.91:8087/api/product')
  //     .then(response => response.json())
  //     .then(data => setData(data))
  //     .catch(error => console.log(error));
  // }, []);

  // const renderItem = ({item, onAddToCart}) => (
  //   <View>
  //     <Text style={styles.product_title}>{item.name}</Text>
  //     <FlatList
  //       data={data}
  //       renderItem={({item}) => (
  //         <View style={styles.image_view} key={item.product_id}>
  //           <TouchableOpacity
  //             onPress={() =>
  //               navigation.navigate('ProductDetail', {
  //                 productId: item.product_id,
  //                 productName: item.product_name,
  //                 productPrice: item.price,
  //                 productDesc: item.description,
  //               })
  //             }>
  //             <Text style={{fontSize: 50}}>Image</Text>
  //           </TouchableOpacity>
  //           <Text>{item.product_name}</Text>
  //           <Text>${item.price}</Text>
  //           <TouchableOpacity onPress={() => onAddToCart(item)}>
  //             <Text style={styles.cart}>Add to Cart</Text>
  //           </TouchableOpacity>
  //           <MaterialCommunityIcons
  //             style={styles.icon}
  //             name="heart"
  //             size={30}
  //           />
  //         </View>
  //       )}
  //       keyExtractor={item => item.product_id}
  //       horizontal={true}
  //       showsHorizontalScrollIndicator={false}
  //     />
  //   </View>
  // );

  const [category, setCategory] = useState(false);
  const [categoryValue, setCategoryValue] = useState(null);
  const [categoryItems, setCategoryItems] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('http://192.168.64.91:8087/api/category');
  //     const result = await response.json();
  //     setCategoryItems(result);
  //   };

  //   fetchData();
  // }, []);

  const categoryItem = [
    { label: '', value: null },
    ...categoryItems.map(catItem => ({
      label: catItem.category_name,
      value: catItem.category_id,
    })),
  ];

  const [brand, setBrand] = useState(false);
  const [brandValue, setBrandValue] = useState(null);
  const [brandItems, setBrandItems] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('http://192.168.64.91:8087/api/brand');
  //     const result = await response.json();
  //     setBrandItems(result);
  //   };

  //   fetchData();
  // }, []);

  const brandItem = [
    { label: '', value: null },
    ...brandItems.map(bItem => ({
      label: bItem.brand_name,
      value: bItem.brand_id,
    })),
  ];

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <Image source={require('../images/search.png')} style={styles.logo_img} />
          <TextInput
            style={styles.inputStyle}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder={translate('search')}
          />
        </View>
        <View style={styles.view2}>
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
        <View style={styles.category_view}>
          <FlatList
            data={products}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderProduct}
            keyExtractor={(item) => item.product_id}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  searchBar: {
    marginTop: 10,
    backgroundColor: '#F0EEEE',
    height: 50,
    borderRadius: 50,
    marginHorizontal: 15,
    flexDirection: 'row',
    marginBottom: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: 'center',
    marginHorizontal: 15,
  },
  view2: {
    flexDirection: 'row',
    marginHorizontal: 15,
    justifyContent: 'space-around',
    position: 'relative',
    zIndex: 1,
    elevation: 1,
  },
  category_view: {
    margin:10,
    borderBottomWidth:5,
    borderBottomColor:'gray',
  },
  product_view: {
    margin: 10,
    elevation:5,
    backgroundColor:'#fff',
    borderRadius:10,
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
    marginVertical: 5,
    marginLeft: 20,
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
    height: 200,
    margin:10,
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
    position: 'absolute',
    right: 10,
    top: 10,
  },
  logo_img: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    marginHorizontal: 15,
  },
});

export default ProductScreen;
