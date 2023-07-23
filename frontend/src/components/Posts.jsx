import EditForm from './EditForm'
import entriesService from '../services/entriesService'
import { useState } from 'react'

const Posts = ({journalEntries, setJournalEntries}) => {
  const [entryToEdit, setEntryToEdit] = useState(null)
  const [editModal, setEditModal] = useState(null)
  const [editedPostTitle, setEditedPostTitle] = useState('')
  const [editedPostBody, setEditedPostBody] = useState('')

  const editEntryHandler = (entry) => {
    setEntryToEdit(entry)
    setEditedPostTitle(entry.title)
    setEditedPostBody(entry.content)
    console.log(entry)
    setEditModal(true)
  }

  const deleteEntryHandler = async (entry) => {
    const noteToDelete = await entriesService.deleteEntry(entry.id)
    console.log(noteToDelete)
    setJournalEntries(journalEntries.filter((e) => e.id !== entry.id))
  }

  const postsHTML = journalEntries.map((entry) => (
    <div className="post-container" key={entry.title}>
      <div className="title">{entry.title}</div>
      <div className="content">{entry.content}</div>
      <div className="edit-delete">
        <button className="edit" type='submit' onClick={() => editEntryHandler(entry)}>Edit</button> 
        <button className="delete" type='submit' onClick={() => deleteEntryHandler(entry)}>Delete</button>
      </div>
    </div>
  ))

  console.log(entryToEdit)
  return (
    <div className="posts-container">
      {postsHTML}
      {entryToEdit && <EditForm 
                        journalEntries={journalEntries}
                        setJournalEntries={setJournalEntries}
                        entryToEdit={entryToEdit}
                        editedPostTitle={editedPostTitle}
                        setEditedPostTitle={setEditedPostTitle}
                        editedPostBody={editedPostBody}
                        setEditedPostBody={setEditedPostBody}
                      />}
    </div>
  )
}

export default Posts
