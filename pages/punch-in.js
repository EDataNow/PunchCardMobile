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
var ActionSheet = require('@remobile/react-native-action-sheet');
var Button = require('@remobile/react-native-simple-button');
var PunchIn = React.createClass({

  componentWillMount: function(props){
    this.state = this.props
    this.setState({location: {id: 1},layout: undefined, hidden: false,show: false, hideableStyle: styles.button})
  },

  onCancel: function() {
    this.setState({show:false, hideableStyle: styles.button});
  },

  onOpen: function() {
    this.setState({show:true, hideableStyle: styles.hiddenButton});
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
      this.setState({punch_status: response.status});
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
            <TouchableHighlight style={styles.menuButton} onPress={this.logOutUser} underlayColor='#99d9f4'>
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

  logOutUser: function(){
    this.props.navigator.replace({
        id: 'LogIn',
        passProps: {URL: 'http://punch-card-staging.herokuapp.com'}
      });
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

                <Button onPress={this.onOpen} textStyle={styles.headerText}>Please select a location...</Button>
                <ActionSheet
                    visible={this.state.show}
                    onCancel={this.onCancel} >
                    <ActionSheet.Button>Oshawa</ActionSheet.Button>
                    <ActionSheet.Button>Newmarket</ActionSheet.Button>
                    <ActionSheet.Button>Space</ActionSheet.Button>
                </ActionSheet>


                <TouchableHighlight style={this.state.hideableStyle} onPress={this.punchIn} underlayColor='#99d9f4'>
                  <Text style={styles.buttonText}>Punch In</Text>
                </TouchableHighlight>
              </View>
            </View>

      </DrawerLayout>


    );
  },

});

module.exports = PunchIn;