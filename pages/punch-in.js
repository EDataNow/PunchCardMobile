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

class PunchIn extends Component {
  render() {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
      />
    );
  }

  renderScene(route, navigator) {
    return (
      <View style={styles.LaunchContainer}>
        <Text style={styles.welcome}>
          Punch In
        </Text>
      </View>
    );
  }

}

module.exports = PunchIn;