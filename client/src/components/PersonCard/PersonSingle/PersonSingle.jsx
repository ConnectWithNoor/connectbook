import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UilSpinnerAlt } from '@iconscout/react-unicons';
import toast from 'react-hot-toast';

import { SERVER_PUBLIC_IMAGE_FOLDER } from '../../../constants/variables';
import {
  followPersonAction,
  unfollowPersonAction,
} from '../../../state/Auth/Person/PersonActions';

const PersonSingle = ({ person }) => {
  const [isFollowed, setisFollowed] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authReducer.authData);
  const {
    loadingAuth: loading,
    error,
    message,
  } = useSelector((state) => state.authReducer);

  useEffect(() => {
    error &&
      toast.error(error, {
        id: 'person-single-component-error',
      });
  }, [error]);

  useEffect(() => {
    message &&
      toast.success(message, {
        id: 'person-single-component-message',
      });
  }, [message]);

  useEffect(() => {
    if (user.following.includes(person._id)) setisFollowed(true);
    else setisFollowed(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleFollow = async () => {
    try {
      dispatch(followPersonAction(person._id));
    } catch (error) {
      error &&
        toast.error(error?.response?.data?.message, {
          id: 'person-single-component-follow',
        });
      console.error(error);
    }
  };

  const handleUnfollow = async () => {
    try {
      dispatch(unfollowPersonAction(person._id));
    } catch (error) {
      error &&
        toast.error(error?.response?.data?.message, {
          id: 'person-single-component-unfollow',
        });
      console.error(error);
    }
  };

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
        <button
          className='button fc-button'
          disabled={loading}
          onClick={handleUnfollow}
        >
          {loading ? <UilSpinnerAlt className='loadingButton' /> : 'Unfollow'}
        </button>
      ) : (
        <button
          className='button fc-button'
          disabled={loading}
          onClick={handleFollow}
        >
          {loading ? <UilSpinnerAlt className='loadingButton' /> : 'Follow'}
        </button>
      )}
    </div>
  );
};

export default PersonSingle;
