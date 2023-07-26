import axios from 'axios'
const baseURL = '/api/login'

const login = async (userObject=null) => {
  console.log(userObject, 'userObject')
  //console.log(userCookie, 'loginService cookie') <-- undef because httpOnly=true
  const response = await axios.post(baseURL, userObject)
  console.log(response.data, 'response.data')
  console.log(response, 'response')
  return response.data
}

export default { login }