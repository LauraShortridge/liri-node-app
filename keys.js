// console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.omdb = {
  apikey: process.env.OMDB_ID
};

exports.bandsintown = {
  apikey: process.env.BANDSINTOWN_ID
}