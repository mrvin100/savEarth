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
  },
})

export const { setUser, removeUser, getUserIds } = userSlice.actions
export default userSlice.reducer
