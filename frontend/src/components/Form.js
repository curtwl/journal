const Form = ({addEntry, postTitle, postBody, setPostTitle, setPostBody}) => {
  console.log(addEntry)
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