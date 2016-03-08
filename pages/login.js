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
  Platform,
  View
} from 'react-native';

var styles = require ('../styles');


const targetURL = 'http://punch-card-staging.herokuapp.com'
//const targetURL = 'http:localhost:3000'
var KeyboardSpacer = require('react-native-keyboard-spacer');

var LogIn = React.createClass({

  componentWillMount: function(props){
    this.state = this.props;
  },

  signOut: function(){
    fetch(targetURL + '/users/sign_out.json', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
  },

  onPress: function() {
    fetch(targetURL + '/users/sign_in.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
        },
      })
    })
    .then((response) => {
      this.setState({login_status: response.status});
      return response.json()
    })
    .then((responseData) => {
      this.setState({
        user: responseData.user,
        currentShift: responseData.current_shift,
        assignment: responseData.active_assignment
      });
      if (this.state.login_status == 200) {
        if (this.state.assignment == null){
          this.props.navigator.replace({
            id: 'PunchIn',
            passProps: this.state,
          });
        }
        else {
          this.props.navigator.replace({
            id: 'Active',
            passProps: this.state
          });
        }
      }
      else{
        this.setState({notice: "Log-In failed. Please try again."});
      }
    })
    .catch((error) => {
      console.warn(error);
    })
    .done();
  },

  renderScene: function(route, navigator) {
    this.signOut();
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
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableHighlight>
        </View>
        {function(){
        if (Platform.OS === 'ios') {
          return <KeyboardSpacer/>
        }
      }.call(this)}
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