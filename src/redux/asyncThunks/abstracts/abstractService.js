import axios from 'axios'
import { GeneralAddress } from './abstractAddress'

const APIAddress = GeneralAddress

let defaultBody = {}

const _getList = async (endpoint, token) => {
  return await responseAbstract(
    endpoint,
    'GET',
    token,
    defaultBody
  )
}

const _getOne = async (endpoint, objectId, token) => {
  return await responseAbstract(
    endpoint + objectId + '/',
    'GET',
    token,
    defaultBody
  )
}

const _post = async (endpoint, body, token) => {
  return await responseAbstract(
    endpoint,
    'POST',
    token,
    body
  )
}

const _patch = async (endpoint, objectId, body, token) => {
  return await responseAbstract(
    endpoint + objectId + '/',
    'PATCH',
    token,
    body
  )
}

const _put = async (endpoint, objectId, body, token) => {
  return await responseAbstract(
    endpoint + objectId + '/',
    'PUT',
    token,
    body
  )
}

const _delete = async (endpoint, objectId, token) => {
  let slash = '/'
  if ( objectId === '' )
    slash = ''
  return await responseAbstract(
    endpoint + objectId + slash,
    'DELETE',
    token,
    defaultBody
  )
}


const responseAbstract = async (endpoint, method, token, body) => {
  let response = await axios(
    headerBuilder(
      APIAddress + endpoint,
      method,
      token,
      body,
    )
  )
  return response
}

const headerBuilder = (url, method, token, body) => {
    let headers_r = {
        'authorization': token,
        'x-csrftoken': getCookie('csrftoken'),
        'accept': 'application/json',
        'content-type': 'application/json'
    }
    let headers = {
        url: url,
        method: method,
        headers: headers_r,
        credentials: 'same-origin'
    }
    if (method === 'PUT' || method === 'POST' || method === 'PATCH') {
        headers = Object.assign({}, headers, {
            data: JSON.stringify(body)
        })
    }
    return headers
}

/**
 * get cookie method for CSRF verification
 * @param {string} name - name of handled cookie
 */
const getCookie = (name) => {
    if (!document.cookie) {
        return null;
    }
    const token = document.cookie.split(';')
        .map(c => c.trim())
        .filter(c => c.startsWith(name + '='));

    if (token.length === 0) {
        return null;
    }
    return decodeURIComponent(token[0].split('=')[1]);
}

const axiosFilePost = async ( endpoint, body, token ) => {
    let formData = new FormData()
    formData.append('file', body.file)
    formData.append('user_id', body.user_id)
    let response = await axios.post( 
        APIAddress + endpoint,
        formData,
        {
            headers: {
              'authorization': token,
              'x-csrftoken': getCookie('csrftoken')
          }
        } 
    )
    console.log(response)
    return response
}

export default {
  APIAddress,
  _getList,
  _getOne,
  _post,
  _put,
  _patch,
  _delete,
  axiosFilePost
}