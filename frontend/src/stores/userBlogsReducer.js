import { createSlice } from '@reduxjs/toolkit'
import { getData, postBlogRequest } from '../services/requests'

const userBlogsReducer = createSlice({
  name: 'userBlogs',
  initialState: [],
  reducers: {
    setUserBlogs(state, action) {
      console.log(action.payload)
      return action.payload
    },
    appendUserBlogs(state, action) {
      console.log('append', action.payload)
      return state.concat(action.payload)
    },
  },
})

export function postBlog(data) {
  return async (dispatch) => {
    const res = await postBlogRequest(data)
    dispatch(appendUserBlogs(res))
  }
}

export const { setUserBlogs, appendUserBlogs } = userBlogsReducer.actions
export default userBlogsReducer.reducer
