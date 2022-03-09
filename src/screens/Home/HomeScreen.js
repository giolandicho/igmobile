import React, { useLayoutEffect, useRef, useState } from "react";
import { FlatList, Text, View, TouchableHighlight, Image, StyleSheet, Dimensions } from "react-native";
import { ProductCard } from '../../AppStyles';
import { products } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName } from "../../data/MockDataAPI";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { homeCarousel } from "../../data/dataArrays";

const { width: viewportWidth } = Dimensions.get("window");


export default function HomeScreen(props) {
  const [activeSlide, setActiveSlide] = useState(0);
  const { navigation } = props;
  const slider1Ref = useRef();
  const item = homeCarousel;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const onPressProduct = (item) => {
    navigation.navigate("Product", { item });
  };

  const renderProducts = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressProduct(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );
  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={products} renderItem={renderProducts} keyExtractor={(item) => `${item.productId}`} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: ProductCard.container,
  photo: ProductCard.photo,
  title: ProductCard.title,
  category: ProductCard.category,
  
});