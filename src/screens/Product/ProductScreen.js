import React, { useLayoutEffect, useRef, useState } from "react";
import { ScrollView, Text, View, Image, Dimensions, TouchableHighlight } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { getCategoryName, getCategoryById } from "../../data/MockDataAPI";
import BackButton from "../../components/BackButton/BackButton";
import AddToCartButton from "../../components/AddToCart/AddToCartButton";
//import ViewIngredientsButton from "../../components/ViewIngredientsButton/ViewIngredientsButton";
import { StyleSheet } from 'react-native';

const { width: viewportWidth } = Dimensions.get("window");

export default function ProductScreen(props) {
  const { navigation, route } = props;

  const item = route.params?.item;
  const category = getCategoryById(item.categoryId);
  const title = getCategoryName(category.id);

  const [activeSlide, setActiveSlide] = useState(0);

  const slider1Ref = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: "true",
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  

  return (
    <ScrollView style={styles.container}>
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
      <View style={styles.infoRecipeContainer}>
        <Text style={styles.infoRecipeName}>{item.title}</Text>
        <View style={styles.infoContainer}>
          <TouchableHighlight onPress={() => navigation.navigate("RecipesList", { category, title })}>
            <Text style={styles.category}>{getCategoryName(item.categoryId).toUpperCase()}</Text>
          </TouchableHighlight>
        </View>
        <AddToCartButton/>
        <View style={styles.infoContainer}>
          <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1
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
      height: 250,
      marginTop:100
    },
    paginationContainer: {
      flex: 1,
      position: 'absolute',
      alignSelf: 'center',
      paddingVertical: 8,
      marginTop: 200
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 0
    },
    infoRecipeContainer: {
      flex: 1,
      margin: 25,
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center'
    },
    infoContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    infoPhoto: {
      height: 20,
      width: 20,
      marginRight: 0
    },
    infoRecipe: {
      fontSize: 14,
      fontWeight: 'bold',
      marginLeft: 5,
    },
    category: {
      fontSize: 16,
      fontWeight: 'bold',
      margin: 10,
      color: '#672767'
    },
    infoDescriptionRecipe: {
      textAlign: 'left',
      fontSize: 16,
      marginTop: 30,
      margin: 15
    },
    infoRecipeName: {
      fontSize: 28,
      margin: 10,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center'
    }
  });
  