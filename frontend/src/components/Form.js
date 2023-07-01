const Form = () => {
    return (
        <form className='form' type='submit'>
            <label htmlFor="post-title">Title:</label>
            <input id="post-title"/>
            <label htmlFor="post-body">Body:</label>
            <textarea id="post-body"/>
            <p>Use the form above to create a post.</p>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default Form