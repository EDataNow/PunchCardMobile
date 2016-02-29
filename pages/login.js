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
var t = require('tcomb-form-native')

var Form = t.form.Form

var LogInForm = t.struct({
  email: t.String,
  password: t.String
});

var options = {
  fields: {
    email: {
      error: 'Insert a valid email',
      keyboardType: 'email-address',
    },
    password: {
      secureTextEntry: true
    }
  },
  auto: 'placeholders'
};

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
            <Form ref='form' type={LogInForm} options={options}/>
            <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
      </View>
    );
  }

}

module.exports = LogIn;