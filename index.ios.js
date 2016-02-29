/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  Image,
  ActivityIndicatorIOS,
  View
} from 'react-native';

var styles = require ('./styles')

import Spinner from 'react-native-loading-spinner-overlay';

class PunchCardMobile extends Component {
  render() {
    return (
      <View style={styles.LaunchContainer}>
        <Image
        style={styles.LogoImage}
        source={require('./images/Logo.png')}/>
        <Text style={styles.welcome}>
        PunchCard
        </Text>
        <Spinner visible={true} />
      </View>
    );
  }
}

AppRegistry.registerComponent('PunchCardMobile', () => PunchCardMobile);
