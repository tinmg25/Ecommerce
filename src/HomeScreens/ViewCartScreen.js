import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
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
          <Image style={styles.img} source={require('../images/empty_cart.png')} />
          <Text style={styles.no_item}>{translate('no_item')}</Text>
        </View>
      )}
      {cartData.length > 0 ? (
        <TouchableOpacity onPress={() => navigation.navigate('Checkout', { cartData })}>
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
    justifyContent: 'space-evenly',
  },
  no_item: {
    fontSize: 18,
    color: '#000',
  },
  img: {
    width: 350,
    height: 400,
  },
});

export default ViewCartScreen;
