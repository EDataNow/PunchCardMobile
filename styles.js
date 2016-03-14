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
const vHeight = windowDims.height - 120;
const vWidth = windowDims.width;
const vHalfWidth = windowDims.width / 2;
const vHalfSmall = vHalfWidth - 50;

const styles = StyleSheet.create({
  LaunchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2058C0',
  },
  drawerMenu:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3E97FF',
  },
  selectContainer:{
    height:400,
    width:210,
    backgroundColor: '#3E97FF'
  },
  menuHeaderImage: {
    height:200,
    width:200
  },
  menuHeaderText:{
    color:'#D93A3A',
    fontFamily: 'Comfortaa',
    fontSize: 42,
    textAlign: 'center',
  },
  optionsStyle:{
    color:'white',
    fontFamily: 'Comfortaa',
    fontSize: 42,
    textAlign: 'center',
  },
  selectedLocation:{
    fontSize: 42,
    textAlign: 'center',
    color:'#D93A3A',
    fontFamily: 'Comfortaa'
  },
  menuButtonContainer: {
    position: 'absolute',
    top: 45,
    left: 15,
  },
  listContainer:{
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
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: vHeight,
    backgroundColor: '#3E97FF',
  },
  separator:{
    height: 5,
    backgroundColor: '#ffffff',
  },
  section:{
    height: 40,
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2058C0',
    width: vWidth
  },
  sectionText:{
    color: 'white',
    fontFamily: 'Comfortaa',
    fontSize: 18
  },
  rowContainer: {
    flex:1,
    height: 90,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#3E97FF',
  },
  rowLeftContent:{
    width: vHalfWidth,
    alignItems:'flex-start',
    margin:10,
    justifyContent: 'flex-start',
    flexGrow:1
  },
  rowRightContent:{
    width: vHalfSmall,
    alignItems:'flex-start',
    margin:10,
    justifyContent: 'center',
    flexGrow:1
  },
  firstName:{
    fontSize: 18,
    textAlign: 'center',
    color:'white',
    fontFamily: 'Comfortaa'
  },
  lastName:{
    fontSize: 30,
    textAlign: 'center',
    color:'white',
    fontFamily: 'Comfortaa'
  },
  location:{
    fontSize: 18,
    textAlign: 'center',
    color:'white',
    fontFamily: 'Comfortaa'
  },
  start:{
    fontSize: 18,
    textAlign: 'center',
    color:'white',
    fontFamily: 'Comfortaa'
  },
  end:{
    fontSize: 18,
    textAlign: 'center',
    color:'white',
    fontFamily: 'Comfortaa'
  },
  reason:{
    fontSize: 18,
    textAlign: 'center',
    color:'white',
    fontFamily: 'Comfortaa'
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
    fontFamily: 'Comfortaa',
    fontSize: 22,
    textAlign: 'center',
    marginLeft: 30,
    marginRight:20,
    marginTop: 30
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
  hiddenButton:{
    height: 36,
    width: 300,
    backgroundColor: '#3E97FF',
    borderColor: '#3E97FF',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 8,
    justifyContent: 'center',
    opacity:0
  },
  menuButton:{
    height: 36,
    width: 200,
    backgroundColor: '#2058C0',
    borderColor: '#2058C0',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 8,
    justifyContent: 'center'
  },
  punchOutButton:{
    height: 36,
    width: 300,
    backgroundColor: '#D93A3A',
    borderColor: '#D93A3A',
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
    fontFamily: 'Comfortaa'
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
    fontFamily: 'Comfortaa',
    color: 'white'
  }
});

module.exports = styles;