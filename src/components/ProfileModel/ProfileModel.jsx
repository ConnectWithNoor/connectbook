import { Modal, useMantineTheme } from '@mantine/core';
import '../../pages/Auth/Auth.css';

const ProfileModel = ({ modalOpened, setModalOpened }) => {
  const theme = useMantineTheme();
  return (
    <div className='profileModel'>
      <Modal
        overlayColor={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        size={'55%'}
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      >
        <form className='infoForm'>
          <h3>Your info</h3>
          <div>
            <input
              type='text'
              name='firstName'
              placeholder='First Name'
              className='infoInput'
            />

            <input
              type='text'
              name='lastName'
              placeholder='Last Name'
              className='infoInput'
            />
          </div>

          <div>
            <input
              type='text'
              name='worksAt'
              placeholder='Works at'
              className='infoInput'
            />
          </div>

          <div>
            <input
              type='text'
              name='livesIn'
              placeholder='Lives In'
              className='infoInput'
            />

            <input
              type='text'
              name='country'
              placeholder='Country'
              className='infoInput'
            />
          </div>

          <div>
            <input
              type='text'
              name='relationshipStatus'
              placeholder='Relationship Status'
              className='infoInput'
            />
          </div>

          <div>
            Profile Image
            <input type='file' name='profileImage' />
            Cover Image
            <input type='file' name='coverImage' />
          </div>

          <button className='button infoButton'>Update</button>
        </form>
      </Modal>
    </div>
  );
};

export default ProfileModel;
