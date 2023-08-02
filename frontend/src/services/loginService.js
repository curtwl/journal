import axios from 'axios'
import Cookies from 'js-cookie'
const baseURL = '/api/login'

const login = async (userObject=null) => {
    try {
      const response = await axios.post(baseURL, userObject)
      return response.data
    } catch (error) {
    console.log(error)
  }
}

const loginWithCookie = async () => {
  try {
    const userCookie = Cookies.get('userCookie')

    const config = {
      headers: { 'userCookie': userCookie }
    }

    const response = await axios.post(baseURL, config)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export default { login, loginWithCookie }