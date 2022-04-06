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

  const renderCarousel = () => {
    return(
      <View style={styles.carouselContainer}>
        <View style={styles.carousel}>
          <Carousel
            ref={slider1Ref}
            data={item.photosArray}
            renderItem={renderImage}
            sliderWidth={viewportWidth}
            itemWidth={viewportWidth}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            firstItem={0}
            loop={false}
            autoplay={false}
            autoplayDelay={500}
            autoplayInterval={3000}
            onSnapToItem={(index) => setActiveSlide(0)}
          />
          <Pagination
            dotsLength={item.photosArray.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotColor="rgba(255, 255, 255, 0.92)"
            dotStyle={styles.paginationDot}
            inactiveDotColor="white"
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={slider1Ref.current}
            tappableDots={!!slider1Ref.current}
          />
        </View>  
      </View>
    )
  }

  return (
    <View>
      <FlatList 
        vertical 
        showsVerticalScrollIndicator={false} 
        numColumns={2} 
        data={products} 
        renderItem={renderProducts} 
        keyExtractor={(item) => `${item.productId}`}
        ListHeaderComponent={renderCarousel} 
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: ProductCard.container,
  photo: ProductCard.photo,
  title: ProductCard.title,
  category: ProductCard.category,
  paginationContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 8,
    marginTop: 200
  },
  carouselContainer: {
    minHeight: 250
  },
  carousel: {},
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 250,
    resizeMode: 'contain',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    height: 250
  },
  paginationContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 8,
    marginTop: 100
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0
  },
  
});