import { connect } from 'react-redux';
import Profile from '../components/Profile';

const mapStateToProps = (state) => ({
  user: state.user,
});

const ProfileContainer = connect(
  mapStateToProps,
)(Profile);

export default ProfileContainer;
