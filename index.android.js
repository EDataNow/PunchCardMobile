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

class PunchCardMobile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

var styles = require ('./styles')

AppRegistry.registerComponent('PunchCardMobile', () => PunchCardMobile);
