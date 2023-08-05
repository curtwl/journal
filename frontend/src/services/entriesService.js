import axios from 'axios'
import Cookies from 'js-cookie'
import loginService from './loginService'
const baseURL = '/api/entries'

let token = null
const setToken = (newToken) => {
  console.log(newToken)
  token = `Bearer ${newToken}`
}

const getAllEntries = async () => {
  console.log(token)
  try {
    const config = {
      headers: { Authorization: token },
    }
    
    const response = await axios.get(baseURL, config)
    console.log(response.data)
    return response.data
  }
  catch (error) {
    console.log(token)
    
    try {
      const test = await loginService.refreshTokenAndLogin()
      const newToken = setToken(test[0])
      console.log(test)
      const config = {
        headers: { Authorization: newToken },
      }
      
      console.log(newToken)
      const response = await axios.get(baseURL, config)
      console.log(response.data)
      return response.data
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
  }
}}

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
  const userCookie = Cookies.get('userCookie')

  const config = {
    'userCookie': userCookie
  }
  const response = await axios.put(`${baseURL}/${id}`, updatedEntry, config)
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