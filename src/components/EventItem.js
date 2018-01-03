import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import EventItemBody from './EventItemBody';
import EventItemScoreboard from './EventItemScoreboard';

class EventItem extends Component {

  static propTypes = {
    event: PropTypes.object,
    team: PropTypes.object,
  };

  render() {
    const { event, team } = this.props;
    return (
      <View>
        <TouchableOpacity style={styles.item}>
          <EventItemBody
            event={event.event}
            date={event.date}
            description={event.des}
          />
          <EventItemScoreboard
            home_team_abbrev={team.home_team_abbrev}
            away_team_abbrev={team.away_team_abbrev}
            home_team_runs={event.home_team_runs}
            away_team_runs={event.away_team_runs}
            half={event.half}
            inning={event.inning}
            out={event.o}
            b1={event.b1}
            b2={event.b2}
            b3={event.b3}
          />
        </TouchableOpacity>
        <View style={styles.line}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    marginHorizontal: 5,
    marginBottom: 5,
  },
  line: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
});

export default EventItem;
