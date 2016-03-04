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

var styles = require ('../styles');

//var targetURL = 'http://punch-card-2016.herokuapp.com'
var targetURL = 'http://localhost:3000'

var LogIn = React.createClass({

  onPress: function() {

    var response = fetch(targetURL + '/users/sign-in', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
          remember_me: 0,
        },
        commit: "Sign-In"
      })
    })

    alert(response)
    var navigator = this.props.navigator;

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
        <View style={styles.InteractionContainer}>
        <TextInput
          style={styles.loginField}
          onChangeText={(email) => this.setState({email})}
          keyboardType='email-address'
          placeholder="Email"
          placeholderTextColor='grey'>
        </TextInput>
        <TextInput
          style={styles.loginField}
          onChangeText={(password) => this.setState({password})}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor='grey' >
        </TextInput>
        </View>
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