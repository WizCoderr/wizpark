import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

export default class   Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/bg.jpg')}
          style={styles.logo}  
        />
        <View style={styles.contentContainer}>  
          <Text style={styles.title}>Welcome to Your App</Text>
          <View style={styles.con}>
            <Text style={styles.title}>Sign-in as</Text>
          </View>
          <View style={styles.contain}>
          <TouchableOpacity style={styles.button} onPress={() => this.handleButtonClick()}>
            <Text style={styles.buttonText}>Commuter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.handleButtonClick()}>
            <Text style={styles.buttonText}>Corporation</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  handleButtonClick() {
    // Implement your button logic here
    console.log('Button clicked');
  }
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%',
    display: 'flex',
    justifyContent:'center',
    alignItems: 'flex-start',
    color: 'white',
  },
  logo: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
  },
  contentContainer: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  con:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  contain:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  button: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },


});