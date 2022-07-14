import { Followers } from '../../data/FollowersData';

import './FollowersCard.css';

const FollowersCard = () => {
  return (
    <div className='followersCard'>
      <h3>Who is following you</h3>

      {Followers.map((follower) => {
        return (
          <div className='follower' key={follower.id}>
            <div>
              <img
                src={follower.img}
                alt='follower-img'
                className='followerImg'
              />
              <div className='name'>
                <span>{follower.name}</span>
                <span>@{follower.username}</span>
              </div>
            </div>
            <button className='button fc-button'>Follow</button>
          </div>
        );
      })}
    </div>
  );
};

export default FollowersCard;
