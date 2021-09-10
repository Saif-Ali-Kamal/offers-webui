import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignupForm from '../../../components/auth/signupForm/SignupForm';
import { userSignupAction } from '../../../redux/actions/userActions';
import { adminRoles } from '../../../utils/constant';
import './signup.css';

const Signup = () => {

  const dispatch = useDispatch();

  // const loading = useSelector(state => state.user.)

  const handleAdminSignup = (name, email, password) => {
    const userData = { name, email, password, roles: adminRoles };
    dispatch(userSignupAction(userData));
  }

  return (
    <React.Fragment>
      <div className='signup'>
        <div className='signup-card'>
          <SignupForm handleAdminSignup={handleAdminSignup} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Signup;