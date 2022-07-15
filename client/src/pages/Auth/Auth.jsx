import { useState, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UilSpinnerAlt } from '@iconscout/react-unicons';
import toast from 'react-hot-toast';

import {
  loginUserAction,
  registerUserAction,
} from '../../state/Auth/AuthActions';
import './Auth.css';

const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  confirmPass: '',
};

const Auth = () => {
  const controller = new AbortController();
  const [isLogin, setIsLogin] = useState(true);
  const { error, loadingAuth } = useSelector((state) => state.authReducer);
  const [data, setData] = useState(initialState);
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setErrorMsg(error);
    error && toast.error(error);
  }, [error]);

  useEffect(() => {
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    controller.abort();
    setData(initialState);
    setErrorMsg(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (isLogin) {
      dispatch(loginUserAction(data, controller));
    } else {
      if (data.password !== data.confirmPass) {
        setErrorMsg('Passwords must match');
        return;
      }

      dispatch(registerUserAction(data, controller));
    }
  };

  return (
    <div className='auth'>
      <div className='a-left'>
        <img src={require('../../img/logo.png')} alt='logo' />
        <div className='webName'>
          <h1>ZKC Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      {isLogin ? (
        <Login
          setIsLogin={setIsLogin}
          handleChange={handleChange}
          resetForm={resetForm}
          error={errorMsg}
          handleSubmit={handleSubmit}
          loading={loadingAuth}
        />
      ) : (
        <Signup
          setIsLogin={setIsLogin}
          handleChange={handleChange}
          resetForm={resetForm}
          error={errorMsg}
          handleSubmit={handleSubmit}
          loading={loadingAuth}
        />
      )}
    </div>
  );
};

const Signup = memo(
  ({ setIsLogin, handleChange, resetForm, error, handleSubmit, loading }) => {
    return (
      <div className='a-right'>
        <form className='infoForm authForm' onSubmit={handleSubmit}>
          <h3>Sign up</h3>

          <div>
            <input
              type='text'
              placeholder='First Name'
              className='infoInput'
              name='firstName'
              onChange={handleChange}
              required
            />
            <input
              type='text'
              placeholder='Last Name'
              className='infoInput'
              name='lastName'
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              type='text'
              placeholder='Username'
              className='infoInput'
              name='username'
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              type='password'
              placeholder='Password'
              className='infoInput'
              name='password'
              required
              onChange={handleChange}
            />
            <input
              type='password'
              placeholder='Confirm Password'
              className='infoInput'
              name='confirmPass'
              required
              onChange={handleChange}
            />
          </div>
          <span className='error-msg'>{error}</span>
          <div>
            <span
              className='auth-acc-already'
              onClick={() => {
                resetForm();
                setIsLogin((prev) => !prev);
              }}
            >
              Already have an account. Login!
            </span>
          </div>
          <button
            className='button infoButton'
            type='submit'
            disabled={loading}
          >
            {loading ? <UilSpinnerAlt className='loadingButton' /> : 'Register'}
          </button>
        </form>
      </div>
    );
  }
);

const Login = memo(
  ({ setIsLogin, handleChange, resetForm, error, handleSubmit, loading }) => {
    return (
      <div className='a-right'>
        <form className='infoForm authForm' onSubmit={handleSubmit}>
          <h3>Sign in</h3>

          <div>
            <input
              type='text'
              placeholder='Username'
              className='infoInput'
              name='username'
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type='password'
              placeholder='Password'
              className='infoInput'
              name='password'
              onChange={handleChange}
              required
            />
          </div>
          <span className='error-msg'>{error}</span>
          <div>
            <span
              className='auth-acc-already'
              onClick={() => {
                resetForm();
                setIsLogin((prev) => !prev);
              }}
            >
              Don't have an account. Register Now!
            </span>
          </div>
          <button className='button infoButton' disabled={loading}>
            {loading ? <UilSpinnerAlt className='loadingButton' /> : 'Log in'}
          </button>
        </form>
      </div>
    );
  }
);

export default Auth;
