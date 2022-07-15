import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostFeedTimelineAction } from '../../state/PostFeed/PostFeedActions';

import Post from '../Post/Post';
import './PostsFeed.css';

const PostsFeed = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authReducer.authData);
  const { posts, loadingPosts, loadingImage } = useSelector(
    (state) => state.postReducer
  );

  useEffect(() => {
    const controller = new AbortController();

    dispatch(getPostFeedTimelineAction(user._id, controller));

    return () => controller.abort();
  }, [dispatch, user._id]);

  return (
    <div className='postsFeed'>
      {!loadingImage &&
        !loadingPosts &&
        posts.map((post) => {
          return <Post key={post.id} data={post} />;
        })}
    </div>
  );
};

export default PostsFeed;
