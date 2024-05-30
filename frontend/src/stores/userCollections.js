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

export function updateCollection(data, id) {
  return async (dispatch) => {
    const res = await updateCollectionRequest(data, id)
    dispatch(updateCollection(res))
    dispatch(
      setNotification({ msg: 'update successfully completed', clr: 'green' })
    )
  }
}

export function deleteCollection(id) {
  return async (dispatch) => {
    const res = await deleteCollectionRequest(id)
    dispatch(deleteUserCollection(res))
    dispatch(
      setNotification({ msg: 'update successfully completed', clr: 'green' })
    )
  }
}

export function addCollection(data) {
  return async (dispatch) => {
    const res = await postCollectionRequest(data)
    dispatch(appendUserCollection(res))
  }
}

export const {
  setUserCollections,
  appendUserCollection,
  updateUserCollection,
  deleteUserCollection,
} = userCollectionReducer.actions
export default userCollectionReducer.reducer
