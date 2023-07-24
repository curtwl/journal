const Notification = ({ notificationMessage }) => {
    if (notificationMessage.message === '') {
      return null
    }
    else if (notificationMessage.type === 'success') {
      return (
        <div className="notification">
          <div className='success'>{notificationMessage.message}</div>
        </div>
      )
    }
    else {
        return (
            <div className="notification">
              <div className='error'>{notificationMessage.message}</div>
            </div>
          )
       
    }
  }
  
  export default Notification