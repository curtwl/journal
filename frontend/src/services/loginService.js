import axios from 'axios'
const baseURL = '/api/login'

const login = async (userObject=null) => {
  console.log(userObject, 'userObject')
  //console.log(userCookie, 'loginService cookie') <-- undef because httpOnly=true
  
    try {
      const response = await axios.post(baseURL, userObject)
      console.log(response.data, 'response.data')
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
    
    await axios.post('/api/login', config)
  } catch (error) {
    console.log(error)
  }
}
export default { login, loginWithCookie }