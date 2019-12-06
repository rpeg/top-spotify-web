export default process.env.NODE_ENV === 'production'
  ? 'https://top-spotify.herokuapp.com'
  : 'http://127.0.0.1:3000';
