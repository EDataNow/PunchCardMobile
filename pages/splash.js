'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Component,
  Image,
  View,
  Text,
} = React;

var styles = require ('../styles')

import Spinner from 'react-native-loading-spinner-overlay';

var Splash = React.createClass({
  componentWillMount: function() {
    var navigator = this.props.navigator;
    setTimeout(() => {
      navigator.replace({
        id: 'LogIn',
      });
    }, 1000);
  },
  render: function() {
    return (
      <View style={styles.LaunchContainer}>
        <Image
        style={styles.LogoImage}
        source={require('../images/Logo.png')}/>
        <Text style={styles.welcome}>
          PunchCard
        </Text>
        <Spinner visible={true} />
      </View>
    );
  }
});

module.exports = Splash;