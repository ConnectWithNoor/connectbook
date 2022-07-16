import LogoSearch from '../LogoSearch/LogoSearch';
import PersonCard from '../PersonCard/PersonCard';
import InfoCard from '../InfoCard/InfoCard';
import './ProfileLeft.css';

const ProfileLeft = () => {
  return (
    <div className='profileLeft'>
      <LogoSearch />
      <InfoCard />
      <PersonCard />
    </div>
  );
};

export default ProfileLeft;
