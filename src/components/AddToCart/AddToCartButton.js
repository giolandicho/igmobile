import React from 'react';
import { TouchableHighlight, StyleSheet, Dimensions, Text, View, Image } from 'react-native';


const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;


export default function AddToCartButton(props){
    return(
        <TouchableHighlight style={styles.clickContainer}>
            <View style={styles.buttonContainer}>
                <Image style={styles.buttonIcon} source={require('../../../assets/icons/addtocartwhite.png')}/>
                <Text style={styles.buttonText}>Add To Cart</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    clickContainer: {
        marginTop:20,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#672767',
        width: SCREEN_WIDTH * 6 / 7,
        borderRadius:6,
        shadowColor: '#000',
        shadowOffset: {
        width: 2,
        height: 4
      },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3
    },
    buttonContainer:{
        flexDirection:'row',
    },
    buttonIcon:{
        height: 25,
        width:25,
        marginRight: 10,
    },
    buttonText:{
        fontSize:20,
        color:'white',
    }
})