import { useSelector, useDispatch } from 'react-redux'
import { removeNotification } from '../stores/NotificationReducer'

export default function Notification() {
  const notification = useSelector((state) => state.notification)
  if (!notification || notification.length === 0) return
  console.log(notification)

  const styles = {
    color: notification.clr,
    // border: "2px solid " + notification.clr,
    // fontWeight: "bolder",
    // width: "100%",
    // position: "sticky",
    // top: "0",
    // backgroundColor: "gray",
  }

  const dispatch = useDispatch()
  setTimeout(() => {
    dispatch(removeNotification())
  }, 5000)

  return (
    <div style={styles} className='message'>
      <span>{notification.msg}</span> <i className='bx bx-notification'></i>
    </div>
  )
}
