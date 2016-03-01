'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';

var styles = require ('../styles')

var Active = React.createClass({
  render: function() {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
      />
    );
  },

  renderScene: function(route, navigator) {
    return (
      <View style={styles.LaunchContainer}>
        <Text style={styles.welcome}>
          Active
        </Text>
      </View>
    );
  },

});

module.exports = Active;