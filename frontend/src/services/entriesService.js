import axios from 'axios'

const baseURL = '/api/entries'

const getAllEntries = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createEntry = async (newEntry) => {
  const response = await axios.post(baseURL, newEntry)
  return response.data
}

const updateEntry = async (id, updatedEntry) => {
  const request = await axios.put(`${baseURL}/${id}`, updatedEntry)
  return response.data
}

const deleteEntry = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`)
  return response.data
}

export default { baseURL, getAllEntries, createEntry, updateEntry, deleteEntry }