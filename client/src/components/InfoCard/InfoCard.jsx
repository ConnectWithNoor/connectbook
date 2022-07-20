import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { UilPen, UilSpinnerAlt } from '@iconscout/react-unicons';
import ProfileModel from '../ProfileModel/ProfileModel';

import './InfoCard.css';
import { useEffect } from 'react';
import { getPersonByIdApi } from '../../api/PersonsApi';
import { logoutUserAction } from '../../state/Auth/AuthActions';

const InfoCard = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const controllerRef = useRef(null);

  const [modalOpened, setModalOpened] = useState(false);
  const [profileUser, setProfileUser] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);

  const { user } = useSelector((state) => state.authReducer.authData);
  const { loadingUserProfile } = useSelector((state) => state.authReducer);

  const fetchUser = async () => {
    if (params.id === user._id) return setProfileUser(user);
    else {
      const profileUser = await getPersonByIdApi(
        params.id,
        controllerRef.current
      );
      return setProfileUser(profileUser);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      fetchUser();
    } catch (error) {
      setErrorMsg('Not able to perform the action. Please try again');
      console.error(error);
    }

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleLogout = () => {
    try {
      dispatch(logoutUserAction(controllerRef.current));
    } catch (error) {
      setErrorMsg('Not able to perform the action. Please try again');
      console.error(error);
    }
  };

  return (
    <div className='infoCard'>
      <div className='infoHead'>
        <h4>Your Info</h4>
        {user._id === params.id && (
          <div>
            {loadingUserProfile ? (
              <UilSpinnerAlt className='loadingButton' />
            ) : (
              <UilPen
                width='2rem'
                height='1.2rem'
                onClick={() => setModalOpened(true)}
              />
            )}

            <ProfileModel
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              user={user}
            />
          </div>
        )}
      </div>
      <div className='info'>
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser.relationshipStatus}</span>
      </div>
      <div className='info'>
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser.livesIn}</span>
      </div>
      <div className='info'>
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>
      <button className='button logout-button' onClick={handleLogout}>
        Logout
      </button>
      <span className='error-msg'>{errorMsg}</span>
    </div>
  );
};

export default InfoCard;
