import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

class EventItemScoreboard extends Component {
  static propTypes = {
    home_team_abbrev: PropTypes.string,
    away_team_abbrev: PropTypes.string,
    home_team_runs: PropTypes.string,
    away_team_runs: PropTypes.string,
    half: PropTypes.string,
    inning: PropTypes.string,
    out: PropTypes.string,
    b1: PropTypes.string,
    b2: PropTypes.string,
    b3: PropTypes.string,
  };

  getFieldImage() {
    const { b1, b2, b3 } = this.props;
    const first = b1;
    const second = b2;
    const third = b3;

    let baserunners = 0;
    if (first) { baserunners++; }
    if (second) { baserunners++; }
    if (third) { baserunners++; }

    switch (baserunners) {
      case 3: { return require('../assets/img/7.png'); }
      case 2: {
        if (first && second) { return require('../assets/img/4.png'); }
        if (second && third) { return require('../assets/img/5.png'); }
        if (first && third) { return require('../assets/img/6.png'); }
      }
      case 1: {
        if (first) { return require('../assets/img/1.png'); }
        if (second) { return require('../assets/img/2.png'); }
        if (third) { return require('../assets/img/3.png'); }
      }
      default:
        return require('../assets/img/0.png');
    }
  }

  render() {
    const {
      home_team_abbrev,
      away_team_abbrev,
      home_team_runs,
      away_team_runs,
      half,
      inning,
      out
    } = this.props;
    return (
      <View style={styles.rightSide}>
        <View style={styles.scoreboard}>
          <Text>{away_team_abbrev + ' ' + away_team_runs + ' '}</Text>
          <Text>{home_team_abbrev + ' ' + home_team_runs}</Text>
        </View>
        <View style={styles.field}>
          <Image
            source={this.getFieldImage()}
            style={styles.baserunnersIcon}
            resizeMode="contain"
          />
          <Text>{(half.slice(0, 1) === 'T' ? 'TOP ' : 'BOT ') + inning}</Text>
          <Text>{out + ' out'}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rightSide: {
    flex: 1,
    flexDirection: 'column',
  },
  scoreboard: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  field: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  baserunnersIcon: {
    flex: 1,
    height: 50,
    width: 50,
  },
});

export default EventItemScoreboard;
