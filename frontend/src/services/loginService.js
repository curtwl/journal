import axios from 'axios'
import Cookies from 'js-cookie'
const baseURL = '/api/login'
import jwt_decode from "jwt-decode"
import { setToken } from '../utils/tokenHelper'

const login = async (userObject=null) => {
    try {
      const response = await axios.post(baseURL, userObject)
      return response.data
    } catch (error) {
      console.log(error)
  }
}

const refreshTokenAndLogin = async () => {
  try {
    const userCookie = Cookies.get('userCookie')

    const config = {
      headers: { 'userCookie': userCookie }
    }

    const response = await axios.get('/api/refresh', config)

    if (response.status !== 200) {
      return
    } 

    // get username and id from access token
    const decodedTokenData = jwt_decode(response.data.accessToken)

    return [response.data.accessToken, decodedTokenData]
  } catch (error) {
    console.log(error)
  }
}
export default { login, refreshTokenAndLogin }