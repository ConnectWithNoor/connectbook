import { useState } from 'react';
import { useSelector } from 'react-redux';
import Comment from '../../img/comment.png';
import Share from '../../img/share.png';
import Like from '../../img/like.png';
import NotLiked from '../../img/notlike.png';

import './Post.css';

const Post = ({ data }) => {
  const user = useSelector((state) => state.authReducer.authData);
  const [liked] = useState(data?.likes?.includes(user._id));
  const [likesCount] = useState(data?.likes?.length);

  const handleLikeUnlikePost = () => {};

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
        <img
          src={liked ? Like : NotLiked}
          alt='react-icon'
          style={{ cursor: 'pointer' }}
          onClick={handleLikeUnlikePost}
        />
        <img src={Comment} alt='react-icon' style={{ cursor: 'pointer' }} />
        <img src={Share} alt='react-icon' style={{ cursor: 'pointer' }} />
      </div>

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
