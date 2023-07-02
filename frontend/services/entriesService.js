import axios from 'axios'
const baseURL = '/api/entries'

const getAllEntries = () => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}

const createEntry = newEntry => {
  const request = axios.post(baseURL, newEntry)
  return request.then(response => response.data)
}

const updateEntry = (id, updatedEntry) => {
  const request = axios.put(`${baseURL}/${id}`, updatedEntry)
  return request.then(response => response.data)
}

const deleteEntry = id => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request
}

export default { baseURL, getAllEntries, createEntry, updateEntry, deleteEntry }