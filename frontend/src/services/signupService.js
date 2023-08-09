import axios from 'axios'
const baseURL = '/api/signup'
import { token, setToken, isJWTExpired } from '../utils/tokenHelper'

const signup = async (userObject) => {
  const response = await axios.post(baseURL, userObject)
  return response.data
}

const deleteAccount = async (id) => {
  await (isJWTExpired(token))

  const config = {
    headers: { Authorization: token },
  }

    const response = await axios.delete(`${baseURL}/${id}`, config)
    return response.data
}

export default { signup, deleteAccount }