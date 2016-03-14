'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  Navigator,
  StyleSheet,
  Text,
  ScrollView,
  TouchableHighlight,
  RecyclerViewBackedScrollView,
  TouchableOpacity,
  StatusBar,
  View
} from 'react-native';

var styles = require ('../styles')
import Spinner from 'react-native-loading-spinner-overlay';
var RefreshableListView = require('react-native-refreshable-listview');
var DrawerLayout = require('react-native-drawer-layout');
var ActionSheet = require('@remobile/react-native-action-sheet');
var Button = require('@remobile/react-native-simple-button');

var Active = React.createClass({

  getInitialState: function(){
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

  componentWillMount: function(props){
    this.state = this.props;
    this.setState(this.getInitialState());
    this.getActiveShift();
   },

   getActiveShift: function(){
    fetch(this.state.URL + '/shifts/' + this.state.activeShift.id + '.json', {
      method: 'GET',
      headers: {
        'X-User-Token': this.state.user.authentication_token,
        'X-User-Email': this.state.user.email,
        'Accept': 'application/json'
      },
    })
    .then((response) => {
      return response.json()
    })
    .then((responseData) => {
      var assignments = responseData.assignments,
            dataBlob = {},
            sectionIDs = [],
            rowIDs = [],
            assignment,
            assignmentLength,
            section;

            section = 0;
            // Add Section to Section ID Array
            sectionIDs.push(section);
            // Set Value for Section ID that will be retrieved by getSectionData
            dataBlob[section] = "Active Shifts";

            rowIDs[section] = [];

            var key
            for(key in responseData.assignments) {
              if(responseData.assignments.hasOwnProperty(key)) {
                assignment = responseData.assignments[key];
                rowIDs[section].push(key);
                dataBlob[section + ':' + key] = assignment;
              }
            }

            this.setState({
                  dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
                  loaded: true
            });
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
        passProps: this.state
      });
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
      <View style={styles.MasterContainer}>
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
          <TouchableHighlight style={styles.punchOutButton} onPress={this.punchOut} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Punch Out</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.listContainer}>
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            renderSectionHeader={this.renderSectionHeader}
            renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
            loadData={this.getActiveShift()}
            style={styles.listView}
            automaticallyAdjustContentInsets={false}
          />
        </View>
      </View>
      </DrawerLayout>
    );
  },

  renderSectionHeader: function(sectionData, sectionID) {
        return (
            <View style={styles.section}>
                <Text style={styles.text}>{sectionData}</Text>
            </View>
        ); 
  },

  renderLoadingView:function() {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>
          Loading signed-in users...
        </Text>
        <Spinner visible={true} />
      </View>
    );
  },

  _renderRow: function(rowData, sectionID, rowID, highlightRow){
      return (
      <View style={styles.rowContainer}>
          <View style={styles.rowLeftContent}>
            <Text style={styles.firstName}>{rowData.user.first_name},</Text>
            <Text style={styles.lastName}>{rowData.user.last_name}</Text>
            <Text style={styles.location}>{rowData.location.name}</Text>
          </View>
          <View style={styles.rowRightContent}>
            <Text style={styles.start}>Start</Text>
            <Text style={styles.end}>End</Text>
            <Text style={styles.reason}>Reason</Text>
          </View>
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