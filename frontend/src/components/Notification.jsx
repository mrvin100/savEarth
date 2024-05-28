import { useSelector, useDispatch } from 'react-redux'
import { removeNotification } from '../stores/NotificationReducer'

export default function Notification() {
  const notification = useSelector((state) => state.notification)
  if (!notification) return

  const styles = {
    color: notification.clr,
    border: '2px solid ' + notification.clr,
    fontWeight: 'bolder',
    width: '100%',
    position: 'sticky',
    top: '0',
    backgroundColor: 'gray',
  }

  const dispatch = useDispatch()
  setTimeout(() => {
    dispatch(removeNotification())
  }, 3000)

  return <div style={styles}>{notification.msg}</div>
}
