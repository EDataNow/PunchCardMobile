'use strict';
import React, {
  AppRegistry,
  Component,
  Images,
  Navigator,
  StyleSheet,
  Text,
  Dimensions,
  View
} from 'react-native';

const windowDims = Dimensions.get('window');

const styles = StyleSheet.create({
  LaunchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2058C0',
  },
  listContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#2058C0',
  },
  MasterContainer:{
    backgroundColor: '#2058C0',
  },
  MasterContainer2:{
    flex:1,
    backgroundColor: '#2058C0',
  },
  listView: {
    height: windowDims.height,
    backgroundColor: '#3E97FF',
  },
  separator:{
    height: 1,
    backgroundColor: '#dddddd'
  },
  rowContainer: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#3E97FF',
    borderColor:'grey',
    borderWidth:1
  },
  navbar: {
    height:65,
    flexDirection:'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#3E97FF',
  },
  navButton:{
    height:40,
    width:40,
    marginTop:20,
    marginRight:50,
    marginLeft:10
  },
  headerText:{
    color:'#D93A3A',
    fontFamily: 'SIMPLIFICA',
    fontSize: 42,
    textAlign: 'center',
    marginLeft: 30,
    marginRight:20,
    marginTop: 22
  },
  LogoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2058C0',
    paddingTop: 50,
  },
  InteractionContainer:{
    flex:4,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#2058C0',
    height: 100
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
    width: 300,
    backgroundColor: '#3E97FF',
    borderColor: '#3E97FF',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 8,
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
  location: {
    fontSize: 20,
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
  loginField: {
    backgroundColor: 'white',
    height: 35,
    width: 300,
    borderColor: 'grey',
    borderWidth: 1,
    marginTop:6,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2058C0',
  },
  loading:{
    fontSize: 50,
    fontFamily: 'SIMPLIFICA',
    color: 'white'
  }
});

module.exports = styles;