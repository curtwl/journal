import axios from 'axios'
import Cookies from 'js-cookie'
const baseURL = '/api/login'
import jwt_decode from "jwt-decode"

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const login = async (userObject=null) => {
    try {
      const response = await axios.post(baseURL, userObject)
      console.log(response.data.accessToken)
      // const decoded = jwt_decode(response.data.accessToken)
      // console.log(decoded)
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
    // get username and if from access token
    const decodedTokenData = jwt_decode(response.data.accessToken)
    console.log(response.data.accessToken)
    return [response.data.accessToken, decodedTokenData]
  } catch (error) {
    console.log(error)
    // try {
    //   const response = await axios.get('/api/refresh', config)
    //   console.log(response, 'test')
    //   return response.data
    // } catch {
    //   console.log('test')
    //   console.log(error)
    // }
  }
}
export default { login, refreshTokenAndLogin, setToken }