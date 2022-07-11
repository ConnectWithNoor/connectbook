import Home from '../../img/home.png';
import Noti from '../../img/noti.png';
import Comment from '../../img/comment.png';
import { UilSetting } from '@iconscout/react-unicons';

import TrendCard from './TrendCard/TrendCard';
import { useState } from 'react';
import './RightSide.css';
import ShareModal from '../shareModal/shareModal';

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className='rightSide'>
      <div className='navIcons'>
        <img src={Home} alt='home' />
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
