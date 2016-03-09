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
  RecyclerViewBackedScrollView,
  View
} from 'react-native';

var styles = require ('../styles')
import Spinner from 'react-native-loading-spinner-overlay';
var RefreshableListView = require('react-native-refreshable-listview')

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
    fetch(this.state.URL + '/shifts/' + this.state.activeShift.id + ".json", {
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
            section,
            i;

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

  renderScene: function(route, navigator) {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.MasterContainer}>
        <View style={styles.navbar}>
          <Image
          style={styles.navButton}
          source={require('../images/threelines.png')}/>
          <Text style={styles.headerText}>PunchCard</Text>
        </View>
        <View style={styles.LaunchContainer}>
          <TouchableHighlight style={styles.button} onPress={this.punchOut} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Punch Out</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.listContainer}>
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            renderSectionHeader={this.renderSectionHeader}
            style={styles.listView}
          />
        </View>
      </View>
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
          <Text style={styles.welcome}>{rowData.user.first_name},</Text>
          <Text style={styles.welcome}>{rowData.user.last_name}</Text>
          <Text style={styles.location}>{rowData.location.name}</Text>
          <View style={styles.separator}/>
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