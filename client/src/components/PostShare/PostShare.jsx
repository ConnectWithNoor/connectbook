import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  UilScenery,
  UilPlayCircle,
  UilLocationPoint,
  UilSchedule,
  UilTimes,
  UilSpinnerAlt,
} from '@iconscout/react-unicons';
import toast from 'react-hot-toast';

import './PostShare.css';
import {
  updateImageAction,
  createPostAction,
} from '../../state/PostShare/PostShareActions';
import { SERVER_PUBLIC_IMAGE_FOLDER } from '../../constants/variables';

const PostShare = () => {
  const controller = new AbortController();
  const [image, setImage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const imageRef = useRef();
  const descRef = useRef();
  const formRef = useRef();

  const { user } = useSelector((state) => state.authReducer.authData);
  const { loadingPosts, error, loadingImage, message } = useSelector(
    (state) => state.postReducer
  );

  useEffect(() => {
    setErrorMsg(error);
    error &&
      toast.error(error, {
        id: 'profile-share-component',
      });
  }, [error]);

  useEffect(() => {
    message &&
      !message.includes('Post') &&
      toast.success(message, {
        id: 'image-uploaded',
      });
    formRef.current.reset();
    setErrorMsg(null);
    setImage(null);
    descRef.current.value = '';
  }, [message]);

  useEffect(() => {
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();

  const imageChange = (e) => {
    setErrorMsg(null);
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      setImage(img);
    }
  };

  const handleShare = (e) => {
    e.preventDefault();
    setErrorMsg(null);

    const newPost = {
      description: descRef.current.value,
    };

    if (!image) return setErrorMsg('Please upload an image');

    const data = new FormData();
    const fileName = Date.now() + image.name;
    data.append('name', fileName);
    data.append('file', image);
    newPost.image = fileName;
    try {
      dispatch(updateImageAction(data, controller));
      dispatch(createPostAction(newPost, controller));
    } catch (error) {
      setErrorMsg('Problem occured in uploading post. Please try again');
      console.error(error);
    }
  };

  return (
    <div className='postShare'>
      <img
        src={`${SERVER_PUBLIC_IMAGE_FOLDER}${user.profilePicture}`}
        alt='profile-img'
      />
      <div className='inputDiv' onSubmit={handleShare}>
        <form className='form' ref={formRef}>
          <input
            type='text'
            placeholder="What's happending"
            required
            ref={descRef}
          />
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
            <button
              className='button ps-button'
              type='submit'
              disabled={loadingImage || loadingPosts}
            >
              {loadingImage || loadingPosts ? (
                <UilSpinnerAlt className='loadingButton' />
              ) : (
                'Share'
              )}
            </button>
            <div style={{ display: 'none' }}>
              <input
                type='file'
                name='myImage'
                onChange={imageChange}
                ref={imageRef}
              />
            </div>
          </div>
        </form>
        {image && (
          <div className='previewImage'>
            <UilTimes
              onClick={() => {
                setErrorMsg(null);
                setImage(null);
                descRef.current.value = '';
              }}
            />
            <img src={URL.createObjectURL(image)} alt='upload-img' />
          </div>
        )}
        <span className='error-msg'>{errorMsg}</span>
      </div>
    </div>
  );
};

export default PostShare;
