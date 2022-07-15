import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SERVER_PUBLIC_IMAGE_FOLDER } from '../../constants/variables';

import './ProfileCard.css';
import { useEffect, useState } from 'react';

const ProfileCard = ({ isProfilePage }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const { posts } = useSelector((state) => state.postReducer);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    setPostCount(posts.filter((post) => post.userId._id === user._id).length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

  return (
    <div className='profileCard'>
      <div className='profileImages'>
        {/* <img src={require('../../img/cover.jpg')} alt='cover-img' /> */}
        <img
          src={
            user.coverPicture
              ? `${SERVER_PUBLIC_IMAGE_FOLDER}${user.coverPicture}`
              : `${SERVER_PUBLIC_IMAGE_FOLDER}cover.jpg`
          }
          alt='cover-img'
        />
        <img
          src={
            user.profilePicture
              ? `${SERVER_PUBLIC_IMAGE_FOLDER}${user.profilePicture}`
              : `${SERVER_PUBLIC_IMAGE_FOLDER}profileImg.jpg`
          }
          alt='profile-img'
        />
      </div>

      <div className='profileName'>
        <span>
          {user.firstName} {user.lastName}
        </span>
        <span>{user.worksAt ? user.worksAt : 'Where do you work?'}</span>
      </div>

      <div className='followStatus'>
        <hr />
        <div>
          <div className='follow'>
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>

          <div className='vl'></div>
          <div className='follow'>
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          {isProfilePage && (
            <>
              <div className='vl'></div>
              <div className='follow'>
                <span>{postCount}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {!isProfilePage && (
        <span>
          <Link className='dispose-Link' to={`/profile/${user._id}`}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
