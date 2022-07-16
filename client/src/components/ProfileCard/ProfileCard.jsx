import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UilSpinnerAlt } from '@iconscout/react-unicons';

import { SERVER_PUBLIC_IMAGE_FOLDER } from '../../constants/variables';
import './ProfileCard.css';

const ProfileCard = ({ isProfilePage }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const { loadingUserProfile } = useSelector((state) => state.authReducer);

  const { posts } = useSelector((state) => state.postReducer);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    setPostCount(posts.filter((post) => post.userId._id === user._id).length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

  return (
    <div className='profileCard'>
      <div className='profileImages'>
        <img
          src={`${SERVER_PUBLIC_IMAGE_FOLDER}${user.coverPicture}`}
          alt='cover-img'
        />
        <img
          src={`${SERVER_PUBLIC_IMAGE_FOLDER}${user.profilePicture}`}
          alt='profile-img'
        />
      </div>

      <div className='profileName'>
        {loadingUserProfile ? (
          <span>
            <UilSpinnerAlt className='loadingButton' />
          </span>
        ) : (
          <>
            <span>
              {user.firstName} {user.lastName}
            </span>
            <span>{user.worksAt ? user.worksAt : 'Where do you work?'}</span>
          </>
        )}
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
