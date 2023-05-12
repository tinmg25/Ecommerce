import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CardItemCard from '../common/CartItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromWishlist } from '../redux/actions/Actions';
import { LanguageContext } from '../LanguageContext';

const WishlistScreen = ({ navigation }) => {

    const { translate } = useContext(LanguageContext);

    const [cartList, setCartList ] = useState([]);
    const cartData = useSelector( state => state.reducers2);
    const dispatch = useDispatch();
    
    return (
        <View style={styles.main_view}>
            {cartData.length > 0 ? (
                <FlatList 
                data={cartData}
                renderItem={({item,index}) => {
                    return <CardItemCard 
                    isWishList={('a')}
                    item={item} 
                    onRemoveFromWishList={()=>{
                        dispatch(removeItemFromWishlist(index))
                    }}
                    onAddToCart={(x)=>{
                        dispatch(addItemToCart(x));
                    }}/>;
                }}/>
            ):(
                <View style={styles.sub_view}>
                    <Text>{translate('no_wishlist')}</Text>
                </View>
            )}
            
        </View>
    )
}

const styles = StyleSheet.create({
    main_view: {
        flex:1,
    },
    sub_view: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
})

export default WishlistScreen;