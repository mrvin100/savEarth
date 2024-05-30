import axios from 'axios'
const baseUrl = 'http://localhost:3000/api'
let token

export function setToken(user) {
  token = `Bearer ${user.token}`
}

export async function getData(target) {
  const { data } = await axios.get(`${baseUrl}/${target}`)
  return data
}

export async function loginRequest(datas) {
  const res = await axios.post(`${baseUrl}/login`, datas)
  return res.data
}

export async function registerRequest(datas) {
  const { data } = await axios.post(`${baseUrl}/user`, datas)
  return data
}

export async function postBlogRequest(datas) {
  const config = { headers: { authorization: token } }
  const { data } = await axios.post(`${baseUrl}/blogs`, datas, config)
  return data
}

export async function updateBlogRequest(datas) {
  const config = { headers: { authorization: token } }
  const { data } = await axios.put(`${baseUrl}/blogs`, datas, config)
  return data
}

export async function getUser(id) {
  const config = { headers: { authorization: token } }
  console.log(token)
  const { data } = await axios.get(`${baseUrl}/user/${id}`, config)
  return data
}

export async function updateUserRequest(data, id) {
  const config = { headers: { authorization: token } }
  const res = await axios.put(`${baseUrl}/user/${id}`, data, config)
  console.log(res)
  // const res2 = await loginRequest({
  //   password: data.password,
  //   email: res.data.email,
  // })

  return res.data
}

export async function deleteBlogRequest(id) {
  const config = { headers: { authorization: token } }
  await axios.delete(`${baseUrl}/blogs/${id}`, config)
  return id
}

export async function getBlogRequest(id) {
  const { data } = await axios.get(`${baseUrl}/blogs/${id}`)
  return data
}

export async function getCollectionRequest(id) {
  const { data } = await axios.get(`${baseUrl}/collections`)
  return data
}

export async function updateCollectionRequest(data, id) {
  const config = { header: { authorization: token } }
  const res = await axios.put(`${baseUrl}/collections/${id}`, data, config)
  return res.data
}

export async function postCollectionRequest(data) {
  const config = { header: { authorization: token } }
  const res = await axios.put(`${baseUrl}/collections/`, data, config)
  return res.data
}

export async function deleteCollectionRequest(id) {
  const config = { headers: { authorization: token } }
  await axios.delete(`${baseUrl}/collections/${id}`, config)
  return id
}
