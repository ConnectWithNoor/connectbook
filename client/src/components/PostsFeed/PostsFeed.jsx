import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostFeedTimelineAction } from '../../state/PostShare/PostFeed/PostFeedActions';

import Post from '../Post/Post';
import './PostsFeed.css';

const PostsFeed = () => {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState(null);

  const { user } = useSelector((state) => state.authReducer.authData);
  const { posts, loadingImage } = useSelector((state) => state.postReducer);

  useEffect(() => {
    const controller = new AbortController();
    try {
      dispatch(getPostFeedTimelineAction(controller));
    } catch (error) {
      setErrorMsg('Not able to perform the action. Please try again');
      console.error(error);
    }

    return () => controller.abort();
  }, [dispatch, user._id]);

  return (
    <div className='postsFeed'>
      <span className='error-msg'>{errorMsg}</span>
      {!loadingImage &&
        posts.map((post, id) => {
          return <Post key={id} data={post} />;
        })}
    </div>
  );
};

export default PostsFeed;
