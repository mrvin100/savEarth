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
  console.log(token)
  const config = { headers: { authorization: token } }
  const { data } = await axios.get(`${baseUrl}/user/${id}`, config)
  return data
}
