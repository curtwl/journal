import EditForm from './EditForm'
import entriesService from '../services/entriesService'

const Posts = ({journalEntries, setJournalEntries}) => {
  const editEntryHandler = (entry) => {
    setEntryToEdit(entry)
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
  return (
    <div className="posts-container">
      {postsHTML}
      {/* <EditForm /> */}
    </div>
  )
}

export default Posts
