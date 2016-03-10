'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  Navigator,
  StyleSheet,
  Text,
  Picker,
  TouchableHighlight,
  View
} from 'react-native';

var styles = require ('../styles')

var PunchIn = React.createClass({

  componentWillMount: function(props){
    this.state = this.props
    this.setState({layout: undefined})
  },

  punchIn: function(){
    fetch(this.state.URL + '/assignments.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-User-Token': this.state.user.authentication_token,
        'X-User-Email': this.state.user.email
      },
      body: JSON.stringify({
        assignment: {
          user_id: this.state.user.id,
        },
        shifts: {
          location_id: this.state.selectedLocation,
        },
      })
    })
    .then((response) => {
      alert(response.status)
      this.setState({punch_status: response.status});
      //this.state.locations[1].active_shift.assignments.push(response.json())
       if (this.state.punch_status == 201){
        this.props.navigator.replace({
          id: 'Active',
          passProps: this.state
        });
      }
      else{
        this.setState({notice: "Unable to Punch In. Please try again later."});
      }
    })
    .catch((error) => {
      console.warn(error);
    })
    .done();
  },

  render: function() {
    return (
      <Navigator
        renderScene={this.renderScene}
      />
    );
  },

  renderScene: function(route, navigator) {
    return (
    <View style={styles.MasterContainer2}>
      <View style={styles.navbar}>
        <Image
        style={styles.navButton}
        source={require('../images/threelines.png')}/>
        <Text style={styles.headerText}>PunchCard</Text>
      </View>
      <View style={styles.LaunchContainer}>
        <Text style={styles.welcome}>
          Hello {this.state.user.first_name}
        </Text>
        <TouchableHighlight style={styles.button} onPress={this.punchIn} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Punch In</Text>
        </TouchableHighlight>
      </View>
    </View>
    );
  },

});

module.exports = PunchIn;