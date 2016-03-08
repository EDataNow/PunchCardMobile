'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var styles = require ('../styles')

var Active = React.createClass({

  componentWillMount: function(props){
    this.state = this.props;
    fetch(this.state.URL + '/shifts/' + this.state.activeShift.id + ".json", {
      method: 'GET',
      headers: {
        'X-User-Token': this.state.user.authentication_token,
        'X-User-Email': this.state.user.email,
        'Accept': 'application/json'
      },
    })
    .then((response) => {return response.json()})
    .then((responseData) => {
      this.setState({
        assignments: responseData.assignments,
      })
    })
   },

  componentDidMount: function(){
  },

  renderScene: function(route, navigator) {
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
    fetch(this.state.URL + '/assignments/' + this.state.assignment.id + '.json', {
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