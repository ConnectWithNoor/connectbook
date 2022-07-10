import PostSide from '../../components/PostSide/PostSide';
import ProfileSide from '../../components/ProfileSide/ProfileSide';
import './Home.css';

const Home = () => {
  return (
    <div className='home'>
      <div className='profileSide'>
        <ProfileSide />
      </div>
      <div className='postSide'>
        <PostSide />
      </div>
      <div className='rightSide'>Right</div>
    </div>
  );
};

export default Home;
