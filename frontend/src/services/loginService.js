import axios from 'axios'
import Cookies from 'js-cookie'
const baseURL = '/api/login'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const login = async (userObject=null) => {
    try {
      const response = await axios.post(baseURL, userObject)
      console.log(response.data.accessToken)
      return response.data
    } catch (error) {
    console.log(error)
  }
}

const loginWithCookie = async () => {
  try {
    // const userCookie = Cookies.get('userCookie')
    console.log('test')
    const config = {
      headers: { Authorization: token }
    }

    const response = await axios.post(baseURL, config)
    return response.data
  } catch (error) {
    // need new access token
    try {
      const response = await axios.get('/api/refresh', config)
      console.log(response, 'test')
      return response.data
    } catch {
      console.log('test')
      console.log(error)
    }
  }
}
export default { login, loginWithCookie, setToken }