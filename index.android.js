/**
-
*/
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

var styles = require ('./styles');
var Splash = require('./pages/splash');
var LogIn = require('./pages/login');
var PunchIn = require('./pages/punch-in');
var Active = require('./pages/active');

var PunchCardMobile = React.createClass({

  getInitialState: function(){
    return {URL: 'http://punch-card-2016.herokuapp.com'}
  },

  render: function() {
    return (
      <Navigator
        initialRoute={{id: 'Splash', name: 'index', passProps: this.state}}
        renderScene = {this.renderScene}
        configureScene={(route) => {
        if (route.sceneConfig) {
          return route.sceneConfig;
        }
        return Navigator.SceneConfigs.FloatFromRight;
       }} />
    );
  },

  renderScene: function(route, navigator) {
    var routeId = route.id;
    if (routeId === 'Splash') {
      return (
        <Splash
          navigator={navigator} {...route.passProps} />
      );
    }
    if (routeId === 'LogIn') {
      return (
        <LogIn
          navigator={navigator} {...route.passProps}/>
      );
    }
    if (routeId === 'PunchIn') {
      return (
        <PunchIn
          navigator={navigator} {...route.passProps}/>
      );
    }
    if (routeId === 'Active') {
      return (
        <Active
          navigator={navigator} {...route.passProps}/>
      );
    }
    return this.noRoute(navigator);
  },

  noRoute: function(navigator){
    return (
      <Splash
          navigator={navigator} />
    );
  },
});

AppRegistry.registerComponent('PunchCardMobile', () => PunchCardMobile);
