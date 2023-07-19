import axios from 'axios'
import Cookies from 'js-cookie'

const baseURL = '/api/entries'
let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  console.log(token)
}

const getAllEntries = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createEntry = async (newEntry) => {
  const userCookie = Cookies.get('userCookie')

  const config = {
    headers: { Authorization: token },
    'userCookie': userCookie
  }

  const response = await axios.post(baseURL, newEntry, config)
  console.log(response)
  return response.data
}

const updateEntry = async (id, updatedEntry) => {
  const request = await axios.put(`${baseURL}/${id}`, updatedEntry)
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