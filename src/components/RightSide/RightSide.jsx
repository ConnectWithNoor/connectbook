import Home from '../../img/home.png';
import Noti from '../../img/noti.png';
import Comment from '../../img/comment.png';
import { UilSetting } from '@iconscout/react-unicons';

import './RightSide.css';

const RightSide = () => {
  return (
    <div className='rightSide'>
      <div className='navIcons'>
        <img src={Home} alt='home' />
        <UilSetting />
        <img src={Noti} alt='noti' />
        <img src={Comment} alt='comment' />
      </div>
    </div>
  );
};

export default RightSide;
