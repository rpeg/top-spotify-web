import { connect } from 'react-redux';
import SpotifyTopMusic from '../components/SpotifyTopMusic';

const mapStateToProps = (state) => ({
  user: state.user,
});

const SpotifyTopMusicContainer = connect(
  mapStateToProps,
)(SpotifyTopMusic);

export default SpotifyTopMusicContainer;
