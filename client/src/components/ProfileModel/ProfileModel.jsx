import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal, useMantineTheme } from '@mantine/core';
import toast from 'react-hot-toast';

import {
  updateProfileCoverImageAction,
  updateProfileInfoAction,
} from '../../state/Auth/ProfileModel/ProfileModelActions.js';

import '../../pages/Auth/Auth.css';

const ProfileModel = ({ modalOpened, setModalOpened, user }) => {
  const theme = useMantineTheme();
  const [formData, setFormData] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);

  const { message, error } = useSelector((state) => state.authReducer);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const dispatch = useDispatch();
  const params = useParams();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    error &&
      toast.error(error, {
        id: 'profile-component-error',
      });
  }, [error]);

  useEffect(() => {
    message &&
      !message.includes('User') &&
      toast.success(message, {
        id: 'profile-component-success',
      });
  }, [message]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      e.target.name === 'profilePicture'
        ? setProfilePicture(img)
        : setCoverPicture(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = formData;

    if (profilePicture) {
      const dataProfilePicture = new FormData();
      const fileName = Date.now() + profilePicture.name;
      dataProfilePicture.append('name', fileName);
      dataProfilePicture.append('file', profilePicture);
      data.profilePicture = fileName;

      try {
        dispatch(updateProfileCoverImageAction(dataProfilePicture));
      } catch (error) {
        toast.error('Unable to update. Please try again', {
          id: 'profile-component-error',
        });
        console.error(error);
      }
    }

    if (coverPicture) {
      const dataCoverPicture = new FormData();
      const fileName = Date.now() + coverPicture.name;
      dataCoverPicture.append('name', fileName);
      dataCoverPicture.append('file', coverPicture);
      data.coverPicture = fileName;

      try {
        dispatch(updateProfileCoverImageAction(dataCoverPicture));
      } catch (error) {
        toast.error('Unable to update. Please try again', {
          id: 'profile-component-error',
        });
        console.error(error);
      }
    }

    dispatch(updateProfileInfoAction(params.id, data));
    setProfilePicture(null);
    setCoverPicture(null);
    setModalOpened(false);
  };

  return (
    <div className='profileModel'>
      <Modal
        overlayColor={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        size={'55%'}
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      >
        <form className='infoForm' onSubmit={handleSubmit}>
          <h3>Your info</h3>
          <div>
            <input
              type='text'
              name='firstName'
              placeholder='First Name'
              className='infoInput'
              onChange={handleChange}
              value={formData?.firstName}
              required
            />

            <input
              type='text'
              name='lastName'
              placeholder='Last Name'
              className='infoInput'
              onChange={handleChange}
              value={formData?.lastName}
              required
            />
          </div>

          <div>
            <input
              type='text'
              name='worksAt'
              placeholder='Works at'
              className='infoInput'
              onChange={handleChange}
              value={formData?.worksAt}
            />
          </div>

          <div>
            <input
              type='text'
              name='livesIn'
              placeholder='Lives In'
              className='infoInput'
              onChange={handleChange}
              value={formData?.livesIn}
            />

            <input
              type='text'
              name='country'
              placeholder='Country'
              className='infoInput'
              onChange={handleChange}
              value={formData?.country}
            />
          </div>

          <div>
            <input
              type='text'
              name='relationshipStatus'
              placeholder='Relationship Status'
              className='infoInput'
              onChange={handleChange}
              value={formData?.relationshipStatus}
            />
          </div>

          <div>
            Profile Image
            <input
              type='file'
              name='profilePicture'
              onChange={handleImageChange}
            />
            Cover Image
            <input
              type='file'
              name='coverPicture'
              onChange={handleImageChange}
            />
          </div>

          <button className='button infoButton' type='submit' disabled>
            Update
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ProfileModel;
