import { generateRefreshTokenApi } from '../api/AuthApi';

const useRefreshToken = () => {
  const refresh = async () => {
    const { data } = await generateRefreshTokenApi();

    // set accessToken in redux;

    return data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
