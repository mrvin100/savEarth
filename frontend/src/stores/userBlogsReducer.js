import { createSlice } from '@reduxjs/toolkit'

const userBlogsReducer = createSlice({
  name: 'userBlogs',
  initialState: [],
  reducers: {
    setUserBlogs(state, action) {
      return action.payload
    },
    appendUserBlogs(state, action) {
      console.log('append', action.payload)
      return state.concat(action.payload)
    },
  },
})

export const { setUserBlogs, appendUserBlogs } = userBlogsReducer.actions
export default userBlogsReducer.reducer
