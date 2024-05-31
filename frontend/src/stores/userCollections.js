import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './NotificationReducer'
import {
  updateCollectionRequest,
  postCollectionRequest,
  deleteCollectionRequest,
} from '../services/requests'

const userCollectionReducer = createSlice({
  name: 'userCollections',
  initialState: [],
  reducers: {
    setUserCollections(state, action) {
      return action.payload
    },
    appendUserCollection(state, action) {
      return state.concat(action.payload)
    },
    updateUserCollection(state, action) {
      const updatedCollection = action.payload
      return state.map((s) =>
        s.id === updatedCollection.id ? updatedCollection : s
      )
    },
    deleteUserCollection(state, action) {
      return state.filter((s) => s.id !== action.payload)
    },
  },
})

export const {
  setUserCollections,
  appendUserCollection,
  updateUserCollection,
  deleteUserCollection,
} = userCollectionReducer.actions
export default userCollectionReducer.reducer
