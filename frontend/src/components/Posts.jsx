import EditForm from './EditForm'
import entriesService from '../services/entriesService'
import { useState, useContext } from 'react'
import { EditModalContext } from "./ContextProvider"

const Posts = ({journalEntries, setJournalEntries, setNotificationMessage}) => {
  const [entryToEdit, setEntryToEdit] = useState(null)
  const [editedPostTitle, setEditedPostTitle] = useState('')
  const [editedPostBody, setEditedPostBody] = useState('')
  const editModalContext = useContext(EditModalContext)

  const editEntryHandler = (entry) => {
    setEntryToEdit(entry)
    setEditedPostTitle(entry.title)
    setEditedPostBody(entry.content)
    console.log(entry)
    editModalContext.setEditModal(true)
  }

  const deleteEntryHandler = async (entry) => {
    try {
      const noteToDelete = await entriesService.deleteEntry(entry.id)
      console.log(noteToDelete)
      setJournalEntries(journalEntries.filter((e) => e.id !== entry.id))
    } catch (error) {
        console.error(error)
        setNotificationMessage({ message: "Please try again.", type: "error"})
        setTimeout(() => setNotificationMessage(''), 3500)
    }
  }

  const postsHTML = journalEntries.map((entry) => (
    <div className={`posts-container-element ${editModalContext.editModal ? 'semi-transparent' : ''}`} key={entry.title}>
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
    <>
    <div className={`posts-container ${editModalContext.editModal ? 'semi-transparent' : ''}`}>
      {postsHTML}

    </div>
    {editModalContext.editModal && <EditForm 
                        journalEntries={journalEntries}
                        setJournalEntries={setJournalEntries}
                        entryToEdit={entryToEdit}
                        editedPostTitle={editedPostTitle}
                        setEditedPostTitle={setEditedPostTitle}
                        editedPostBody={editedPostBody}
                        setEditedPostBody={setEditedPostBody}
                        setNotificationMessage={setNotificationMessage}
                      />}
    </>
  )
}

export default Posts
