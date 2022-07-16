import PersonCard from '../PersonCard/PersonCard';
import LogoSearch from '../LogoSearch/LogoSearch';
import ProfileCard from '../ProfileCard/ProfileCard';
import './ProfileSide.css';

const ProfileSide = () => {
  return (
    <div className='profileSide'>
      <LogoSearch />
      <ProfileCard isProfilePage={false} />
      <PersonCard />
    </div>
  );
};

export default ProfileSide;
