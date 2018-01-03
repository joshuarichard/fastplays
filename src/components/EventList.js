import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import EventItem from './EventItem';
import _ from 'lodash';

class EventList extends Component {

  static propTypes = {
    events: PropTypes.array,
    teams: PropTypes.array,
  }

  getTeams(event) {
    return _.find(this.props.teams, { 'gameUrl': event.gameUrl });
  }

  render() {
    return (
      <View style={styles.list}>
        <FlatList
          data={this.props.events}
          renderItem={({item}) => <EventItem event={item} team={this.getTeams(item)}/>}
          keyExtractor={(item, index) => index}
          removeClippedSubviews={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  list: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
  },

});

export default EventList;
