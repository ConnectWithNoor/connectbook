import PostsFeed from '../PostsFeed/PostsFeed';
import PostShare from '../PostShare/PostShare';
import './PostSide.css';

const PostSide = () => {
  return (
    <div className='postSide'>
      <PostShare />
      <PostsFeed />
    </div>
  );
};

export default PostSide;
