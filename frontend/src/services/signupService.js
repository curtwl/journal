import axios from 'axios'
const baseURL = 'https://chingu-journal.onrender.com/api/signup'
import Cookies from 'js-cookie'

const signup = async (userObject) => {
  console.log(userObject, 'userObject')
  const response = await axios.post(baseURL, userObject)
  return response.data
}

const deleteAccount = async (id) => {
    const userCookie = Cookies.get('userCookie')

    const config = {
        'userCookie': userCookie
      }

    const response = await axios.delete(`${baseURL}/${id}`, config)
    return response.data
}

export default { signup, deleteAccount }
