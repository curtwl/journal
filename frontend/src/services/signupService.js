import axios from 'axios'
const baseUrl = '/api/signup'

const signup = async (userObject) => {
  console.log(userObject, 'userObject')
  const response = await axios.post(baseUrl, userObject)
  return response.data
}

export default { signup }