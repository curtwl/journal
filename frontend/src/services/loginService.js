import axios from 'axios'
const baseUrl = 'https://chingu-journal.onrender.com/api/login'

const login = async (userObject=null) => {
  console.log(userObject, 'userObject')
  //console.log(userCookie, 'loginService cookie') <-- undef because httpOnly=true
  const response = await axios.post(baseUrl, userObject)
  console.log(response.data, 'response.data')
  console.log(response, 'response')
  return response.data
}

export default { login }
