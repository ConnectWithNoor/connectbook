import Comment from '../../img/comment.png';
import Share from '../../img/share.png';
import Like from '../../img/like.png';
import NotLiked from '../../img/notlike.png';

import './Post.css';

const Post = ({ data }) => {
  return (
    <div className='post'>
      <img src={data.img} alt='post-img' />

      <div className='postReact'>
        <img src={data.liked ? Like : NotLiked} alt='react-icon' />
        <img src={Comment} alt='react-icon' />
        <img src={Share} alt='react-icon' />
      </div>

      <span>{data.likes} likes</span>

      <div className='detail'>
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
