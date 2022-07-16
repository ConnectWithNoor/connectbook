import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import './PersonCard.css';
import { getAllPersonsApi } from '../../api/PersonsApi';
import { SERVER_PUBLIC_IMAGE_FOLDER } from '../../constants/variables';

const PersonCard = () => {
  const [person, setPerson] = useState([]);
  // const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPersons = async () => {
      try {
        const { data } = await getAllPersonsApi(controller);
        setPerson(data);
      } catch (error) {
        error &&
          toast.error(error?.response?.data?.message, {
            id: 'person-card-component',
          });
        console.error(error);
      }
    };

    fetchPersons();
    return () => controller.abort();
  }, []);
  return (
    <div className='followersCard'>
      <h3>People you may know</h3>

      {person.map((follower) => {
        return (
          <div className='follower' key={follower._id}>
            <div>
              <img
                src={`${SERVER_PUBLIC_IMAGE_FOLDER}${follower.profilePicture}`}
                alt='follower-img'
                className='followerImg'
              />
              <div className='name'>
                <span>
                  {follower.firstName} {follower.lastName}
                </span>
                <span>@{follower.username.split('@')[0]}</span>
              </div>
            </div>
            <button className='button fc-button'>Follow</button>
          </div>
        );
      })}
    </div>
  );
};

export default PersonCard;
