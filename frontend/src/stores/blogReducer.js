import { createSlice } from '@reduxjs/toolkit'
import { getData } from '../services/requests'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlogs(state, action) {
      state = state.concat(action)
      return state
    },
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.concat(action.payload)
    },
  },
})

export function initialBlogs() {
  return async (dispatch) => {
    const res = await getData('blogs')
    dispatch(setBlogs(res))
  }
}

export const { setBlogs, createBlogs, appendBlog } = blogSlice.actions
export default blogSlice.reducer
