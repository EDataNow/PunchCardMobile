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

var styles = require ('../styles')

class Active extends Component {
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
          Active
        </Text>
      </View>
    );
  }

}

module.exports = Active;