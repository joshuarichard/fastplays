import urls from './urls';

export default {

  async fetchScoreboard(year = 2017, month = 10, day = 1) {
    try {
      let response = await fetch(urls.getScoreboardURL(year, month, day));
      let responseJson = await response.json();
      return responseJson;
    } catch (err) {
      console.error(err);
    }
  },

  async fetchLinescore(gameUrl) {
    try {
      let response = await fetch(urls.getLinescoreURL(gameUrl));
      let responseJson = await response.json();
      return responseJson;
    } catch (err) {
      console.error(err);
    }
  },

  async fetchGame(gameUrl) {
    try {
      let response = await fetch(urls.getFullGameURL(gameUrl));
      let responseJson = await response.json();
      return {
        ...responseJson,
        gameUrl,
      };
    } catch (err) {
      console.error(err);
    }
  },

};
