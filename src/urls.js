const host = 'http://gd2.mlb.com';

const getScoreboardURL = (year, month, day) => {
  const y = year.toString();
  const m = ('0' + month.toString()).slice(-2);
  const d = ('0' + day.toString()).slice(-2);

  return `${host}/components/game/mlb/year_${y}/month_${m}/day_${d}/master_scoreboard.json`;
};

const getFullGameURL = (gameUrl) => {
  return `${host}${gameUrl}/game_events.json`;
}

const getLinescoreURL = (gameUrl) => {
  return `${host}${gameUrl}/linescore.json`;
}

export default {
  getScoreboardURL,
  getFullGameURL,
  getLinescoreURL,
};
