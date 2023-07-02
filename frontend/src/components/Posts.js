const Posts = ({journalEntries}) => {
    const postsHTML = journalEntries.map((entry) => 
        <div className='post-container' key={entry.title}>
            <div className='title'>{entry.title}</div>
            <div>{entry.body}</div>
            <div className="edit-delete">Edit Delete</div>
        </div>
    )
    return (
        <div className='posts-container'>
            {postsHTML}
        </div>
    )
}

export default Posts