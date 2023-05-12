import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch, useSelector} from 'react-redux';
import {products} from '../common/Products';
import ProductItemCard from '../common/ProductItemCard';
import {addItemToCart, addItemToWishlist} from '../redux/actions/Actions';
import { LanguageContext } from '../LanguageContext';

// const data = [
//     {
//         id: 1, name: 'Laptop',
//         items: [
//             { id: 1, name: 'asus', source: require('../images/laptop1.png') },
//             { id: 2, name: 'dell', source: require('../images/laptop2.png') },
//             { id: 3, name: 'hp', source: require('../images/laptop3.png') },
//         ]
//     },
//     {
//         id: 2, name: 'Phone',
//         items: [
//             { id: 1, source: require('../images/phone1.png') },
//             { id: 2, source: require('../images/phone2.png') },
//         ]
//     },
//     {
//         id: 3, name: 'Backpack',
//         items: [
//             { id: 1, source: require('../images/bp1.png') },
//             { id: 2, source: require('../images/bp2.png') },
//         ]
//     },
// ]

const ProductScreen = ({navigation}) => {

  const { translate } = useContext(LanguageContext);

  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState([]);
  const [laptopList, setLaptopList] = useState([]);
  const [phoneList, setPhoneList] = useState([]);
  const [backpackList, setBackpackList] = useState([]);

  useEffect(() => {
    let categories = [];
    products.category.map(item => {
      categories.push(item.category);
    });
    setLaptopList(products.category[0].data);
    setPhoneList(products.category[1].data);
    setBackpackList(products.category[2].data);
    setCategoryList(categories);
  }, []);

  const items = useSelector(state => state);

  const [data, setData] = useState([]);

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
    {label: '', value: null},
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
    {label: '', value: null},
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
            style={{width: 150, position: 'relative', zIndex: 1, elevation: 1}}>
            <DropDownPicker
              style={{zIndex: 2, elevation: 2}}
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
            style={{width: 150, position: 'relative', zIndex: 1, elevation: 1}}>
            <DropDownPicker
              style={{zIndex: 2, elevation: 2}}
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
        <Text style={styles.product_title}>
          {products.category[0].category}
        </Text>
        <View style={styles.view3}>
          <FlatList
            data={laptopList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <ProductItemCard
                  item={item}
                  onAddToWishlist={(x) => {
                    dispatch(addItemToWishlist(x))
                  }}
                  onAddToCart={(x) => {
                    dispatch(addItemToCart(x));
                  }}
                />
              );
            }}
          />
        </View>
        <Text style={styles.product_title}>
          {products.category[1].category}
        </Text>
        <View style={styles.view3}>
          <FlatList
            data={phoneList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <ProductItemCard
                  item={item}
                  onAddToWishlist={(x) => {
                    dispatch(addItemToWishlist(x))
                  }}
                  onAddToCart={(x) => {
                    dispatch(addItemToCart(x));
                  }}
                />
              );
            }}
          />
        </View>
        <Text style={styles.product_title}>
          {products.category[2].category}
        </Text>
        <View style={styles.view3}>
          <FlatList
            data={backpackList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <ProductItemCard
                  item={item}
                  onAddToWishlist={(x) => {
                    dispatch(addItemToWishlist(x))
                  }}
                  onAddToCart={(x) => {
                    dispatch(addItemToCart(x));
                  }}
                />
              );
            }}
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
  view3: {
    marginTop: 20,
  },
  product_title: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    marginTop: 20,
    marginLeft: 20,
  },
  image_view: {
    backgroundColor: '#ffffff',
    padding: 15,
    width: 200,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
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
    alignSelf:'center',
    marginHorizontal:15,
  },
});

export default ProductScreen;
