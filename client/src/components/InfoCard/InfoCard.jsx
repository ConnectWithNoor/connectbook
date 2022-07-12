import { UilPen } from '@iconscout/react-unicons';
import { useState } from 'react';
import ProfileModel from '../ProfileModel/ProfileModel';

import './InfoCard.css';

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className='infoCard'>
      <div className='infoHead'>
        <h4>Your Info</h4>
        <div>
          <UilPen
            width='2rem'
            height='1.2rem'
            onClick={() => setModalOpened(true)}
          />
          <ProfileModel
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
          />
        </div>
      </div>

      <div className='info'>
        <span>
          <b>Status </b>
        </span>
        <span>In relationship</span>
      </div>

      <div className='info'>
        <span>
          <b>Lives in </b>
        </span>
        <span>Multan</span>
      </div>

      <div className='info'>
        <span>
          <b>Works at </b>
        </span>
        <span>Optimyse</span>
      </div>
      <button className='button logout-button'>Logout</button>
    </div>
  );
};

export default InfoCard;
