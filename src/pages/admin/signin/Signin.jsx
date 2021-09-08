import React from 'react';
import { useHistory } from 'react-router';
import { userSigninService } from '../../../services/users';
import SigninForm from '../../../components/admin/signinForm/SigninForm';
import { incrementPendingRequests, decrementPendingRequests, notify, saveToken } from '../../../utils/utils';
import './signin.css';

const Signin = () => {

  const history = useHistory();
  
  const handleAdminSignin = (email, password) => {
    incrementPendingRequests()
    userSigninService({ email: email, password: password, isAdmin: true })
    .then(({msg, token}) => {
      saveToken(token);
      history.push('/admin/dashboard');
      notify('success', 'Signup success', msg);
    }).catch(ex => notify('error', 'Signup Error', ex))
    .finally(() => decrementPendingRequests())
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