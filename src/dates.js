import moment from 'moment';

const normalizeDates = (events, linescores) => {

  const gameUrlTZMap = linescores.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.data.game.game_data_directory]: convertTimeZone(cur.data.game.home_time_zone),
    }
  }, {});

  return events.map(event => {

    // prioritize the end date over the start date,
    // but make sure we have one.
    if (event.start_tfs_zulu) {
      event.date = event.start_tfs_zulu;
    }
    if (event.end_tfs_zulu) {
      event.date = event.end_tfs_zulu;
    }

    return {
      ...event,
      date: moment(event.date).utcOffset(gameUrlTZMap[event.gameUrl])
    };
  });
};

const convertTimeZone = (tz) => {
  switch(tz) {
    case 'PT': {
      return -8;
    }
    case 'MT': {
      return -7;
    }
    case 'CT': {
      return -6;
    }
    case 'ET': {
      return -5;
    }
    case 'PST': {
      return -8;
    }
    case 'MST': {
      return -7;
    }
    case 'CST': {
      return -6;
    }
    case 'EST': {
      return -5;
    }
  }
}

const timeZones = {
  PST: -8,
  MST: -7,
  CST: -6,
  EST: -5,
  PDT: -7,
  MDT: -6,
  CDT: -5,
  EDT: -4,
}

export default {
  normalizeDates,
}
