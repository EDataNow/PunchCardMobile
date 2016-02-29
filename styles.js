'use strict';
import React, {
  AppRegistry,
  Component,
  Images,
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';

const styles = StyleSheet.create({
  LaunchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2058C0',
  },
  LogoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2058C0',
    paddingTop: 50,
  },
  InteractionContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A7A6B7',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  LogoImage:{
    height:200,
    width:200,
  },
  welcome: {
    fontSize: 42,
    textAlign: 'center',
    margin: 10,
    color:'white',
    fontFamily: 'SIMPLIFICA'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = styles;