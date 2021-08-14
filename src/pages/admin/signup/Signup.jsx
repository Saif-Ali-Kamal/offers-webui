import React from 'react';
import { useHistory } from 'react-router';
import SignupForm from '../../../components/admin/signupForm/SignupForm';
import { userSignup } from '../../../services/users';
import { notify, incrementPendingRequests, decrementPendingRequests } from '../../../utils';
import './signup.css';

const Signup = () => {

  const history = useHistory();

  const handleAdminSignup = (name, email, password) => {
    incrementPendingRequests();
    userSignup({ name: name, email: email, password: password, isAdmin: true})
    .then((msg) => {
      history.push('/admin/signin');
      notify('success', 'Signup success', msg);
    }).catch(ex => notify('error', 'Signup Error', ex))
    .finally(() => decrementPendingRequests())
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