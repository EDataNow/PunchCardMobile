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

var assignments = fetch('http://punch-card-2016.herokuapp.com/assignments', {method: 'GET'})


var Active = React.createClass({
  render: function() {
    console.log(assignments)
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
          Active
        </Text>
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Punch Out</Text>
        </TouchableHighlight>
      </View>
    );
  },

  onPress: function(){
    var navigator = this.props.navigator;
    navigator.replace({
      id: 'PunchIn',
    });
  },

});

module.exports = Active;