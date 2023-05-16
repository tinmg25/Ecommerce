import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import CardItemCard from '../common/CartItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToWishlist, removeItemFromCart } from '../redux/actions/Actions';
import { LanguageContext } from '../LanguageContext';

const ViewCartScreen = ({ navigation }) => {

  const { translate } = useContext(LanguageContext);

  const cartData = useSelector(state => state.reducers);
  const dispatch = useDispatch();

  return (
    <View style={styles.main_view}>
      {/* <View style={styles.main_view}>
                <View>
                    <Text>Image</Text>
                    <Text style={styles.title}></Text>
                    <Text style={styles.price}>Price : $</Text>
                </View>
                <View style={styles.view2}>
                    <TouchableOpacity onPress={()=>decrement()}>
                        <MaterialCommunityIcons name='minus-box' size={30} />
                    </TouchableOpacity>
                    <Text style={styles.count}>{count}</Text>
                    <TouchableOpacity onPress={increment}>
                        <MaterialCommunityIcons name='plus-box' size={30} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.horizontal_line}></View>
            <View style={styles.button_view}>
                <TouchableOpacity onPress={()=>navigation.navigate('Checkout')}>
                    <Text style={styles.button}>Checkout</Text>
                </TouchableOpacity>
            </View> */}
      {cartData.length > 0 ? (
        <FlatList
          data={cartData}
          renderItem={({ item, index }) => {
            return (
              <CardItemCard
                item={item}
                onAddWishList={x => {
                  dispatch(addItemToWishlist(x));
                }}
                onRemoveFromCart={() => {
                  dispatch(removeItemFromCart(index));
                }}
              />
            );
          }}
        />
      ) : (
        <View style={styles.no_data}>
          <Text>{translate('no_item')}</Text>
        </View>
      )}
      {cartData.length > 0 ? (
        <TouchableOpacity onPress={()=>navigation.navigate('Checkout',{cartData})}>
          <Text style={styles.button}>{translate('checkout')}</Text>
        </TouchableOpacity>
      ) : null}

    </View>
  );
};

const styles = StyleSheet.create({
  main_view: {
    flex: 1,
  },
  //   view1: {},
  //   view2: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     justifyContent: 'space-between',
  //   },
  //   image: {
  //     width: 150,
  //     height: 150,
  //     borderRadius: 10,
  //   },
  //   title: {
  //     fontSize: 15,
  //     color: 'black',
  //   },
  //   price: {
  //     fontSize: 15,
  //     color: 'black',
  //   },
  //   count: {
  //     fontSize: 15,
  //     marginHorizontal: 15,
  //   },
  //   horizontal_line: {
  //     borderWidth: 1,
  //     borderColor: 'gray',
  //     marginHorizontal: 15,
  //     marginVertical: 10,
  //   },
  //   button_view: {
  //     flex: 1,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
  button: {
    width: 250,
    fontSize: 20,
    padding: 15,
    backgroundColor: '#04144F',
    color: '#fff',
    textAlign: 'center',
    borderRadius: 50,
    marginBottom: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  no_data: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ViewCartScreen;
