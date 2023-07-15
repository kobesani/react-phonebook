import axios from "axios";

const baseUrl = "/api/persons"

const getAllEntries = () => {
  return (
    axios
      .get(baseUrl)
      .then(response => response.data)
  )
}

const getEntryById = (entryId) => {
  return (
    axios
      .get(`${baseUrl}/${entryId}`)
      .then(response => response.data)
  )
}

const createEntry = (newEntry) => {
  return (
    axios
      .post(baseUrl, newEntry)
      .then(response => response.data)
  )
}

const updateEntry = (id, updatedEntry) => {
  return (
    axios
      .put(`${baseUrl}/${id}`, updatedEntry)
      .then(response => response.data)
  )
}

const deleteEntry = (id) => {
  return (
    axios
      .delete(`${baseUrl}/${id}`)
      .then(response => response.data)
  )
}

const phonebookServices = {
  getAllEntries, getEntryById, createEntry, updateEntry, deleteEntry
}

export default phonebookServices
