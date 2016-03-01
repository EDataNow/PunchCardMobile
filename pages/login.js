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
      secureTextEntry: true,
    },
  },
  auto: 'placeholders',
};

var LogIn = React.createClass({

  render: function() {
    return (
      <Navigator renderScene={this.renderScene}/>
    );
  },

  onPress: function() {
    console.log("Pressed")
  },

  renderScene: function(route, navigator) {
    return (
      <View style={styles.LogoContainer}>
        <Image
          style={styles.LogoImage}
          source={require('../images/Logo.png')}/>
        <Text style={styles.welcome}>
          Login
        </Text>
        <Form ref='login' type={LogInForm} options={options} value={this.state}/>
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableHighlight>
      </View>
    );
  },
});

module.exports = LogIn;