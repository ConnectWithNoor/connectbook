import Post from '../Post/Post';
import { PostsData } from '../../Data/PostsData';
import './PostsFeed.css';

const PostsFeed = () => {
  return (
    <div className='postsFeed'>
      {PostsData.map((post) => {
        return <Post key={post.id} data={post} />;
      })}
    </div>
  );
};

export default PostsFeed;
