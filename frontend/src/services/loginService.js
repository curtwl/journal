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

export default { login }