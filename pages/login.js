'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  Platform,
  View
} from 'react-native';

var styles = require ('../styles');

var KeyboardSpacer = require('react-native-keyboard-spacer');
var LogIn = React.createClass({

  componentWillMount: function(props){
    this.state = this.props;
    this.signOut();
  },

  signOut: function(){
    fetch(this.state.URL + '/users/sign_out.json', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
  },

  onPress: function() {
    fetch(this.state.URL + '/users/sign_in.json', {
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
      this.prepDataSource();
      return response.json()
    })
    .then((responseData) => {
      this.setState(responseData);
      if (this.state.login_status == 200) {
        this.getShiftData()
        if (this.state.active_assignment == "None"){
          this.props.navigator.replace({
            id: 'PunchIn',
            passProps: this.state
          });
        }
        else {
          this.props.navigator.replace({
            id: 'Active',
            passProps: this.state,
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

  getShiftData: function() {
    this.setState(this.prepDataSource())
    var sectionIDs = []
    var dataBlob = {}
    var rowIDs = new Array();
    var rowCount = 0;

    this.state.locations.map(function(location) {
        sectionIDs.push(location.id)
        dataBlob[location.id] = location.name
        rowIDs[rowCount] = new Array();

        location.active_shift.assignments.map (function(assignment){
          rowIDs[rowCount].push(assignment.id)
          dataBlob[location.id + ':' + assignment.id] = assignment
        })
        rowCount++
      })
    this.setState({
      loaded: true,
      dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
    })
   },

  prepDataSource: function(){
    var getSectionData = (dataBlob, sectionID) => {
        return dataBlob[sectionID];
    }

    var getRowData = (dataBlob, sectionID, rowID) => {
        return dataBlob[sectionID + ':' + rowID];
    }

    return {
        loaded: false,
        dataSource: new ListView.DataSource({
            getSectionData          : getSectionData,
            getRowData              : getRowData,
            rowHasChanged           : (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged : (s1, s2) => s1 !== s2
        })
    }
  },

  renderScene: function(route, navigator) {
    return (
      <View style={styles.LogoContainer}>
        <Image
          resizeMode="cover"
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