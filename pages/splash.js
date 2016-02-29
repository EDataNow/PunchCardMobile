'use strict';

var React = require('react-native');
var {
  Component,
  View,
  Text,
} = React;

class SplashPage extends Component {
  componentWillMount() {
    var navigator = this.props.navigator;
    setTimeout(() => {
      /*navigator.replace({
        id: 'LogIn',
      });*/
    }, 1000);
  }
  render() {
    return (
      <View style={styles.LaunchContainer}>
        <Image
        style={styles.LogoImage}
        source={require('./images/Logo.png')}/>
        <Text style={styles.welcome}>
        PunchCard
        </Text>
        <Spinner visible={true} />
      </View>
    );
  }
}

module.exports = SplashPage;