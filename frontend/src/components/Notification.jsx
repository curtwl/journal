const Notification = ({ notificationMessage }) => {
    if (notificationMessage.message === '') {
      return null
    }
    else if (notificationMessage.type === 'success') {
      return (
        <div className='notification success'>✅ {notificationMessage.message}</div>
      )
    }
    else {
      return (
        <div className='notification error'>❌ {notificationMessage.message}</div>
      )
       
    }
  }
  
  export default Notification