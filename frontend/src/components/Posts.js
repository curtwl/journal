const Posts = ({journalEntries}) => {
    const postsHTML = journalEntries.map(() => 
        <div className='post-container'>
            <div className='title'>Lorem</div>
            <div>text</div>
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