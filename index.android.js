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

import Spinner from 'react-native-loading-spinner-overlay';

var styles = require ('./styles')

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
