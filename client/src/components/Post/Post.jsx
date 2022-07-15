import Comment from '../../img/comment.png';
import Share from '../../img/share.png';
import Like from '../../img/like.png';
import NotLiked from '../../img/notlike.png';

import './Post.css';

const Post = ({ data }) => {
  return (
    <div className='post'>
      <img
        src={
          data.image
            ? `${process.env.REACT_APP_SERVER_PUBLIC_IMAGE_FOLDER}${data.image}`
            : ''
        }
        alt='post-img'
      />

      <div className='postReact'>
        <img src={data.liked ? Like : NotLiked} alt='react-icon' />
        <img src={Comment} alt='react-icon' />
        <img src={Share} alt='react-icon' />
      </div>

      <span className='post-likes'>{data.likes.length} likes</span>

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
