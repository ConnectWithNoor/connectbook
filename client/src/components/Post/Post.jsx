import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import { LikeUnlikePostAction } from '../../state/PostShare/PostFeed/PostFeedActions';

import Comment from '../../img/comment.png';
import Share from '../../img/share.png';
import Like from '../../img/like.png';
import NotLiked from '../../img/notlike.png';

import './Post.css';
import { SERVER_PUBLIC_IMAGE_FOLDER } from '../../constants/variables';

const Post = ({ data }) => {
  const controller = new AbortController();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authReducer.authData);
  const { error, loadingPosts, message } = useSelector(
    (state) => state.postReducer
  );
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const isTrue = data?.likes?.includes(user._id);
    setLiked(isTrue);
    setLikesCount(data?.likes?.length);
  }, [data, user._id]);

  useEffect(() => {
    setErrorMsg(error);
    error &&
      toast.error(error, {
        id: 'post-component',
      });
  }, [error]);

  useEffect(() => {
    message &&
      !message.includes('image') &&
      toast.success(message, {
        id: 'post-component',
      });
    setErrorMsg(null);
  }, [message]);

  useEffect(() => {
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLikeUnlikePost = () => {
    setErrorMsg(null);
    try {
      dispatch(LikeUnlikePostAction(data._id, controller));
    } catch (error) {
      setErrorMsg('Not able to perform the action. Please try again');
      console.error(error);
    }
  };

  return (
    <div className='post'>
      <img
        src={data.image ? `${SERVER_PUBLIC_IMAGE_FOLDER}${data.image}` : ''}
        alt='post-img'
      />

      <div className='postReact'>
        <img
          src={liked ? Like : NotLiked}
          alt='react-icon'
          style={
            loadingPosts ? { pointerEvents: 'none' } : { cursor: 'pointer' }
          }
          onClick={handleLikeUnlikePost}
        />
        <img src={Comment} alt='react-icon' style={{ cursor: 'pointer' }} />
        <img src={Share} alt='react-icon' style={{ cursor: 'pointer' }} />
      </div>
      <span className='error-msg'>{errorMsg}</span>

      <span className='post-likes'>{likesCount} likes</span>

      <div className='detail'>
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.description}</span>
      </div>
    </div>
  );
};

export default Post;
