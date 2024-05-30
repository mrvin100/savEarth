import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    setUser(state, action) {
      window.localStorage.setItem('userToken', JSON.stringify(action.payload))
      return action.payload
    },
    removeUser(state, action) {
      window.localStorage.clear()
      return null
    },
    getUserIds(state, action) {
      const userInfos = window.localStorage.getItem('userToken')
      if (userInfos) return JSON.parse(userInfos)
      return null
    },
    updateUser(state, action) {
      const updatedUser = action.payload
      return { ...updatedUser, token: state.token }
    },
  },
})

export const { setUser, removeUser, getUserIds, updateUser } = userSlice.actions
export default userSlice.reducer
