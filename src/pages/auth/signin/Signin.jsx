import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import SigninForm from '../../../components/auth/signinForm/SigninForm';
import { userSigninAction } from '../../../redux/actions/userActions';
import { adminRoles } from '../../../utils/constant';
import { notify } from '../../../utils/utils';
import './signin.css';

const Signin = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  
  const handleAdminSignin = (email, password) => {
    const userData = { email, password, roles: adminRoles };
    dispatch(userSigninAction(userData)).then((res) => {
      if(userData.roles.toString() === adminRoles.toString() && res.payload.roles.toString() === adminRoles.toString()){
        history.push('/admin/dashboard');
        notify('success', 'Signin success', res.message);
      }
    });
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