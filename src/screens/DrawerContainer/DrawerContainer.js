import React from "react";
import { View, StyleSheet, Image } from "react-native";
import MenuButton from "../../components/MenuButton/MenuButton";

export default function DrawerContainer(props) {
  const { navigation } = props;
  return (
    <View style={styles.content}>
      <View style={styles.container}>
      <Image style = {styles.image} source = {{ uri: "https://cdn.shopify.com/s/files/1/0064/0296/5568/files/ifigourmet-provisions-logo_a28cd063-3b60-4ee4-b42c-379bddefc629_600x.png?v=1637187074"}}/>

        <MenuButton
          title="HOME"
          source={require("../../../assets/icons/home.png")}
          onPress={() => {
            navigation.navigate("Home");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="CATEGORIES"
          source={require("../../../assets/icons/category.png")}
          onPress={() => {
            navigation.navigate("Categories");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="SEARCH"
          source={require("../../../assets/icons/search.png")}
          onPress={() => {
            navigation.navigate("Search");
            navigation.closeDrawer();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    content: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    container: {
      marginTop:80,  
      flex: 1,
      alignItems: 'flex-start',
      paddingHorizontal: 20
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: "contain",
        marginLeft:20,
    },
  });
