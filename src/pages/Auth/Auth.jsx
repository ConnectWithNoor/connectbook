import './Auth.css';

const Auth = () => {
  return (
    <div className='auth'>
      <div className='a-left'>
        <img src={require('../../img/logo.png')} alt='logo' />
        <div className='webName'>
          <h1>ZKC Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      <Login />
    </div>
  );
};

const Signup = () => {
  return (
    <div className='a-right'>
      <form className='infoForm authForm'>
        <h3>Sign up</h3>

        <div>
          <input
            type='text'
            placeholder='First Name'
            className='infoInput'
            name='firstName'
          />
          <input
            type='text'
            placeholder='Last Name'
            className='infoInput'
            name='LastName'
          />
        </div>

        <div>
          <input
            type='text'
            placeholder='Username'
            className='infoInput'
            name='username'
          />
        </div>

        <div>
          <input
            type='password'
            placeholder='Password'
            className='infoInput'
            name='password'
          />
          <input
            type='password'
            placeholder='Confirm Password'
            className='infoInput'
            name='confirmPass'
          />
        </div>

        <div>
          <span className='auth-acc-already'>
            Already have an account. LOGIN!
          </span>
        </div>
        <button className='button infoButton' type='submit'>
          signup
        </button>
      </form>
    </div>
  );
};

const Login = () => {
  return (
    <div className='a-right'>
      <form className='infoForm authForm'>
        <h3>Sign up</h3>

        <div>
          <input
            type='text'
            placeholder='Username'
            className='infoInput'
            name='username'
          />
        </div>
        <div>
          <input
            type='password'
            placeholder='Password'
            className='infoInput'
            name='password'
          />
        </div>
        <div>
          <span style={{ fontSize: '12px' }}>
            Don't have an account Sign up
          </span>
          <button className='button infoButton'>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
