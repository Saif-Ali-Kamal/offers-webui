import React from 'react';
import { useDispatch } from 'react-redux';
import SigninForm from '../../../components/auth/signinForm/SigninForm';
import { userSigninAction } from '../../../redux/actions/userActions';
import { adminRoles } from '../../../utils/constant';
import './signin.css';

const Signin = () => {

  const dispatch = useDispatch();
  
  const handleAdminSignin = (email, password) => {
    const userData = { email, password, roles: adminRoles };
    dispatch(userSigninAction(userData));
  } 

  return (
    <React.Fragment>
      <div className='signin'>
        <div className='signin-card'>
          <SigninForm handleAdminSignin={handleAdminSignin}  />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Signin;