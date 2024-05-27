import NotificationReducer from './NotificationReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    notification: NotificationReducer,
  },
})

export default store
