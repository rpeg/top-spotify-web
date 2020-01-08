const HEROKU_BASE_URL = 'https://top-spotify.herokuapp.com';
export const DB_URL = 'https://mb-db.herokuapp.com';
const LOCAL_BASE_URL = 'http://127.0.0.1:3000';

export const BASE_API_URL = process.env.NODE_ENV === 'production'
  ? HEROKU_BASE_URL
  : LOCAL_BASE_URL;

export const SPOTIFY_API_URL = process.env.NODE_ENV === 'production'
  ? `${HEROKU_BASE_URL}/spotify`
  : `${LOCAL_BASE_URL}/spotify`;

export const MUSICBRAINZ_API_URL = process.env.NODE_ENV === 'production'
  ? `${HEROKU_BASE_URL}/musicbrainz`
  : `${LOCAL_BASE_URL}/musicbrainz`;
