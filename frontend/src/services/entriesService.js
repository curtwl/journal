import axios from 'axios'
const baseURL = '/api/entries'
import { token, setToken, isJWTExpired } from '../utils/tokenHelper'

const getAllEntries = async () => {
  if (token)
    await (isJWTExpired(token))

  try {
    const config = {
      headers: { Authorization: token },
    }
    
    const response = await axios.get(baseURL, config)
    return response.data
  }
  catch (error) {
      console.log('Error', error.message)
    }
}

const createEntry = async (newEntry) => {
  await (isJWTExpired(token))

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseURL, newEntry, config)
  return response.data
}

const updateEntry = async (id, updatedEntry) => {
  await (isJWTExpired(token))

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseURL}/${id}`, updatedEntry, config)
  return response.data
}

const deleteEntry = async (id) => {
  await (isJWTExpired(token))

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseURL}/${id}`, config)
  return response.data
}

export default { baseURL, getAllEntries, createEntry, updateEntry, deleteEntry, setToken }