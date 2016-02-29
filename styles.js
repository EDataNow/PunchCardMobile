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
  signIn: {
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D93A3A',
    borderRadius: 20
  },
  signInLabel:{
    fontSize: 30,
    textAlign: 'center',
    margin: 5,
    color:'white',
    fontFamily: 'SIMPLIFICA'
  },
  inputField:{
    height: 36,
    width: 250,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  InteractionContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A7A6B7',
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