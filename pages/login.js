'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  Navigator,
  StyleSheet,
  Text,
  TextInput,
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
      <View style={styles.LaunchContainer}>
        <Form ref='form' type={LogInForm} options={options}/>
      </View>
    );
  }

}

module.exports = LogIn;