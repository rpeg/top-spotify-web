import { connect } from 'react-redux';
import SpotifyTopMusic from '../components/SpotifyTopMusic';

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
});

const SpotifyTopMusicContainer = connect(
  mapStateToProps,
)(SpotifyTopMusic);

export default SpotifyTopMusicContainer;
