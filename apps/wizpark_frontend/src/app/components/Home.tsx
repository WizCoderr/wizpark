import { Text, StyleSheet, View, Image } from 'react-native'
import React, { Component } from 'react'
export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
            source={require("../../assets/bg.jpg")}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
     backgroundColor:'#000',  

    }
})