import axios from 'axios'
const baseUrl = 'http://localhost:3000/api'

export async function getDate(target) {
  const { data } = await axios.get(`${baseUrl}/${target}`)
  return data
}

export async function postData(datas, target) {
  const { data } = await axios.post(`${baseUrl}/${target}`, datas)
  return data
}
