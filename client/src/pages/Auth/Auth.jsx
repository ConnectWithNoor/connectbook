import { useState, memo } from 'react';
import { useDispatch } from 'react-redux';
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
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState(initialState);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setData(initialState);
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (isLogin) {
      dispatch(loginUserAction(data));
    } else {
      if (data.password !== data.confirmPass) {
        setError('Passwords must match');
        return;
      }

      dispatch(registerUserAction(data));
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
          error={error}
          handleSubmit={handleSubmit}
        />
      ) : (
        <Signup
          setIsLogin={setIsLogin}
          handleChange={handleChange}
          resetForm={resetForm}
          error={error}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

const Signup = memo(
  ({ setIsLogin, handleChange, resetForm, error, handleSubmit }) => {
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
            />
            <input
              type='text'
              placeholder='Last Name'
              className='infoInput'
              name='lastName'
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type='text'
              placeholder='Username'
              className='infoInput'
              name='username'
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type='password'
              placeholder='Password'
              className='infoInput'
              name='password'
              onChange={handleChange}
            />
            <input
              type='password'
              placeholder='Confirm Password'
              className='infoInput'
              name='confirmPass'
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
          <button className='button infoButton' type='submit'>
            Sign up
          </button>
        </form>
      </div>
    );
  }
);

const Login = memo(
  ({ setIsLogin, handleChange, resetForm, error, handleSubmit }) => {
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
            />
          </div>
          <div>
            <input
              type='password'
              placeholder='Password'
              className='infoInput'
              name='password'
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
              Don't have an account Sign up
            </span>
          </div>
          <button className='button infoButton'>Login</button>
        </form>
      </div>
    );
  }
);

export default Auth;
