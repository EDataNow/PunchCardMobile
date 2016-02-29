'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

var styles = require ('../styles')

class LogIn extends Component {
  render() {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
      />
    );
  }

  renderScene(route, navigator) {
    return (
    <View>
      <View style={styles.LogoContainer}>
      <Image
        style={styles.LogoImage}
        source={require('../images/Logo.png')}/>
        <Text style={styles.welcome}>
          Login
        </Text>
      </View>
      <View style={styles.InteractionContainer}>
            <TextInput style={styles.inputField} name='email' keyboardType='email-address'/>
            <TextInput style={styles.inputField} name='password' secureTextEntry={true}/>
            <TouchableHighlight style={styles.signIn} onPress={this._onPressButton}>
            <View style={styles.signIn}>
            <Text style={styles.signInLabel}>Sign In</Text>
            </View>
            </TouchableHighlight>
      </View>
      </View>
    );
  }

}

module.exports = LogIn;