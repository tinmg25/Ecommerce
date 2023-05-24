import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { API_KEY } from "./common/APIKey";
import { LanguageContext } from "./LanguageContext";

const SelectBox = ({ categoryId, brandId}) => {

  const { translate } = useContext(LanguageContext);

  const [category, setCategory] = useState(null);
  const [categoryValue, setCategoryValue] = useState(null);
  const [categoryItems, setCategoryItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const categoryResponse = await fetch(`${API_KEY}/api/category`);
      const categoryResult = await categoryResponse.json();
      setCategoryItems(categoryResult);

      const brandResponse = await fetch(`${API_KEY}/api/brand`);
      const brandResult = await brandResponse.json();
      setBrandItems(brandResult);
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

  const [brand, setBrand] = useState(null);
  const [brandValue, setBrandValue] = useState(null);
  const [brandItems, setBrandItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      
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
  return (
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
          placeholder={translate('category')}
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
          placeholder={translate('brand')}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  view2: {
    flexDirection: 'row',
    marginHorizontal: 15,
    justifyContent: 'space-around',
    position: 'relative',
    zIndex: 1,
    elevation: 1,
  },
});

export default SelectBox;
