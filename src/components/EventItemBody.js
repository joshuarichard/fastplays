import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import momentPropTypes from 'react-moment-proptypes';

class EventItemBody extends Component {
  static propTypes = {
    event: PropTypes.string,
    date: momentPropTypes.momentObj,
    description: PropTypes.string,
  };

  render() {
    const { event, date, description } = this.props;
    return (
      <View style={styles.leftSide}>
        <View style={styles.title}>
          <Text style={styles.eventText}>{event}</Text>
          <Text>{date.toString()}</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  leftSide: {
    flex: 4,
    flexDirection: 'column',
  },
  title: {
    flex: 1,
    flexDirection: 'column',
  },
  eventText: {
    fontWeight: 'bold',
  },
  description: {
    flex: 4,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  descriptionText: {
    //fontSize: 20,
  }
});

export default EventItemBody;
