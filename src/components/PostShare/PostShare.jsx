import { useState, useRef } from 'react';
import './PostShare.css';

import {
  UilScenery,
  UilPlayCircle,
  UilLocationPoint,
  UilSchedule,
  UilTimes,
} from '@iconscout/react-unicons';

const PostShare = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const imageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      setImage({ image: URL.createObjectURL(img) });
    }
  };

  return (
    <div className='postShare'>
      <img src={require('../../img/profileImg.jpg')} alt='profile-img' />
      <div className='inputDiv'>
        <input type='text' placeholder="What's happending" />
        <div className='postOptions'>
          <div
            className='option'
            onClick={() => imageRef.current.click()}
            style={{ color: 'var(--photo)' }}
          >
            <UilScenery />
            Photo
          </div>

          <div className='option' style={{ color: 'var(--video)' }}>
            <UilPlayCircle />
            Video
          </div>

          <div className='option' style={{ color: 'var(--location)' }}>
            <UilLocationPoint />
            Location
          </div>

          <div className='option' style={{ color: 'var(--shedule)' }}>
            <UilSchedule />
            Schedule
          </div>
          <button className='button ps-button'>Share</button>
          <div style={{ display: 'none' }}>
            <input
              type='file'
              name='myImage'
              onChange={imageChange}
              ref={imageRef}
            />
          </div>
        </div>
        {image && (
          <div className='previewImage'>
            <UilTimes onClick={() => setImage(null)} />
            <img src={image.image} alt='upload-img' />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
