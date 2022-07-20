import { generateRefreshToken } from '../api/AuthApi'

const useRefreshToken = () => {
  const refresh = async () => {
    const {data} = await generateRefreshToken()

    // set accessToken in redux;


    return data.accessToken
  }

  return refresh
}

export default useRefreshToken