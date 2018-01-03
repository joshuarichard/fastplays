import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import EventList from './EventList';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';

class Home extends Component {

  static propTypes = {
    today: momentPropTypes.momentObj,
    events: PropTypes.array,
    teams: PropTypes.array,
    setToday: PropTypes.func.isRequired,
  };

  render() {
    const { today, setToday, events, teams } = this.props;
    return (
      <View style={styles.homeContainer}>
        <View style={styles.bar}>
          <DatePicker
            style={styles.datePicker}
            date={today.toDate()}
            showIcon={false}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2000-01-01"
            maxDate="2018-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => setToday(moment(date, 'YYYY-MM-DD')) }
          />
        </View>
        <View style={styles.list}>
            {
              (events.length === 0)
                ? (
                  <Text>No games for today.</Text>
                ) : (
                  <EventList
                    events={events}
                    teams={teams}
                  />
                )
            }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  bar: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
