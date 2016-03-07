'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var styles = require ('../styles')

//var assignments = fetch('http://punch-card-2016.herokuapp.com/assignments', {method: 'GET'})

const targetURL = 'http://punch-card-staging.herokuapp.com'
//var targetURL = 'localhost:3000'

var Active = React.createClass({

  componentWillMount: function(props){
    this.state = this.props;
  },

  getActiveShift: function() {
    var activeShift = fetch(targetURL + '/shifts/' + this.state.currentShift + ".json", {
      method: 'SHOW',
      headers: {
        'X-User-Token': this.state.user.authentication_token,
        'X-User-Email': this.state.user.email,
        'Accept': 'application/json'
      },
    })
    return activeShift
  },

  renderScene: function(route, navigator) {
    var shift = this.getActiveShift()
    return (
      <View style={styles.LaunchContainer}>
        <Text style={styles.welcome}>
          Active
        </Text>
        <TouchableHighlight style={styles.button} onPress={this.punchOut} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Punch Out</Text>
        </TouchableHighlight>
      </View>
    );
  },

  punchOut: function(){
    fetch(targetURL + '/assignments/' + this.state.assignment.id + '.json', {
      method: 'DELETE',
      headers: {
        'X-User-Token': this.state.user.authentication_token,
        'X-User-Email': this.state.user.email,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
    .then((response) => {
      this.props.navigator.replace({
        id: 'PunchIn',
        passProps: this.state
      });
    })

  },

  render: function() {
    return (
      <Navigator
        renderScene={this.renderScene}
      />
    );
  },

});

module.exports = Active;