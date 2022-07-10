import './ProfileCard.css';

const ProfileCard = () => {
  const profilePage = true;
  return (
    <div className='profileCard'>
      <div className='profileImages'>
        <img src={require('../../img/cover.jpg')} alt='cover-img' />
        <img src={require('../../img/profileImg.jpg')} alt='profile-img' />
      </div>

      <div className='profileName'>
        <span>Zendeya Nu</span>
        <span>Senior UI/UX designer</span>
      </div>

      <div className='followStatus'>
        <hr />
        <div>
          <div className='follow'>
            <span>6,810</span>
            <span>Following</span>
          </div>

          <div className='vl'></div>
          <div className='follow'>
            <span>1</span>
            <span>Followers</span>
          </div>
          {profilePage && (
            <>
              <div className='vl'></div>
              <div className='follow'>
                <span>3</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {!profilePage && <span>My Profile</span>}
    </div>
  );
};

export default ProfileCard;
