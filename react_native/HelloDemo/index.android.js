/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

class HelloDemo extends Component {
  constructor(props) {
    super(props);
  
    this.state = {zip:''};
  }
  render() {
    return (
     <View style={styles.container}>
      <Text sytle={styles.welcome}>
      you input {this.state.zip}
      </Text>
      <TextInput style={styles.input} 
      onSubmitEditting={(event)=>{console.log(event);this.setState({zip:event.nativeEvent.text})}}/>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input:{
    width:20,
    fontSize:20,
    borderWidth:2,
    height:40
  }
});

AppRegistry.registerComponent('HelloDemo', () => HelloDemo);
