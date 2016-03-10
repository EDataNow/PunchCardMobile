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
  StatusBar,
  TouchableOpacity,
  ScrollView,
  View
} from 'react-native';

var styles = require ('../styles')
var DrawerLayout = require('react-native-drawer-layout');
var PunchIn = React.createClass({

  componentWillMount: function(props){
    this.state = this.props
    this.setState({location: {id: 1},layout: undefined, hidden: false})
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
          shift_id: this.state.activeShift.id,
          location_id: this.state.location.id,
        }
      })
    })
    .then((response) => {
      this.setState({punch_status: response.status});
      return response.json()
    })
    .then((responseData) => {
      this.setState({assignment: responseData})
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

  _renderMenu:function() {
      return(
        <View style={styles.drawerMenu}>
        <View style={styles.drawerMenu}>
          <Image
            style={styles.menuHeaderImage}
            source={require('../images/Logo.png')}/>
          <Text style={styles.menuHeaderText}>PunchCard</Text>
        </View>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <TouchableHighlight style={styles.menuButton}  underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Log Out</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.menuButton}  underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Option 1</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.menuButton}  underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Option 2</Text>
            </TouchableHighlight>
          </ScrollView>
          <Text>Version 1.0.0</Text>
        </View>
      );
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

      <DrawerLayout
          ref={(view) => { this._drawerLayout = view; }}
          drawerWidth={250}
          onDrawerOpen={()=> this.setState({hidden: !this.state.hidden})}
          onDrawerClose={()=> this.setState({hidden: !this.state.hidden})}
          renderNavigationView={this._renderMenu}>

          <StatusBar hidden={this.state.hidden} />
            <View style={styles.MasterContainer2}>
              <View style={styles.navbar}>
                <TouchableOpacity
                    onPress={() => { this._drawerLayout.openDrawer() }}>
                <Image
                  style={styles.navButton}
                  source={require('../images/threelines.png')}/>
                </TouchableOpacity>
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

      </DrawerLayout>

    
    );
  },

});

module.exports = PunchIn;