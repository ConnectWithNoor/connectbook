import { useNavigate } from 'react-router-dom';
import { UilSearch } from '@iconscout/react-unicons';

import './LogoSearch.css';
const LogoSearch = () => {
  const navigate = useNavigate();
  return (
    <div className='logoSearch'>
      <img
        src={require('../../img/logo.png')}
        alt='logo'
        className='s-logo'
        onClick={() => navigate('/')}
      />
      <div className='search'>
        <input type='text' placeholder='#Explore' />
        <div className='s-icon'>
          <UilSearch />
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;
