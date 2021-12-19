import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import SignupForm from '../../../components/auth/signupForm/SignupForm';
import { userSignupAction } from '../../../redux/actions/userActions';
import { roles } from '../../../utils/constant';
import { notify } from '../../../utils/utils';
import './signup.css';

const Signup = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  // const loading = useSelector(state => state.user.)

  const handleAdminSignup = (name, email, password) => {
    const userData = { name, email, password, role: roles.admin };
    dispatch(userSignupAction(userData)).then((res) => {
      if(userData.role === roles.admin){
        history.push('/admin/signin')
        notify('success', 'Signup success', res.message);
      }
    });
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