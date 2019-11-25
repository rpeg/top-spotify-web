import { connect } from 'react-redux';
import { setUser } from '../actions/actions';
import OAuth from '../components/OAuth';

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => {
    dispatch(setUser(user));
  },
});

const OAuthContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OAuth);

export default OAuthContainer;
