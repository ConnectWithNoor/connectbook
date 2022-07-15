import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UilSetting } from '@iconscout/react-unicons';

import Home from '../../img/home.png';
import Noti from '../../img/noti.png';
import Comment from '../../img/comment.png';

import TrendCard from './TrendCard/TrendCard';
import ShareModal from '../shareModal/shareModal';
import './RightSide.css';

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className='rightSide'>
      <div className='navIcons'>
        <Link className='dispose-Link' to='/home'>
          <img src={Home} alt='home' />
        </Link>
        <UilSetting />
        <img src={Noti} alt='noti' />
        <img src={Comment} alt='comment' />
      </div>

      <TrendCard />

      <button className='button r-button' onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
