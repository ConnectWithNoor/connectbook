import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UilSpinnerAlt } from '@iconscout/react-unicons';
import toast from 'react-hot-toast';

import { followPersonApi, unfollowPersonApi } from '../../../api/PersonsApi';
import { SERVER_PUBLIC_IMAGE_FOLDER } from '../../../constants/variables';

const PersonSingle = ({ person }) => {
  const [isFollowed, setisFollowed] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.authReducer.authData);

  const handleFollow = async () => {
    try {
      setLoading(true);
      const { data } = await followPersonApi(person._id);
      if (data.status) {
        setisFollowed(true);
      }
    } catch (error) {
      error &&
        toast.error(error?.response?.data?.message, {
          id: 'person-single-component-follow',
        });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async () => {
    try {
      setLoading(true);

      const { data } = await unfollowPersonApi(person._id);
      if (data.status) {
        setisFollowed(false);
      }
    } catch (error) {
      error &&
        toast.error(error?.response?.data?.message, {
          id: 'person-single-component-unfollow',
        });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.following.includes(person._id)) setisFollowed(true);
  }, [person, user]);

  return (
    <div className='follower' key={person._id}>
      <div>
        <img
          src={`${SERVER_PUBLIC_IMAGE_FOLDER}${person.profilePicture}`}
          alt='person-img'
          className='followerImg'
        />
        <div className='name'>
          <span>
            {person.firstName} {person.lastName}
          </span>
          <span>@{person.username.split('@')[0]}</span>
        </div>
      </div>
      {isFollowed ? (
        <button className='button fc-button' onClick={handleUnfollow}>
          {loading ? <UilSpinnerAlt className='loadingButton' /> : 'Unfollow'}
        </button>
      ) : (
        <button className='button fc-button' onClick={handleFollow}>
          {loading ? <UilSpinnerAlt className='loadingButton' /> : 'Follow'}
        </button>
      )}
    </div>
  );
};

export default PersonSingle;
