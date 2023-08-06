import axios from 'axios'
import loginService from './loginService'
const baseURL = '/api/entries'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const isJWTExpired = async (token) => {
  token = token.split(' ')[1]
  const jwtPayload = JSON.parse(window.atob(token?.split('.')[1]))
  if (Date.now() >= jwtPayload.exp * 1000) {
    const newToken = await loginService.refreshTokenAndLogin()
    setToken(newToken[0])
  }
}

const getAllEntries = async () => {
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