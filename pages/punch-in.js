'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var styles = require ('../styles')

var PunchIn = React.createClass({
  render: function() {
    return (
      <Navigator
        renderScene={this.renderScene}
      />
    );
  },

  renderScene: function(route, navigator) {
    return (
      <View style={styles.LaunchContainer}>
        <Text style={styles.welcome}>
          Punch In
        </Text>
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Punch In</Text>
        </TouchableHighlight>
      </View>
    );
  },

  onPress: function(){
    var navigator = this.props.navigator;
    navigator.replace({
      id: 'Active',
    });
  },

});

module.exports = PunchIn;