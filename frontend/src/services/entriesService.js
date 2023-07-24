import axios from 'axios'
import Cookies from 'js-cookie'

const baseURL = 'https://chingu-journal.onrender.com/api/entries'
let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  console.log(token)
}

const getAllEntries = async () => {
  try {
    const userCookie = Cookies.get('userCookie')

    const config = {
      headers: { 'userCookie': userCookie }
    }
    
    const response = await axios.post('/api/login', config)
    const response2 = await axios.get(baseURL)
    
    return response.data, response2.data
  }
  catch (error) {
    if (error.response) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log('Error', error.message)
    }
    const response = await axios.get(baseURL)
    return response.data
  }
  
}

const createEntry = async (newEntry) => {
  const userCookie = Cookies.get('userCookie')

  const config = {
    'userCookie': userCookie
  }

  const response = await axios.post(baseURL, newEntry, config)
  console.log(response)
  return response.data
}

const updateEntry = async (id, updatedEntry) => {
  const response = await axios.put(`${baseURL}/${id}`, updatedEntry)
  return response.data
}

const deleteEntry = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseURL}/${id}`, config)
  return response.data
}

export default { baseURL, getAllEntries, createEntry, updateEntry, deleteEntry, setToken }
