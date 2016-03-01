'use strict';
const t = require('tcomb-form-native')
var styles = require ('../styles')
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

  getInitialState() {
    return { value: null };
  },

  onChange(value) {
    this.setState({ value });
  },

  clearForm() {
    // clear content from all textbox
    this.setState({ value: null });
  },

  onPress: function() {

    var response = fetch('http://localhost:3000/users/sign-in', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        utf8: "✓",
        authenticity_token: "",
        user: {
          email: 'user3@punchcard.net',
          password: 'password3',
          remember_me: 0,
        },
        commit: "Sign-In"
      })
    })
    console.log(response);

    var navigator = this.props.navigator;
    //console.log(this)
    navigator.replace({
        id: 'PunchIn',
      });
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
        <Form
          ref='form'
          type={LogInForm}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableHighlight>
      </View>
    );
  },

  render: function() {
    return (
      <Navigator renderScene={this.renderScene}/>
    );
  },


});

module.exports = LogIn;