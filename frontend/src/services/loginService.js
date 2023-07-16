import axios from 'axios'
const baseUrl = '/api/login'

const login = async (userObject) => {
  console.log(userObject, 'userObject')
  const response = await axios.post(baseUrl, userObject)
  console.log(response.data, 'response.data')
  return response.data
}

export default { login }