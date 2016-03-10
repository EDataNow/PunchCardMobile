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
    var rowIDs = []
    var i,j,locationLength = this.state.locations.length;

    for (i =0; i < locationLength; i++) {
    // for (let location of this.state.locations) {
      let location = this.state.locations[i]
      sectionIDs.push(location.id)
      dataBlob[location.id] = location.name
      rowIDs[location.id] = []

      var assignmentLength = this.state.locations[i].active_shift.assignments.length
      for (j =0; j < assignmentLength; j++){
      // for (let assignment of location) {
        let assignment = location.active_shift.assignments[j]
        rowIDs[location.id].push(assignment.id)
        dataBlob[location.id + ':' + assignment.id] = assignment
      }
    }
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