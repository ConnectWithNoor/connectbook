import './LogoSearch.css';

import { UilSearch } from '@iconscout/react-unicons';

const LogoSearch = () => {
  return (
    <div className='logoSearch'>
      <img src={require('../../img/logo.png')} alt='logo' className='s-logo' />
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
