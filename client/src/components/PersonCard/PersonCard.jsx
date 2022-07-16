import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import './PersonCard.css';
import { getAllPersonsApi } from '../../api/PersonsApi';
import PersonSingle from './PersonSingle/PersonSingle';

const PersonCard = () => {
  const [person, setPerson] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPersons = async () => {
      try {
        const { data } = await getAllPersonsApi(controller);
        setPerson(data);
      } catch (error) {
        error?.response?.data?.message &&
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
      <h3>People that might make your day</h3>

      {person.map((person) => (
        <PersonSingle person={person} key={person._id} />
      ))}
    </div>
  );
};

export default PersonCard;
