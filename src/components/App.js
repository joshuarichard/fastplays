import React, { Component } from 'react';
import Home from './Home';
import { View, Text } from 'react-native';
import ajax from '../ajax';
import _ from 'lodash';
import moment from 'moment';
import dates from '../dates';

class App extends Component {
  state = {
    today: moment('2017-11-01', 'YYYY-MM-DD'),
    displayedDate: moment('2017-11-01', 'YYYY-MM-DD'),
    lastUpdated: null,
    events: [],
    teams: [],
  };

  async componentDidMount() {
    this.fetchData();
    this.interval = setInterval(this.fetchData.bind(this), 5000);
  }

  async componentDidUpdate() {
    const hasNotBeenUpdated = !this.state.lastUpdated;
    const isDifferentDay = (!this.state.today.isSame(this.state.displayedDate));

    if (hasNotBeenUpdated || isDifferentDay) {
      this.fetchData();
    }
  }

  async fetchData() {
    console.log('Fetching new data.');

    const today = this.state.today;
    const scoreboard = await ajax.fetchScoreboard(today.year(), today.month() + 1, today.date());

    // steps:
    // 1. get gameUrls
    // 2. get linescores (for team abbrevs and time zones)
    // 3. get game events

    // gameUrls is an array of game paths
    let gameUrls = null;
    if (!scoreboard.data.games.game) {
      gameUrls = [];
    } else if (!Array.isArray(scoreboard.data.games.game)) {
      gameUrls = [scoreboard.data.games.game].map(g => g.game_data_directory);
    } else {
      gameUrls = scoreboard.data.games.game.map(g => g.game_data_directory);
    }
    const linescores = await Promise.all(gameUrls.map(g => ajax.fetchLinescore(g)));

    const teams = linescores.map(l => ({
      gameUrl: l.data.game.game_data_directory,
      away_team_abbrev: l.data.game.away_name_abbrev,
      home_team_abbrev: l.data.game.home_name_abbrev,
    }));

    const games = await Promise.all(gameUrls.map(g => ajax.fetchGame(g)));
    const gameInnings = games.map(game => game.data.game.inning);
    const innings = _.flatten(gameInnings.map((game, index) => {
      if (!Array.isArray(game)) { return []; }
      return game.map(inning => ({ ...inning, gameUrl: games[index].gameUrl}));
    }));

    const flattendEvents = _.flatten(
      innings.map(inn => {
        return _.union(
          inn.top.atbat.map(ab => ({ ...ab, inning: inn.num, gameUrl: inn.gameUrl, half: 'Top', })),
          (inn.bottom.atbat && inn.bottom.atbat.map(ab => ({ ...ab, inning: inn.num, gameUrl: inn.gameUrl, half: 'Bottom' }))),
          (inn.top.action && (Array.isArray(inn.top.action) ? inn.top.action : [inn.top.action]).map(ab => ({ ...ab, inning: inn.num, gameUrl: inn.gameUrl, half: 'Top', end_tfs_zulu: ab.tfs_zulu }))),
          (inn.bottom.action && (Array.isArray(inn.bottom.action) ? inn.bottom.action : [inn.bottom.action]).map(ab => ({ ...ab, inning: inn.num, gameUrl: inn.gameUrl, half: 'Bottom', end_tfs_zulu: ab.tfs_zulu })))
        )
      })
    );

    const events = dates.normalizeDates(flattendEvents, linescores);

    this.setState({
      lastUpdated: moment(),
      displayedDate: this.state.today,
      events: events.sort((left, right) => right.date.diff(left.date)),
      teams,
    });
  }

  render() {
    const { today, events, teams } = this.state;
    return (
      <Home
        today={today}
        setToday={(date) => this.setState({ today: date })}
        events={events}
        teams={teams}
      />
    );
  }
};

export default App;
