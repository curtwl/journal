import entriesService from '../services/entriesService'

const Form = ({postTitle, postBody, setPostTitle, setPostBody, journalEntries, setJournalEntries}) => {
  const addEntry = async (event) => {
    event.preventDefault()
    
    const newEntry = {
      title: postTitle,
      content: postBody
    }
    console.log(newEntry)

    try {
      const res = await entriesService.createEntry(newEntry)
      setJournalEntries(journalEntries.concat(res))
    } catch (error) {
      console.error(error)
    }

    setPostTitle('')
    setPostBody('')
    console.log(journalEntries)
  }

  return (
    <form className='form' onSubmit={addEntry}>
      <label htmlFor="post-title">Title:</label>
      <input id="post-title" value={postTitle} onChange={({ target }) => setPostTitle(target.value)} />
      <label htmlFor="post-body">Body:</label>
      <textarea id="post-body" value={postBody} onChange={({ target }) => setPostBody(target.value)} />
      <p>Use the form above to create a post.</p>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default Form