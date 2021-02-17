import axios from 'axios'
import { GeneralAddress } from './abstractAddress'

const APIAddress = 'http://' + GeneralAddress

let defaultBody = ''

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
    endpoint + objectId,
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
    endpoint + objectId,
    'PATCH',
    token,
    body
  )
}

const _put = async (endpoint, objectId, body, token) => {
  return await responseAbstract(
    endpoint + objectId,
    'PUT',
    token,
    body
  )
}

const _delete = async (endpoint, objectId, token) => {
  return await responseAbstract(
    endpoint + objectId,
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
    headers = {
        'Authorization': token,
        'accept': 'application/json',
        'Content-Type': 'application/json',
    }
    if ('file' in body) {
        headers = {
            'Authorization': token,
            'accept': 'multipart/form-data',
            'Content-Type': 'multipart/form-data',
        }
    }
    let headers = {
        url: url,
        method: method,
        headers: headers
    }
    if (method === 'PUT' || method === 'POST' || method === 'PATCH') {
        headers = Object.assign({}, headers, {
            data: JSON.stringify(body),
            withCredentials: true,
        })
    }
    return headers
}


export default {
  APIAddress,
  _getList,
  _getOne,
  _post,
  _put,
  _patch,
  _delete
}